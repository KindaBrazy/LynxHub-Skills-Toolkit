Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let electron = require("electron");
let fs = require("fs");
fs = __toESM(fs, 1);
let os = require("os");
os = __toESM(os, 1);
let path = require("path");
path = __toESM(path, 1);
let child_process = require("child_process");
//#region extension/src/main/cliRunner.ts
var execAsync = (0, require("util").promisify)(child_process.exec);
function getSkillsCliPath() {
	if (typeof __dirname !== "undefined") {
		const prodPath = path.default.join(__dirname, "skills", "cli.mjs");
		if (fs.default.existsSync(prodPath)) return prodPath;
	}
	const devPaths = [
		path.default.join(process.cwd(), "extension", "node_modules", "skills", "dist", "cli.mjs"),
		path.default.join(electron.app.getAppPath(), "extension", "node_modules", "skills", "dist", "cli.mjs"),
		...typeof __dirname !== "undefined" ? [path.default.resolve(__dirname, "..", "..", "node_modules", "skills", "dist", "cli.mjs"), path.default.resolve(__dirname, "..", "..", "..", "node_modules", "skills", "dist", "cli.mjs")] : []
	];
	for (const p of devPaths) if (fs.default.existsSync(p)) return p;
	throw new Error("Could not find skills CLI script in dev or production directories.");
}
async function runSkillsCommand(args, cwd) {
	const cliPath = getSkillsCliPath();
	return execAsync(`"${process.execPath}" "${cliPath}" ${args}`, {
		cwd: cwd || process.cwd(),
		env: {
			...process.env,
			ELECTRON_RUN_AS_NODE: "1"
		}
	});
}
var cachedAgentsList = null;
function parseAgentsFromCli(cliPath) {
	if (cachedAgentsList) return cachedAgentsList;
	try {
		const content = fs.default.readFileSync(cliPath, "utf8");
		const startIdx = content.indexOf("const agents = {");
		if (startIdx === -1) return [];
		let braceCount = 1;
		let i = startIdx + 16;
		let agentsBlock = "";
		while (i < content.length && braceCount > 0) {
			const char = content[i];
			if (char === "{") braceCount++;
			else if (char === "}") braceCount--;
			if (braceCount > 0) agentsBlock += char;
			i++;
		}
		const agents = [];
		let currentAgentBlock = "";
		let level = 0;
		for (let j = 0; j < agentsBlock.length; j++) {
			const char = agentsBlock[j];
			if (char === "{") {
				level++;
				if (level === 1) {
					currentAgentBlock = "";
					continue;
				}
			} else if (char === "}") {
				level--;
				if (level === 0) {
					const nameMatch = currentAgentBlock.match(/name:\s*["']([^"']+)["']/);
					const displayNameMatch = currentAgentBlock.match(/displayName:\s*["']([^"']+)["']/);
					if (nameMatch && displayNameMatch) agents.push({
						name: nameMatch[1],
						displayName: displayNameMatch[1]
					});
				}
			}
			if (level >= 1) currentAgentBlock += char;
		}
		agents.sort((a, b) => a.displayName.localeCompare(b.displayName));
		cachedAgentsList = agents;
		return agents;
	} catch (error) {
		console.error("Failed to parse agents from cli.mjs:", error);
		return [];
	}
}
//#endregion
//#region extension/src/main/discoverParser.ts
var discoverCache = /* @__PURE__ */ new Map();
var CACHE_TTL_MS = 300 * 1e3;
function getCachedDiscoverData(type) {
	const cached = discoverCache.get(type);
	if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) return cached.data;
	return null;
}
function setCachedDiscoverData(type, data) {
	discoverCache.set(type, {
		data,
		timestamp: Date.now()
	});
}
function extractJsonObject(str, startKeyword) {
	const startIdx = str.indexOf(startKeyword);
	if (startIdx === -1) return null;
	let braceCount = 0;
	let inString = false;
	let escape = false;
	for (let i = startIdx; i < str.length; i++) {
		const char = str[i];
		if (escape) {
			escape = false;
			continue;
		}
		if (char === "\\") {
			escape = true;
			continue;
		}
		if (char === "\"") {
			inString = !inString;
			continue;
		}
		if (!inString) {
			if (char === "{") braceCount++;
			else if (char === "}") {
				braceCount--;
				if (braceCount === 0) {
					const jsonCandidate = str.slice(startIdx, i + 1);
					try {
						return JSON.parse(jsonCandidate);
					} catch (e) {}
				}
			}
		}
	}
	return null;
}
function extractLeaderboardSkills(payload) {
	const startIdx = payload.indexOf("[{\"source\":");
	if (startIdx === -1) return null;
	let endIdx = payload.indexOf("],\"totalSkills\":", startIdx);
	if (endIdx === -1) endIdx = payload.indexOf("],\"view\":", startIdx);
	if (endIdx === -1) return null;
	const arrayStr = payload.slice(startIdx, endIdx + 1);
	try {
		return JSON.parse(arrayStr);
	} catch (e) {
		return null;
	}
}
async function fetchAndParseDiscoverPage(type) {
	const cached = getCachedDiscoverData(type);
	if (cached) return cached;
	let url = "https://skills.sh";
	if (type === "trending") url = "https://skills.sh/trending";
	else if (type === "hot") url = "https://skills.sh/hot";
	else if (type === "official") url = "https://skills.sh/official";
	const response = await fetch(url);
	if (!response.ok) throw new Error(`Failed to fetch discover page: ${response.statusText}`);
	const content = await response.text();
	const regex = /self\.__next_f\.push\(\[1,\s*"([\s\S]*?)"\]\)/g;
	let match;
	let fullPayload = "";
	while ((match = regex.exec(content)) !== null) {
		const unescaped = match[1].replace(/\\"/g, "\"").replace(/\\'/g, "'").replace(/\\\\/g, "\\").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\u0026/g, "&").replace(/\\u003c/g, "<").replace(/\\u003e/g, ">");
		fullPayload += unescaped;
	}
	if (type === "official") {
		const officialData = extractJsonObject(fullPayload, "{\"data\":{\"owners\":");
		if (officialData && officialData.data && officialData.data.owners) {
			setCachedDiscoverData(type, officialData.data.owners);
			return officialData.data.owners;
		}
		const generalData = extractJsonObject(fullPayload, "{\"data\":");
		if (generalData && generalData.data && generalData.data.owners) {
			setCachedDiscoverData(type, generalData.data.owners);
			return generalData.data.owners;
		}
		return [];
	} else {
		const skills = extractLeaderboardSkills(fullPayload);
		if (skills) {
			const formatted = skills.map((s) => ({
				id: `${s.source}/${s.name}`,
				name: s.name,
				installs: s.installs,
				source: s.source
			}));
			setCachedDiscoverData(type, formatted);
			return formatted;
		}
		return [];
	}
}
//#endregion
//#region extension/src/main/lynxExtension.ts
async function initialExtension(lynxApi, _utils, mainIpc) {
	let storageManager = null;
	try {
		storageManager = await _utils.getStorageManager();
	} catch (err) {
		console.error("Failed to get storage manager:", err);
	}
	const getProjectDirs = () => {
		if (!storageManager) return [];
		return storageManager.getCustomData("skills-project-dirs") || [];
	};
	const saveProjectDirs = (dirs) => {
		if (!storageManager) return;
		storageManager.setCustomData("skills-project-dirs", dirs);
	};
	const descriptionCache = /* @__PURE__ */ new Map();
	const DESC_CACHE_TTL = 1800 * 1e3;
	lynxApi.listenForChannels(() => {
		mainIpc.lynxIpc.handle("skills-manager:list", async (isGlobal) => {
			try {
				if (isGlobal) {
					const { stdout } = await runSkillsCommand("list -g --json");
					const jsonStart = stdout.indexOf("[");
					if (jsonStart === -1) return [];
					const jsonStr = stdout.slice(jsonStart);
					return JSON.parse(jsonStr);
				} else {
					let combinedSkills = [];
					const dirs = getProjectDirs();
					for (const dir of dirs) {
						if (!fs.default.existsSync(dir)) continue;
						try {
							const { stdout } = await runSkillsCommand("list --json", dir);
							const jsonStart = stdout.indexOf("[");
							if (jsonStart !== -1) {
								const jsonStr = stdout.slice(jsonStart);
								const parsed = JSON.parse(jsonStr);
								combinedSkills = [...combinedSkills, ...parsed];
							}
						} catch (err) {
							console.error(`Error listing skills in custom directory ${dir}:`, err);
						}
					}
					return combinedSkills;
				}
			} catch (error) {
				console.error("Error listing skills:", error);
				return [];
			}
		});
		mainIpc.lynxIpc.handle("skills-manager:get-discover-data", async (type) => {
			try {
				return await fetchAndParseDiscoverPage(type);
			} catch (error) {
				console.error(`Error loading discover data for type ${type}:`, error);
				return [];
			}
		});
		mainIpc.lynxIpc.handle("skills-manager:get-audit", async (source, skillName) => {
			try {
				const res = await fetch(`https://skills.sh/api/v1/skills/audit/${encodeURIComponent(source)}/${encodeURIComponent(skillName)}`);
				if (!res.ok) {
					if (res.status === 404) return {
						audits: [],
						id: `${source}/${skillName}`
					};
					throw new Error(`Audit fetch failed with status ${res.status}`);
				}
				return await res.json();
			} catch (error) {
				console.error(`Error loading security audit for ${source}/${skillName}:`, error);
				return null;
			}
		});
		mainIpc.lynxIpc.handle("skills-manager:get-description", async (source, name) => {
			const cacheKey = `${source}/${name}`;
			const cached = descriptionCache.get(cacheKey);
			if (cached && Date.now() - cached.timestamp < DESC_CACHE_TTL) return cached.desc;
			try {
				const url = `https://skills.sh/${source}/${name}`;
				const res = await fetch(url);
				if (!res.ok) return "";
				const text = await res.text();
				const match = text.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) || text.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
				if (!match) return "";
				const desc = match[1].replace(/&quot;/g, "\"").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
				descriptionCache.set(cacheKey, {
					desc,
					timestamp: Date.now()
				});
				return desc;
			} catch (error) {
				console.error(`Error loading description for ${source}/${name}:`, error);
				return "";
			}
		});
		mainIpc.lynxIpc.handle("skills-manager:clear-description-cache", async () => {
			descriptionCache.clear();
		});
		mainIpc.lynxIpc.handle("skills-manager:search", async (query) => {
			try {
				const res = await fetch(`https://skills.sh/api/search?q=${encodeURIComponent(query)}&limit=50`);
				if (!res.ok) return [];
				return (await res.json()).skills || [];
			} catch (error) {
				console.error("Error searching skills:", error);
				return [];
			}
		});
		mainIpc.lynxIpc.handle("skills-manager:add", async (pkg, isGlobal, agent, copy, targetCwd) => {
			try {
				let args = `add "${pkg}" -y`;
				if (isGlobal) args += " -g";
				if (agent && agent !== "*") args += ` -a "${agent}"`;
				if (copy) args += " --copy";
				const { stdout, stderr } = await runSkillsCommand(args, targetCwd);
				return {
					success: true,
					stdout,
					stderr
				};
			} catch (error) {
				console.error("Error adding skill:", error);
				return {
					success: false,
					error: error.message || String(error)
				};
			}
		});
		mainIpc.lynxIpc.handle("skills-manager:remove", async (name, isGlobal, skillPath) => {
			try {
				let args = `remove "${name}" -y`;
				if (isGlobal) args += " -g";
				let targetCwd = "";
				if (!isGlobal && skillPath) {
					const dirs = getProjectDirs();
					const normSkillPath = path.default.normalize(skillPath).toLowerCase();
					const matched = dirs.find((d) => normSkillPath.startsWith(path.default.normalize(d).toLowerCase()));
					if (matched) targetCwd = matched;
					else if (dirs.length > 0) targetCwd = dirs[0];
				}
				const { stdout, stderr } = await runSkillsCommand(args, targetCwd);
				return {
					success: true,
					stdout,
					stderr
				};
			} catch (error) {
				console.error("Error removing skill:", error);
				return {
					success: false,
					error: error.message || String(error)
				};
			}
		});
		mainIpc.lynxIpc.handle("skills-manager:update", async (name, isGlobal, skillPath) => {
			try {
				let args = `update "${name}" -y`;
				if (isGlobal) args += " -g";
				let targetCwd = "";
				if (!isGlobal && skillPath) {
					const dirs = getProjectDirs();
					const normSkillPath = path.default.normalize(skillPath).toLowerCase();
					const matched = dirs.find((d) => normSkillPath.startsWith(path.default.normalize(d).toLowerCase()));
					if (matched) targetCwd = matched;
					else if (dirs.length > 0) targetCwd = dirs[0];
				}
				const { stdout, stderr } = await runSkillsCommand(args, targetCwd);
				return {
					success: true,
					stdout,
					stderr
				};
			} catch (error) {
				console.error("Error updating skill:", error);
				return {
					success: false,
					error: error.message || String(error)
				};
			}
		});
		mainIpc.lynxIpc.handle("skills-manager:select-project-dir", async () => {
			try {
				const result = await electron.dialog.showOpenDialog({ properties: ["openDirectory"] });
				if (result.canceled || result.filePaths.length === 0) return null;
				return result.filePaths[0];
			} catch (error) {
				console.error("Error selecting project dir:", error);
				return null;
			}
		});
		mainIpc.lynxIpc.handle("skills-manager:get-project-dirs", async () => {
			return getProjectDirs();
		});
		mainIpc.lynxIpc.handle("skills-manager:add-project-dir", async (dir) => {
			const dirs = getProjectDirs();
			if (!dirs.includes(dir)) {
				const updated = [...dirs, dir];
				saveProjectDirs(updated);
				return updated;
			}
			return dirs;
		});
		mainIpc.lynxIpc.handle("skills-manager:remove-project-dir", async (dir) => {
			const updated = getProjectDirs().filter((d) => d !== dir);
			saveProjectDirs(updated);
			return updated;
		});
		mainIpc.lynxIpc.handle("skills-manager:get-group-by", async () => {
			if (!storageManager) return "all";
			return storageManager.getCustomData("skills-group-by") || "all";
		});
		mainIpc.lynxIpc.handle("skills-manager:set-group-by", async (groupBy) => {
			if (!storageManager) return;
			storageManager.setCustomData("skills-group-by", groupBy);
		});
		mainIpc.lynxIpc.handle("skills-manager:get-agents", async () => {
			try {
				return parseAgentsFromCli(getSkillsCliPath());
			} catch (error) {
				console.error("Error getting agents:", error);
				return [];
			}
		});
		mainIpc.lynxIpc.handle("skills-manager:create-skill", async (name, scope, projectDir, agentPaths, content, overwrite) => {
			try {
				const resolvedPaths = [];
				for (const item of agentPaths) {
					let targetDir = "";
					if (scope === "project") {
						if (!projectDir) throw new Error("Project directory is required for project-scoped skills");
						targetDir = path.default.join(projectDir, item.path, name);
					} else {
						const homedir = os.default.homedir();
						const cleanPath = item.path.replace(/^~[/\\]/, "");
						targetDir = path.default.join(homedir, cleanPath, name);
					}
					const skillFilePath = path.default.join(targetDir, "SKILL.md");
					if (fs.default.existsSync(skillFilePath) && !overwrite) return {
						success: false,
						exists: true,
						message: `Skill already exists in agent path: ${item.path}`
					};
					resolvedPaths.push(targetDir);
				}
				for (const targetDir of resolvedPaths) {
					fs.default.mkdirSync(targetDir, { recursive: true });
					const skillFilePath = path.default.join(targetDir, "SKILL.md");
					fs.default.writeFileSync(skillFilePath, content, "utf8");
				}
				return {
					success: true,
					paths: resolvedPaths
				};
			} catch (error) {
				console.error("Error creating skill:", error);
				return {
					success: false,
					error: error.message || String(error)
				};
			}
		});
	});
}
//#endregion
exports.initialExtension = initialExtension;

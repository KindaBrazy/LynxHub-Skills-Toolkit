import {MainIpcApi} from '@lynx_main/plugins/extensions/ipcWrapper';
import {ExtensionMainApi, MainExtensionUtils} from '@lynx_main/plugins/extensions/types';
import {exec} from 'child_process';
import {app} from 'electron';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';

const execAsync = promisify(exec);

function getSkillsCliPath(): string {
  // Option 1: Production compiled path inside the plugin folder
  // __dirname points to the scripts/main folder where mainEntry.cjs runs
  if (typeof __dirname !== 'undefined') {
    const prodPath = path.join(__dirname, 'skills', 'cli.mjs');
    if (fs.existsSync(prodPath)) {
      return prodPath;
    }
  }

  // Option 2: Dev path inside workspace extension folder (e.g. extension/node_modules/skills/dist/cli.mjs)
  const devPaths = [
    path.join(process.cwd(), 'extension', 'node_modules', 'skills', 'dist', 'cli.mjs'),
    path.join(app.getAppPath(), 'extension', 'node_modules', 'skills', 'dist', 'cli.mjs'),
    ...(typeof __dirname !== 'undefined'
      ? [
          path.resolve(__dirname, '..', '..', 'node_modules', 'skills', 'dist', 'cli.mjs'),
          path.resolve(__dirname, '..', '..', '..', 'node_modules', 'skills', 'dist', 'cli.mjs'),
        ]
      : []),
  ];

  for (const p of devPaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  throw new Error('Could not find skills CLI script in dev or production directories.');
}

async function runSkillsCommand(args: string) {
  const cliPath = getSkillsCliPath();
  const cmd = `"${process.execPath}" "${cliPath}" ${args}`;
  return execAsync(cmd, {
    cwd: process.cwd(),
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: '1',
    },
  });
}

// Memory cache for discover data (expires in 5 minutes)
const discoverCache = new Map<string, {data: any; timestamp: number}>();
const CACHE_TTL_MS = 5 * 60 * 1000;

function getCachedDiscoverData(type: string): any | null {
  const cached = discoverCache.get(type);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }
  return null;
}

function setCachedDiscoverData(type: string, data: any) {
  discoverCache.set(type, {data, timestamp: Date.now()});
}

function extractJsonObject(str: string, startKeyword: string): any | null {
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
    if (char === '\\') {
      escape = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (!inString) {
      if (char === '{') braceCount++;
      else if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          const jsonCandidate = str.slice(startIdx, i + 1);
          try {
            return JSON.parse(jsonCandidate);
          } catch (e) {
            // ignore and continue
          }
        }
      }
    }
  }
  return null;
}

function extractLeaderboardSkills(payload: string): any[] | null {
  const startIdx = payload.indexOf('[{"source":');
  if (startIdx === -1) return null;

  const endMarker = '],"totalSkills":';
  let endIdx = payload.indexOf(endMarker, startIdx);
  if (endIdx === -1) {
    const fallbackMarker = '],"view":';
    endIdx = payload.indexOf(fallbackMarker, startIdx);
  }

  if (endIdx === -1) return null;

  const arrayStr = payload.slice(startIdx, endIdx + 1);
  try {
    return JSON.parse(arrayStr);
  } catch (e) {
    return null;
  }
}

async function fetchAndParseDiscoverPage(type: 'all-time' | 'trending' | 'hot' | 'official'): Promise<any> {
  const cached = getCachedDiscoverData(type);
  if (cached) return cached;

  let url = 'https://skills.sh';
  if (type === 'trending') url = 'https://skills.sh/trending';
  else if (type === 'hot') url = 'https://skills.sh/hot';
  else if (type === 'official') url = 'https://skills.sh/official';

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch discover page: ${response.statusText}`);
  }
  const content = await response.text();

  const regex = /self\.__next_f\.push\(\[1,\s*"([\s\S]*?)"\]\)/g;
  let match;
  let fullPayload = '';
  while ((match = regex.exec(content)) !== null) {
    const unescaped = match[1]
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, '\\')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\u0026/g, '&')
      .replace(/\\u003c/g, '<')
      .replace(/\\u003e/g, '>');
    fullPayload += unescaped;
  }

  if (type === 'official') {
    const officialData = extractJsonObject(fullPayload, '{"data":{"owners":');
    if (officialData && officialData.data && officialData.data.owners) {
      setCachedDiscoverData(type, officialData.data.owners);
      return officialData.data.owners;
    }
    const generalData = extractJsonObject(fullPayload, '{"data":');
    if (generalData && generalData.data && generalData.data.owners) {
      setCachedDiscoverData(type, generalData.data.owners);
      return generalData.data.owners;
    }
    return [];
  } else {
    const skills = extractLeaderboardSkills(fullPayload);
    if (skills) {
      const formatted = skills.map((s: any) => ({
        id: `${s.source}/${s.name}`,
        name: s.name,
        installs: s.installs,
        source: s.source,
      }));
      setCachedDiscoverData(type, formatted);
      return formatted;
    }
    return [];
  }
}

export async function initialExtension(lynxApi: ExtensionMainApi, _utils: MainExtensionUtils, mainIpc: MainIpcApi) {
  lynxApi.listenForChannels(() => {
    // Handler: List installed skills (local or global)
    mainIpc.lynxIpc.handle('skills-manager:list', async (isGlobal: boolean) => {
      try {
        const args = isGlobal ? 'list -g --json' : 'list --json';
        const {stdout} = await runSkillsCommand(args);
        const jsonStart = stdout.indexOf('[');
        if (jsonStart === -1) return [];
        const jsonStr = stdout.slice(jsonStart);
        return JSON.parse(jsonStr);
      } catch (error) {
        console.error('Error listing skills:', error);
        return [];
      }
    });

    // Handler: Get discover tab data (leaderboard categories or official creators)
    mainIpc.lynxIpc.handle(
      'skills-manager:get-discover-data',
      async (type: 'all-time' | 'trending' | 'hot' | 'official') => {
        try {
          return await fetchAndParseDiscoverPage(type);
        } catch (error) {
          console.error(`Error loading discover data for type ${type}:`, error);
          return [];
        }
      },
    );

    // Handler: Get security audit for a skill
    mainIpc.lynxIpc.handle('skills-manager:get-audit', async (source: string, skillName: string) => {
      try {
        const res = await fetch(
          `https://skills.sh/api/v1/skills/audit/${encodeURIComponent(source)}/${encodeURIComponent(skillName)}`,
        );
        if (!res.ok) {
          if (res.status === 404) return {audits: [], id: `${source}/${skillName}`};
          throw new Error(`Audit fetch failed with status ${res.status}`);
        }
        return await res.json();
      } catch (error) {
        console.error(`Error loading security audit for ${source}/${skillName}:`, error);
        return null;
      }
    });

    // Handler: Search/Discover skills on registry (skills.sh)
    mainIpc.lynxIpc.handle('skills-manager:search', async (query: string) => {
      try {
        const res = await fetch(`https://skills.sh/api/search?q=${encodeURIComponent(query)}&limit=50`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.skills || [];
      } catch (error) {
        console.error('Error searching skills:', error);
        return [];
      }
    });

    // Handler: Add/Install a skill
    mainIpc.lynxIpc.handle(
      'skills-manager:add',
      async (pkg: string, isGlobal: boolean, agent: string, copy: boolean) => {
        try {
          let args = `add "${pkg}" -y`;
          if (isGlobal) args += ' -g';
          if (agent && agent !== '*') args += ` -a "${agent}"`;
          if (copy) args += ' --copy';

          const {stdout, stderr} = await runSkillsCommand(args);
          return {success: true, stdout, stderr};
        } catch (error: any) {
          console.error('Error adding skill:', error);
          return {success: false, error: error.message || String(error)};
        }
      },
    );

    // Handler: Remove/Uninstall a skill
    mainIpc.lynxIpc.handle('skills-manager:remove', async (name: string, isGlobal: boolean) => {
      try {
        let args = `remove "${name}" -y`;
        if (isGlobal) args += ' -g';

        const {stdout, stderr} = await runSkillsCommand(args);
        return {success: true, stdout, stderr};
      } catch (error: any) {
        console.error('Error removing skill:', error);
        return {success: false, error: error.message || String(error)};
      }
    });

    // Handler: Update a skill
    mainIpc.lynxIpc.handle('skills-manager:update', async (name: string, isGlobal: boolean) => {
      try {
        let args = `update "${name}" -y`;
        if (isGlobal) args += ' -g';

        const {stdout, stderr} = await runSkillsCommand(args);
        return {success: true, stdout, stderr};
      } catch (error: any) {
        console.error('Error updating skill:', error);
        return {success: false, error: error.message || String(error)};
      }
    });

    // Handler: Get available agents from cli.mjs
    mainIpc.lynxIpc.handle('skills-manager:get-agents', async () => {
      try {
        const cliPath = getSkillsCliPath();
        return parseAgentsFromCli(cliPath);
      } catch (error) {
        console.error('Error getting agents:', error);
        return [];
      }
    });
  });
}

let cachedAgentsList: {name: string; displayName: string}[] | null = null;

function parseAgentsFromCli(cliPath: string): {name: string; displayName: string}[] {
  if (cachedAgentsList) {
    return cachedAgentsList;
  }

  try {
    const content = fs.readFileSync(cliPath, 'utf8');
    const startKeyword = 'const agents = {';
    const startIdx = content.indexOf(startKeyword);
    if (startIdx === -1) return [];

    let braceCount = 1;
    let i = startIdx + startKeyword.length;
    let agentsBlock = '';

    while (i < content.length && braceCount > 0) {
      const char = content[i];
      if (char === '{') {
        braceCount++;
      } else if (char === '}') {
        braceCount--;
      }
      if (braceCount > 0) {
        agentsBlock += char;
      }
      i++;
    }

    const agents: {name: string; displayName: string}[] = [];
    let currentAgentBlock = '';
    let level = 0;

    for (let j = 0; j < agentsBlock.length; j++) {
      const char = agentsBlock[j];
      if (char === '{') {
        level++;
        if (level === 1) {
          currentAgentBlock = '';
          continue;
        }
      } else if (char === '}') {
        level--;
        if (level === 0) {
          const nameMatch = currentAgentBlock.match(/name:\s*["']([^"']+)["']/);
          const displayNameMatch = currentAgentBlock.match(/displayName:\s*["']([^"']+)["']/);
          if (nameMatch && displayNameMatch) {
            agents.push({
              name: nameMatch[1],
              displayName: displayNameMatch[1],
            });
          }
        }
      }
      if (level >= 1) {
        currentAgentBlock += char;
      }
    }

    // Sort agents alphabetically by displayName
    agents.sort((a, b) => a.displayName.localeCompare(b.displayName));

    cachedAgentsList = agents;
    return agents;
  } catch (error) {
    console.error('Failed to parse agents from cli.mjs:', error);
    return [];
  }
}

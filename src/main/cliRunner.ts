import {exec} from 'child_process';
import {app} from 'electron';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';

const execAsync = promisify(exec);

export function getSkillsCliPath(): string {
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

export async function runSkillsCommand(args: string, cwd?: string) {
  const cliPath = getSkillsCliPath();
  const cmd = `"${process.execPath}" "${cliPath}" ${args}`;
  return execAsync(cmd, {
    cwd: cwd || process.cwd(),
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: '1',
    },
  });
}

let cachedAgentsList: {name: string; displayName: string}[] | null = null;

export function parseAgentsFromCli(cliPath: string): {name: string; displayName: string}[] {
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

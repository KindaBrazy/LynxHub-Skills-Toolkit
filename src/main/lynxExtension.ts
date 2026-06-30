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
  });
}

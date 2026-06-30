import {MainIpcApi} from '@lynx_main/plugins/extensions/ipcWrapper';
import {ExtensionMainApi, MainExtensionUtils} from '@lynx_main/plugins/extensions/types';
import {exec} from 'child_process';
import {promisify} from 'util';

const execAsync = promisify(exec);

export async function initialExtension(lynxApi: ExtensionMainApi, _utils: MainExtensionUtils, mainIpc: MainIpcApi) {
  lynxApi.listenForChannels(() => {
    // Handler: List installed skills (local or global)
    mainIpc.lynxIpc.handle('skills-manager:list', async (isGlobal: boolean) => {
      try {
        const cmd = isGlobal ? 'npx skills list -g --json' : 'npx skills list --json';
        const {stdout} = await execAsync(cmd, {cwd: process.cwd()});
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
          let cmd = `npx skills add "${pkg}" -y`;
          if (isGlobal) cmd += ' -g';
          if (agent && agent !== '*') cmd += ` -a "${agent}"`;
          if (copy) cmd += ' --copy';

          const {stdout, stderr} = await execAsync(cmd, {cwd: process.cwd()});
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
        let cmd = `npx skills remove "${name}" -y`;
        if (isGlobal) cmd += ' -g';

        const {stdout, stderr} = await execAsync(cmd, {cwd: process.cwd()});
        return {success: true, stdout, stderr};
      } catch (error: any) {
        console.error('Error removing skill:', error);
        return {success: false, error: error.message || String(error)};
      }
    });

    // Handler: Update a skill
    mainIpc.lynxIpc.handle('skills-manager:update', async (name: string, isGlobal: boolean) => {
      try {
        let cmd = `npx skills update "${name}" -y`;
        if (isGlobal) cmd += ' -g';

        const {stdout, stderr} = await execAsync(cmd, {cwd: process.cwd()});
        return {success: true, stdout, stderr};
      } catch (error: any) {
        console.error('Error updating skill:', error);
        return {success: false, error: error.message || String(error)};
      }
    });
  });
}

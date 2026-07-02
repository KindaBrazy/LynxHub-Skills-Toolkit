import {MainIpcApi} from '@lynx_main/plugins/extensions/ipcWrapper';
import {ExtensionMainApi, MainExtensionUtils} from '@lynx_main/plugins/extensions/types';
import {dialog} from 'electron';
import fs from 'fs';
import path from 'path';

import {getSkillsCliPath, parseAgentsFromCli, runSkillsCommand} from './cliRunner';
import {fetchAndParseDiscoverPage} from './discoverParser';

export async function initialExtension(lynxApi: ExtensionMainApi, _utils: MainExtensionUtils, mainIpc: MainIpcApi) {
  let storageManager: any = null;
  try {
    storageManager = await _utils.getStorageManager();
  } catch (err) {
    console.error('Failed to get storage manager:', err);
  }

  const getProjectDirs = (): string[] => {
    if (!storageManager) return [];
    return storageManager.getCustomData('skills-project-dirs') || [];
  };

  const saveProjectDirs = (dirs: string[]) => {
    if (!storageManager) return;
    storageManager.setCustomData('skills-project-dirs', dirs);
  };

  lynxApi.listenForChannels(() => {
    // Handler: List installed skills (local or global)
    mainIpc.lynxIpc.handle('skills-manager:list', async (isGlobal: boolean) => {
      try {
        if (isGlobal) {
          const args = 'list -g --json';
          const {stdout} = await runSkillsCommand(args);
          const jsonStart = stdout.indexOf('[');
          if (jsonStart === -1) return [];
          const jsonStr = stdout.slice(jsonStart);
          return JSON.parse(jsonStr);
        } else {
          let combinedSkills: any[] = [];
          const dirs = getProjectDirs();
          for (const dir of dirs) {
            if (!fs.existsSync(dir)) continue;
            try {
              const {stdout} = await runSkillsCommand('list --json', dir);
              const jsonStart = stdout.indexOf('[');
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
      async (pkg: string, isGlobal: boolean, agent: string, copy: boolean, targetCwd?: string) => {
        try {
          let args = `add "${pkg}" -y`;
          if (isGlobal) args += ' -g';
          if (agent && agent !== '*') args += ` -a "${agent}"`;
          if (copy) args += ' --copy';

          const {stdout, stderr} = await runSkillsCommand(args, targetCwd);
          return {success: true, stdout, stderr};
        } catch (error: any) {
          console.error('Error adding skill:', error);
          return {success: false, error: error.message || String(error)};
        }
      },
    );

    // Handler: Remove/Uninstall a skill
    mainIpc.lynxIpc.handle('skills-manager:remove', async (name: string, isGlobal: boolean, skillPath?: string) => {
      try {
        let args = `remove "${name}" -y`;
        if (isGlobal) args += ' -g';

        let targetCwd = '';
        if (!isGlobal && skillPath) {
          const dirs = getProjectDirs();
          const normSkillPath = path.normalize(skillPath).toLowerCase();
          const matched = dirs.find(d => normSkillPath.startsWith(path.normalize(d).toLowerCase()));
          if (matched) {
            targetCwd = matched;
          } else if (dirs.length > 0) {
            targetCwd = dirs[0];
          }
        }

        const {stdout, stderr} = await runSkillsCommand(args, targetCwd);
        return {success: true, stdout, stderr};
      } catch (error: any) {
        console.error('Error removing skill:', error);
        return {success: false, error: error.message || String(error)};
      }
    });

    // Handler: Update a skill
    mainIpc.lynxIpc.handle('skills-manager:update', async (name: string, isGlobal: boolean, skillPath?: string) => {
      try {
        let args = `update "${name}" -y`;
        if (isGlobal) args += ' -g';

        let targetCwd = '';
        if (!isGlobal && skillPath) {
          const dirs = getProjectDirs();
          const normSkillPath = path.normalize(skillPath).toLowerCase();
          const matched = dirs.find(d => normSkillPath.startsWith(path.normalize(d).toLowerCase()));
          if (matched) {
            targetCwd = matched;
          } else if (dirs.length > 0) {
            targetCwd = dirs[0];
          }
        }

        const {stdout, stderr} = await runSkillsCommand(args, targetCwd);
        return {success: true, stdout, stderr};
      } catch (error: any) {
        console.error('Error updating skill:', error);
        return {success: false, error: error.message || String(error)};
      }
    });

    // Handler: Open native directory selection dialog
    mainIpc.lynxIpc.handle('skills-manager:select-project-dir', async () => {
      try {
        const result = await dialog.showOpenDialog({
          properties: ['openDirectory'],
        });
        if (result.canceled || result.filePaths.length === 0) {
          return null;
        }
        return result.filePaths[0];
      } catch (error) {
        console.error('Error selecting project dir:', error);
        return null;
      }
    });

    // Handler: Get custom projects list
    mainIpc.lynxIpc.handle('skills-manager:get-project-dirs', async () => {
      return getProjectDirs();
    });

    // Handler: Add project directory
    mainIpc.lynxIpc.handle('skills-manager:add-project-dir', async (dir: string) => {
      const dirs = getProjectDirs();
      if (!dirs.includes(dir)) {
        const updated = [...dirs, dir];
        saveProjectDirs(updated);
        return updated;
      }
      return dirs;
    });

    // Handler: Remove project directory
    mainIpc.lynxIpc.handle('skills-manager:remove-project-dir', async (dir: string) => {
      const dirs = getProjectDirs();
      const updated = dirs.filter(d => d !== dir);
      saveProjectDirs(updated);
      return updated;
    });

    // Handler: Get grouping preference
    mainIpc.lynxIpc.handle('skills-manager:get-group-by', async () => {
      if (!storageManager) return 'all';
      return storageManager.getCustomData('skills-group-by') || 'all';
    });

    // Handler: Set grouping preference
    mainIpc.lynxIpc.handle('skills-manager:set-group-by', async (groupBy: string) => {
      if (!storageManager) return;
      storageManager.setCustomData('skills-group-by', groupBy);
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

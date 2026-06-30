export interface InstalledSkill {
  name: string;
  path: string;
  scope: 'project' | 'global';
  agents: string[];
}

export interface RegistrySkill {
  id: string;
  name: string;
  installs: number;
  source: string;
}

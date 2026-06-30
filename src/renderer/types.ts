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

export interface OfficialSkill {
  name: string;
  installs: number;
}

export interface OfficialRepo {
  repo: string;
  totalInstalls: number;
  skills: OfficialSkill[];
}

export interface OfficialOwner {
  owner: string;
  repos: OfficialRepo[];
}

export interface AuditProviderResult {
  provider: string;
  slug: string;
  status: 'pass' | 'warn' | 'fail';
  summary: string;
  auditedAt: string;
  riskLevel?: string;
}

export interface AuditReport {
  id: string;
  source: string;
  slug: string;
  audits: AuditProviderResult[];
}

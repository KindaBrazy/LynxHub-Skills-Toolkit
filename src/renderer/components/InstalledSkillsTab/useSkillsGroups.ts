import {CloudStorage, Folder, Laptop, User} from '@solar-icons/react-perf/BoldDuotone';
import React, {useCallback, useMemo} from 'react';

import {InstalledSkill} from '../../types';

export function useSkillsGroups(installedSkills: InstalledSkill[], filterQuery: string, groupBy: string) {
  const getParentFolderPath = useCallback((filePath: string) => {
    const normalized = filePath.replace(/\\/g, '/');
    const lastSlash = normalized.lastIndexOf('/');
    if (lastSlash === -1) return 'Other';
    return filePath.substring(0, lastSlash);
  }, []);

  const filteredSkills = useMemo(() => {
    if (!filterQuery.trim()) return installedSkills;
    const query = filterQuery.toLowerCase().trim();
    return installedSkills.filter(
      skill =>
        skill.name.toLowerCase().includes(query) ||
        skill.scope.toLowerCase().includes(query) ||
        (skill.path && skill.path.toLowerCase().includes(query)) ||
        (skill.agents && skill.agents.some(agent => agent.toLowerCase().includes(query))),
    );
  }, [installedSkills, filterQuery]);

  const getSkillsCountForDir = useCallback(
    (dir: string) => {
      const normDir = dir.replace(/\\/g, '/').toLowerCase();
      return installedSkills.filter(s => {
        const normPath = s.path.replace(/\\/g, '/').toLowerCase();
        return normPath.startsWith(normDir);
      }).length;
    },
    [installedSkills],
  );

  const uniqueAgents = useMemo(() => {
    const agentsSet = new Set<string>();
    for (const skill of installedSkills) {
      if (skill.agents) {
        for (const agent of skill.agents) {
          agentsSet.add(agent);
        }
      }
    }
    return Array.from(agentsSet).sort();
  }, [installedSkills]);

  const folderGroups = useMemo(() => {
    const map: Record<string, InstalledSkill[]> = {};
    for (const skill of filteredSkills) {
      const parent = getParentFolderPath(skill.path);
      if (!map[parent]) {
        map[parent] = [];
      }
      map[parent].push(skill);
    }
    return Object.entries(map).map(([folderPath, skills]) => ({
      id: folderPath,
      title: folderPath,
      icon: React.createElement(Folder, {className: 'size-4 text-LynxBlue'}),
      skills,
    }));
  }, [filteredSkills, getParentFolderPath]);

  const scopeGroups = useMemo(() => {
    const map: Record<'project' | 'global', InstalledSkill[]> = {
      project: [],
      global: [],
    };
    for (const skill of filteredSkills) {
      map[skill.scope].push(skill);
    }

    const groups: {
      id: string;
      title: string;
      icon: React.ReactNode;
      skills: InstalledSkill[];
    }[] = [];
    if (map.project.length > 0) {
      groups.push({
        id: 'project',
        title: 'Project Scope',
        icon: React.createElement(Laptop, {className: 'size-4 text-LynxBlue'}),
        skills: map.project,
      });
    }
    if (map.global.length > 0) {
      groups.push({
        id: 'global',
        title: 'Global Scope',
        icon: React.createElement(CloudStorage, {className: 'size-4 text-LynxPurple'}),
        skills: map.global,
      });
    }
    return groups;
  }, [filteredSkills]);

  const agentGroups = useMemo(() => {
    const map: Record<string, InstalledSkill[]> = {};
    const noAgentSkills: InstalledSkill[] = [];

    for (const skill of filteredSkills) {
      if (skill.agents && skill.agents.length > 0) {
        const firstAgent = skill.agents[0];
        if (!map[firstAgent]) {
          map[firstAgent] = [];
        }
        map[firstAgent].push(skill);
      } else {
        noAgentSkills.push(skill);
      }
    }

    const groups = Object.entries(map).map(([agentName, skills]) => ({
      id: agentName,
      title: `Agent: ${agentName}`,
      icon: React.createElement(User, {className: 'size-4 text-LynxPurple'}),
      skills,
    }));

    if (noAgentSkills.length > 0) {
      groups.push({
        id: 'none',
        title: 'Common (No Target Agent)',
        icon: React.createElement(User, {className: 'size-4 text-semi-muted'}),
        skills: noAgentSkills,
      });
    }
    return groups;
  }, [filteredSkills]);

  const currentGroups = useMemo(() => {
    if (groupBy === 'folder') return folderGroups;
    if (groupBy === 'scope') return scopeGroups;
    if (groupBy === 'agents') return agentGroups;
    return [];
  }, [groupBy, folderGroups, scopeGroups, agentGroups]);

  return {
    filteredSkills,
    currentGroups,
    uniqueAgents,
    getSkillsCountForDir,
  };
}

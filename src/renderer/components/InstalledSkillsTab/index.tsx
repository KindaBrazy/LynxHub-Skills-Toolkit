import type {Selection} from '@heroui/react';
import {
  Accordion,
  Button,
  Chip,
  cn,
  Description,
  Dropdown,
  InputGroup,
  Label,
  ListBox,
  ScrollShadow,
  Select,
  Separator,
  Spinner,
  Typography,
} from '@heroui/react';
import {bottomToast} from '@lynx/layouts/ToastProviders';
import {CloudStorage, Folder, InfoCircle, Laptop, User} from '@solar-icons/react-perf/BoldDuotone';
import {AltArrowDown, Magnifier, Refresh} from '@solar-icons/react-perf/Linear';
import {X} from 'lucide-react';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {InstalledSkill} from '../../types';
import {ProjectFoldersPopover} from './ProjectFoldersPopover';
import {SkillsTable} from './SkillsTable';

const ipc = (window as any).electron.ipcRenderer;

interface InstalledSkillsTabProps {
  installedSkills: InstalledSkill[];
  isLoadingInstalled: boolean;
  onRefreshInstalled: () => Promise<void>;
  onSwitchTab?: (tabKey: string) => void;
}

export default function InstalledSkillsTab({
  installedSkills,
  isLoadingInstalled,
  onRefreshInstalled,
  onSwitchTab,
}: InstalledSkillsTabProps) {
  const [updatingSkills, setUpdatingSkills] = useState<Record<string, boolean>>({});
  const [deletingSkills, setDeletingSkills] = useState<Record<string, boolean>>({});
  const [confirmDelete, setConfirmDelete] = useState<Record<string, boolean>>({});
  const [groupBy, setGroupBy] = useState<string>('all');
  const [expandedKeys, setExpandedKeys] = useState<Set<any>>(new Set());

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set<any>());
  const [confirmBulkDelete, setConfirmBulkDelete] = useState(false);
  const [bulkLoadingStatus, setBulkLoadingStatus] = useState<string | null>(null);

  const confirmBulkDeleteTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [projectDirs, setProjectDirs] = useState<string[]>([]);

  const loadProjects = useCallback(async () => {
    try {
      const dirs = await ipc.invoke('skills-manager:get-project-dirs');
      setProjectDirs(dirs || []);
    } catch (err) {
      console.error('Failed to load project dirs:', err);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleAddProjectDir = useCallback(async () => {
    try {
      const dir = await ipc.invoke('skills-manager:select-project-dir');
      if (dir) {
        const updated = await ipc.invoke('skills-manager:add-project-dir', dir);
        setProjectDirs(updated || []);
        bottomToast.success('Project folder registered successfully!');
        await onRefreshInstalled();
      }
    } catch (err) {
      console.error('Failed to add project folder:', err);
    }
  }, [onRefreshInstalled]);

  const handleRemoveProjectDir = useCallback(
    async (dir: string) => {
      try {
        const updated = await ipc.invoke('skills-manager:remove-project-dir', dir);
        setProjectDirs(updated || []);
        bottomToast.success('Project folder unregistered.');
        await onRefreshInstalled();
      } catch (err) {
        console.error('Failed to remove project folder:', err);
      }
    },
    [onRefreshInstalled],
  );

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

  // Clean up confirmation timer on unmount
  useEffect(() => {
    return () => {
      if (confirmBulkDeleteTimeoutRef.current) {
        clearTimeout(confirmBulkDeleteTimeoutRef.current);
      }
    };
  }, []);

  // Clear selected keys that are no longer present in installedSkills
  useEffect(() => {
    setSelectedKeys(prev => {
      if (prev === 'all') return prev;
      const validKeys = new Set(installedSkills.map(s => `${s.name}-${s.scope}`));
      const next = new Set<any>();
      const prevSet = prev as Set<any>;
      for (const k of prevSet) {
        if (validKeys.has(String(k))) {
          next.add(k);
        }
      }
      if (next.size !== prevSet.size) {
        return next;
      }
      return prev;
    });
  }, [installedSkills]);

  const selectedSkillsList = useMemo(() => {
    if (selectedKeys === 'all') {
      return installedSkills;
    }
    const keysSet = selectedKeys as Set<any>;
    return installedSkills.filter(skill => {
      const key = `${skill.name}-${skill.scope}`;
      return keysSet.has(key);
    });
  }, [selectedKeys, installedSkills]);

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

  const toggleSelectSkill = useCallback((skillKey: string) => {
    setSelectedKeys(prev => {
      const next = new Set<any>(prev === 'all' ? [] : Array.from(prev as Set<any>));
      if (next.has(skillKey)) {
        next.delete(skillKey);
      } else {
        next.add(skillKey);
      }
      return next;
    });
  }, []);

  const handleBulkUpdate = useCallback(
    async (skillsToUpdate: InstalledSkill[]) => {
      if (skillsToUpdate.length === 0) return;

      setSelectedKeys(new Set());
      setBulkLoadingStatus(`Preparing to update ${skillsToUpdate.length} skill(s)...`);

      let successCount = 0;
      let failCount = 0;

      for (let i = 0; i < skillsToUpdate.length; i++) {
        const skill = skillsToUpdate[i];
        setBulkLoadingStatus(`Updating skill ${i + 1} of ${skillsToUpdate.length}: "${skill.name}"...`);
        try {
          const res = await ipc.invoke('skills-manager:update', skill.name, skill.scope === 'global', skill.path);
          if (res.success) {
            successCount++;
          } else {
            failCount++;
            console.error(`Failed to update ${skill.name}:`, res.error);
          }
        } catch (err) {
          failCount++;
          console.error(`Error updating ${skill.name}:`, err);
        }
      }

      setBulkLoadingStatus(null);
      await onRefreshInstalled();

      if (failCount === 0) {
        bottomToast.success(`Successfully updated all ${successCount} skill(s)!`);
      } else {
        bottomToast.warning(`Updated ${successCount} skill(s), ${failCount} failed.`);
      }
    },
    [onRefreshInstalled],
  );

  const handleBulkRemove = useCallback(
    async (skillsToRemove: InstalledSkill[]) => {
      if (skillsToRemove.length === 0) return;

      setSelectedKeys(new Set());
      setConfirmBulkDelete(false);
      setBulkLoadingStatus(`Preparing to remove ${skillsToRemove.length} skill(s)...`);

      let successCount = 0;
      let failCount = 0;

      for (let i = 0; i < skillsToRemove.length; i++) {
        const skill = skillsToRemove[i];
        setBulkLoadingStatus(`Removing skill ${i + 1} of ${skillsToRemove.length}: "${skill.name}"...`);
        try {
          const res = await ipc.invoke('skills-manager:remove', skill.name, skill.scope === 'global', skill.path);
          if (res.success) {
            successCount++;
          } else {
            failCount++;
            console.error(`Failed to remove ${skill.name}:`, res.error);
          }
        } catch (err) {
          failCount++;
          console.error(`Error removing ${skill.name}:`, err);
        }
      }

      setBulkLoadingStatus(null);
      await onRefreshInstalled();

      if (failCount === 0) {
        bottomToast.success(`Successfully removed all ${successCount} skill(s).`);
      } else {
        bottomToast.warning(`Removed ${successCount} skill(s), ${failCount} failed.`);
      }
    },
    [onRefreshInstalled],
  );

  const onPressBulkRemove = useCallback(() => {
    if (!confirmBulkDelete) {
      setConfirmBulkDelete(true);
      if (confirmBulkDeleteTimeoutRef.current) {
        clearTimeout(confirmBulkDeleteTimeoutRef.current);
      }
      confirmBulkDeleteTimeoutRef.current = setTimeout(() => {
        setConfirmBulkDelete(false);
      }, 3000);
    } else {
      if (confirmBulkDeleteTimeoutRef.current) {
        clearTimeout(confirmBulkDeleteTimeoutRef.current);
      }
      handleBulkRemove(selectedSkillsList);
    }
  }, [confirmBulkDelete, selectedSkillsList, handleBulkRemove]);

  const handleBulkActionOption = useCallback(
    (key: React.Key) => {
      const option = String(key);
      if (option === 'all') {
        handleBulkUpdate(installedSkills);
      } else if (option === 'project') {
        const filtered = installedSkills.filter(s => s.scope === 'project');
        handleBulkUpdate(filtered);
      } else if (option === 'global') {
        const filtered = installedSkills.filter(s => s.scope === 'global');
        handleBulkUpdate(filtered);
      } else if (option.startsWith('agent-')) {
        const agentName = option.substring('agent-'.length);
        const filtered = installedSkills.filter(s => s.agents && s.agents.includes(agentName));
        handleBulkUpdate(filtered);
      }
    },
    [installedSkills, handleBulkUpdate],
  );

  const getParentFolderPath = useCallback((filePath: string) => {
    const normalized = filePath.replace(/\\/g, '/');
    const lastSlash = normalized.lastIndexOf('/');
    if (lastSlash === -1) return 'Other';
    return filePath.substring(0, lastSlash);
  }, []);

  const [filterQuery, setFilterQuery] = useState('');

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
      icon: <Folder className="size-4 text-LynxBlue" />,
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
        icon: <Laptop className="size-4 text-LynxBlue" />,
        skills: map.project,
      });
    }
    if (map.global.length > 0) {
      groups.push({
        id: 'global',
        title: 'Global Scope',
        icon: <CloudStorage className="size-4 text-LynxPurple" />,
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
      icon: <User className="size-4 text-LynxPurple" />,
      skills,
    }));

    if (noAgentSkills.length > 0) {
      groups.push({
        id: 'none',
        title: 'Common (No Target Agent)',
        icon: <User className="size-4 text-semi-muted" />,
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

  // Expand the first group and collapse others by default when currentGroups changes
  useEffect(() => {
    if (currentGroups.length > 0) {
      setExpandedKeys(new Set([currentGroups[0].id]));
    } else {
      setExpandedKeys(new Set());
    }
  }, [currentGroups]);

  const handleUpdate = useCallback(
    async (name: string, isGlobal: boolean, path?: string) => {
      setUpdatingSkills(prev => ({...prev, [name]: true}));
      try {
        const res = await ipc.invoke('skills-manager:update', name, isGlobal, path);
        if (res.success) {
          bottomToast.success(`Successfully updated skill "${name}"!`);
          await onRefreshInstalled();
        } else {
          bottomToast.danger(`Failed to update skill: ${res.error}`);
        }
      } catch (err: any) {
        console.error('Update error:', err);
        bottomToast.danger(`Update error: ${err.message || String(err)}`);
      } finally {
        setUpdatingSkills(prev => ({...prev, [name]: false}));
      }
    },
    [onRefreshInstalled],
  );

  const handleDelete = useCallback(
    async (name: string, isGlobal: boolean, path?: string) => {
      if (!confirmDelete[name]) {
        setConfirmDelete(prev => ({...prev, [name]: true}));
        // Reset after 3 seconds if not confirmed
        setTimeout(() => {
          setConfirmDelete(prev => ({...prev, [name]: false}));
        }, 3000);
        return;
      }

      setDeletingSkills(prev => ({...prev, [name]: true}));
      try {
        const res = await ipc.invoke('skills-manager:remove', name, isGlobal, path);
        if (res.success) {
          bottomToast.success(`Successfully removed skill "${name}".`);
          await onRefreshInstalled();
        } else {
          bottomToast.danger(`Failed to remove skill: ${res.error}`);
        }
      } catch (err: any) {
        console.error('Remove error:', err);
        bottomToast.danger(`Remove error: ${err.message || String(err)}`);
      } finally {
        setDeletingSkills(prev => ({...prev, [name]: false}));
        setConfirmDelete(prev => ({...prev, [name]: false}));
      }
    },
    [confirmDelete, onRefreshInstalled],
  );

  const renderSkillsTable = useCallback(
    (skills: InstalledSkill[], showHeader = false) => (
      <SkillsTable
        skills={skills}
        showHeader={showHeader}
        selectedKeys={selectedKeys}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        confirmDelete={confirmDelete}
        updatingSkills={updatingSkills}
        deletingSkills={deletingSkills}
        setSelectedKeys={setSelectedKeys}
        bulkLoadingStatus={bulkLoadingStatus}
        toggleSelectSkill={toggleSelectSkill}
        selectedSkillsList={selectedSkillsList}
      />
    ),
    [
      selectedKeys,
      selectedSkillsList,
      updatingSkills,
      deletingSkills,
      confirmDelete,
      bulkLoadingStatus,
      handleUpdate,
      handleDelete,
      toggleSelectSkill,
    ],
  );

  if (isLoadingInstalled) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Spinner size="lg" />
        <Description className="text-sm text-semi-muted">Loading installed skills...</Description>
      </div>
    );
  }

  return (
    <div className="size-full flex flex-col overflow-hidden">
      {installedSkills.length === 0 ? (
        <div
          className={
            'flex flex-col items-center justify-center py-20 border' +
            ' border-dashed border-white/10 rounded-2xl bg-white/5 mx-2'
          }>
          <InfoCircle aria-hidden="true" className="size-10 text-semi-muted mb-3" />
          <Typography className="text-sm font-semibold">No skills installed yet</Typography>
          <Description className="text-xs text-semi-muted mt-1">
            Head over to the 'Discover Skills' tab to install capabilities for your agents.
          </Description>
          {onSwitchTab && (
            <Button
              size="sm"
              onPress={() => onSwitchTab('discover')}
              className="mt-4 bg-LynxPurple text-white px-5 hover:opacity-90 transition">
              Browse Skills
            </Button>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          {/* Bulk operation progress banner */}
          {bulkLoadingStatus && (
            <div
              className={
                'flex items-center gap-3 px-3 py-2.5 bg-LynxBlue/15 border' +
                ' border-LynxBlue/25 rounded-xl mb-4 text-xs text-white/95 animate-pulse'
              }>
              <Spinner size="sm" />
              <span className="font-medium">{bulkLoadingStatus}</span>
            </div>
          )}

          {/* Top Bar for controls */}
          <div className="flex justify-between items-center mb-4 gap-4 px-2">
            {selectedSkillsList.length > 0 ? (
              <div className="flex items-center gap-3">
                <Typography className="text-sm font-semibold text-LynxBlue">
                  {selectedSkillsList.length} skill{selectedSkillsList.length === 1 ? '' : 's'} selected
                </Typography>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-xs"
                    isDisabled={!!bulkLoadingStatus}
                    onPress={() => handleBulkUpdate(selectedSkillsList)}>
                    <Refresh className="size-3.5" />
                    Update Selected
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs"
                    variant="danger-soft"
                    onPress={onPressBulkRemove}
                    isDisabled={!!bulkLoadingStatus}>
                    <Refresh className="size-3.5" />
                    {confirmBulkDelete ? 'Confirm Remove?' : 'Remove Selected'}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    isDisabled={!!bulkLoadingStatus}
                    onPress={() => setSelectedKeys(new Set())}
                    className="text-xs text-semi-muted hover:text-white">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Typography className="text-sm text-semi-muted">
                  {filterQuery.trim()
                    ? `Found ${filteredSkills.length} of ${installedSkills.length} skills`
                    : `Showing ${installedSkills.length} installed skill${installedSkills.length === 1 ? '' : 's'}`}
                </Typography>
                <Dropdown>
                  <Dropdown.Trigger>
                    <Button size="sm" variant="secondary" className="text-xs" isDisabled={!!bulkLoadingStatus}>
                      <Refresh className="size-3.5" />
                      Update All
                    </Button>
                  </Dropdown.Trigger>
                  <Dropdown.Popover className="min-w-50">
                    <Dropdown.Menu onAction={handleBulkActionOption}>
                      <Dropdown.Item id="all" textValue="Update All">
                        <Label>Update All ({installedSkills.length})</Label>
                      </Dropdown.Item>
                      <Dropdown.Item id="project" textValue="Update Project Scope">
                        <Label>
                          Update Project Scope ({installedSkills.filter(s => s.scope === 'project').length})
                        </Label>
                      </Dropdown.Item>
                      <Dropdown.Item id="global" textValue="Update Global Scope">
                        <Label>Update Global Scope ({installedSkills.filter(s => s.scope === 'global').length})</Label>
                      </Dropdown.Item>

                      {uniqueAgents.length > 0 && <Separator className="my-1" />}

                      {uniqueAgents.map(agent => {
                        const agentCount = installedSkills.filter(s => s.agents && s.agents.includes(agent)).length;
                        return (
                          <Dropdown.Item key={agent} id={`agent-${agent}`} textValue={`Update Agent: ${agent}`}>
                            <Label>
                              Update Agent: {agent} ({agentCount})
                            </Label>
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <InputGroup className="w-64" variant="secondary">
                <InputGroup.Prefix aria-hidden="true">
                  <Magnifier className="size-3.5 text-semi-muted" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  value={filterQuery}
                  className="text-xs"
                  aria-label="Filter skills"
                  placeholder="Filter skills..."
                  onChange={e => setFilterQuery(e.target.value)}
                />
                {filterQuery && (
                  <InputGroup.Suffix className="pr-2">
                    <Button
                      className={
                        'h-5 w-5 min-w-5 p-0 hover:bg-foreground/10 rounded-full flex items-center justify-center'
                      }
                      size="sm"
                      variant="ghost"
                      aria-label="Clear filter"
                      onPress={() => setFilterQuery('')}
                      isIconOnly>
                      <X className="size-3 text-semi-muted" />
                    </Button>
                  </InputGroup.Suffix>
                )}
              </InputGroup>

              <span className="text-xs text-semi-muted whitespace-nowrap ml-2">Group by:</span>
              <Select
                value={groupBy}
                className="w-56"
                variant="secondary"
                placeholder="All Skills"
                isDisabled={!!bulkLoadingStatus}
                onChange={val => setGroupBy((val as string) || 'all')}>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="all" textValue="All Skills">
                      All Skills
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="folder" textValue="Folder">
                      Folder
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="scope" textValue="Scope">
                      Scope
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="agents" textValue="Target Agent">
                      Target Agent
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              <ProjectFoldersPopover
                projectDirs={projectDirs}
                onAddProjectDir={handleAddProjectDir}
                getSkillsCountForDir={getSkillsCountForDir}
                onRemoveProjectDir={handleRemoveProjectDir}
              />
            </div>
          </div>

          <ScrollShadow className="flex-1 overflow-y-auto px-2">
            {groupBy === 'all' ? (
              renderSkillsTable(filteredSkills, true)
            ) : (
              <Accordion
                expandedKeys={expandedKeys}
                className="flex flex-col gap-4 w-full"
                onExpandedChange={keys => setExpandedKeys(keys as Set<any>)}
                hideSeparator
                allowsMultipleExpanded>
                {currentGroups.map(group => (
                  <Accordion.Item
                    id={group.id}
                    key={group.id}
                    className="border border-foreground/5 rounded-2xl bg-foreground/2 pt-2 flex flex-col gap-3">
                    <Accordion.Heading>
                      <Accordion.Trigger
                        className={
                          'flex items-center justify-between cursor-pointer select-none w-full text-left' +
                          ' bg-transparent hover:bg-transparent border-none p-0 px-4 focus:outline-none'
                        }>
                        <div className="flex items-center gap-2 truncate">
                          <AltArrowDown
                            className={cn(
                              'size-4 text-semi-muted transition-transform duration-200 shrink-0',
                              !expandedKeys.has(group.id) && '-rotate-90',
                            )}
                          />
                          {group.icon}
                          <Typography
                            className={cn(
                              'font-semibold font-JetBrainsMono truncate',
                              groupBy === 'folder'
                                ? 'text-[12px] text-foreground/90'
                                : 'text-[13px] text-foreground/95',
                            )}
                            title={group.title}>
                            {group.title}
                          </Typography>
                          <Chip
                            size="sm"
                            variant="secondary"
                            className="bg-foreground/10 text-semi-muted text-[10px] h-5 py-0">
                            {group.skills.length}
                          </Chip>
                        </div>
                        {groupBy === 'folder' && (
                          <div className="ml-auto" onClick={e => e.stopPropagation()}>
                            <Button
                              className={
                                'text-[10px] text-semi-muted hover:text-LynxBlue' +
                                ' h-auto p-0 border-none bg-transparent min-w-0 cursor-pointer hover:bg-transparent'
                              }
                              size="sm"
                              variant="ghost"
                              onPress={() => ipc.send('app:openPath', group.id)}>
                              Open Folder
                            </Button>
                          </div>
                        )}
                      </Accordion.Trigger>
                    </Accordion.Heading>
                    <Accordion.Panel>
                      <Accordion.Body className="pt-3">{renderSkillsTable(group.skills)}</Accordion.Body>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            )}
          </ScrollShadow>
        </div>
      )}
    </div>
  );
}

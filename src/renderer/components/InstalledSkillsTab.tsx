import {
  Button,
  Chip,
  Description,
  ListBox,
  ScrollShadow,
  Select,
  Spinner,
  Table,
  Tooltip,
  Typography,
} from '@heroui/react';
import {bottomToast} from '@lynx/layouts/ToastProviders';
import {CloudStorage, Folder, InfoCircle, Laptop, TrashBin2, User} from '@solar-icons/react-perf/BoldDuotone';
import {Refresh} from '@solar-icons/react-perf/Linear';
import {useCallback, useMemo, useState} from 'react';

import {InstalledSkill} from '../types';

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

  const getParentFolderPath = useCallback((filePath: string) => {
    const normalized = filePath.replace(/\\/g, '/');
    const lastSlash = normalized.lastIndexOf('/');
    if (lastSlash === -1) return 'Other';
    return filePath.substring(0, lastSlash);
  }, []);

  const folderGroups = useMemo(() => {
    const map: Record<string, InstalledSkill[]> = {};
    for (const skill of installedSkills) {
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
  }, [installedSkills, getParentFolderPath]);

  const scopeGroups = useMemo(() => {
    const map: Record<'project' | 'global', InstalledSkill[]> = {
      project: [],
      global: [],
    };
    for (const skill of installedSkills) {
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
  }, [installedSkills]);

  const agentGroups = useMemo(() => {
    const map: Record<string, InstalledSkill[]> = {};
    const noAgentSkills: InstalledSkill[] = [];

    for (const skill of installedSkills) {
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
  }, [installedSkills]);

  const currentGroups = useMemo(() => {
    if (groupBy === 'folder') return folderGroups;
    if (groupBy === 'scope') return scopeGroups;
    if (groupBy === 'agents') return agentGroups;
    return [];
  }, [groupBy, folderGroups, scopeGroups, agentGroups]);

  const handleUpdate = useCallback(
    async (name: string, isGlobal: boolean) => {
      setUpdatingSkills(prev => ({...prev, [name]: true}));
      try {
        const res = await ipc.invoke('skills-manager:update', name, isGlobal);
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
    async (name: string, isGlobal: boolean) => {
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
        const res = await ipc.invoke('skills-manager:remove', name, isGlobal);
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
    (skills: InstalledSkill[]) => (
      <Table className="w-full">
        <Table.ScrollContainer>
          <Table.Content>
            <Table.Header>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Scope</Table.Column>
              <Table.Column>Target Agents</Table.Column>
              <Table.Column>Location</Table.Column>
              <Table.Column className="w-48 text-right">Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {skills.map(skill => (
                <Table.Row key={`${skill.name}-${skill.scope}`} className="hover:bg-white/5 transition">
                  <Table.Cell className="font-semibold text-sm">{skill.name}</Table.Cell>
                  <Table.Cell>
                    <Chip
                      className={
                        skill.scope === 'project'
                          ? 'bg-LynxBlue/20 text-LynxBlue text-xs'
                          : 'bg-LynxPurple/20 text-LynxPurple text-xs'
                      }
                      variant="secondary">
                      {skill.scope === 'project' ? 'Project' : 'Global'}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-wrap gap-1 items-center max-w-44">
                      {skill.agents && skill.agents.length > 0 ? (
                        skill.agents.length <= 2 ? (
                          skill.agents.map(agent => (
                            <Chip key={agent} className="bg-white/10 text-white/90 text-[10px] h-5 py-0.5 shrink-0">
                              {agent}
                            </Chip>
                          ))
                        ) : (
                          <>
                            {skill.agents.slice(0, 2).map(agent => (
                              <Chip key={agent} className="bg-white/10 text-white/90 text-[10px] h-5 py-0.5 shrink-0">
                                {agent}
                              </Chip>
                            ))}
                            <Tooltip delay={300}>
                              <Tooltip.Trigger>
                                <Chip
                                  className={
                                    'bg-white/5 hover:bg-white/15 text-white/70' +
                                    ' text-[10px] h-5 py-0.5 cursor-pointer shrink-0'
                                  }>
                                  +{skill.agents.length - 2} more
                                </Chip>
                              </Tooltip.Trigger>
                              <Tooltip.Content showArrow>
                                <Tooltip.Arrow />
                                <div className="flex flex-col gap-1 p-1">
                                  {skill.agents.slice(2).map(agent => (
                                    <span key={agent} className="text-xs font-semibold">
                                      {agent}
                                    </span>
                                  ))}
                                </div>
                              </Tooltip.Content>
                            </Tooltip>
                          </>
                        )
                      ) : (
                        <span className="text-xs text-semi-muted">None</span>
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="">
                    <Tooltip delay={300}>
                      <Tooltip.Trigger>
                        <Button
                          className={
                            'font-JetBrainsMono text-xs text-semi-muted hover:text-LynxBlue' +
                            ' cursor-pointer h-auto justify-start border-none' +
                            ' hover:bg-transparent font-normal text-left text-wrap line-clamp-1'
                          }
                          size="sm"
                          variant="ghost"
                          onPress={() => ipc.send('app:openPath', skill.path)}>
                          {skill.path}
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content showArrow>
                        <Tooltip.Arrow />
                        {skill.path}
                      </Tooltip.Content>
                    </Tooltip>
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    <div className="inline-flex gap-2">
                      <Button
                        size="sm"
                        variant="tertiary"
                        className="text-xs"
                        onPress={() => handleUpdate(skill.name, skill.scope === 'global')}
                        isDisabled={updatingSkills[skill.name] || deletingSkills[skill.name]}>
                        {updatingSkills[skill.name] ? <Spinner size="sm" /> : <Refresh />}
                        Update
                      </Button>
                      <Button
                        size="sm"
                        className="text-xs"
                        variant="danger-soft"
                        onPress={() => handleDelete(skill.name, skill.scope === 'global')}
                        isDisabled={updatingSkills[skill.name] || deletingSkills[skill.name]}>
                        {deletingSkills[skill.name] ? <Spinner size="sm" /> : <TrashBin2 />}
                        {confirmDelete[skill.name] ? 'Confirm?' : 'Remove'}
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    ),
    [updatingSkills, deletingSkills, confirmDelete, handleUpdate, handleDelete],
  );

  if (isLoadingInstalled) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Spinner size="lg" />
        <Description className="text-sm text-semi-muted">Loading installed skills...</Description>
      </div>
    );
  }

  if (installedSkills.length === 0) {
    return (
      <div
        className={
          'flex flex-col items-center justify-center py-20 border' +
          ' border-dashed border-white/10 rounded-2xl bg-white/5'
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
    );
  }

  return (
    <div className="size-full flex flex-col overflow-hidden">
      {/* Top Bar for controls */}
      <div className="flex justify-between items-center mb-4 gap-4 px-2">
        <Typography className="text-sm text-semi-muted">
          Showing {installedSkills.length} installed skill{installedSkills.length === 1 ? '' : 's'}
        </Typography>
        <div className="flex items-center gap-2">
          <span className="text-xs text-semi-muted whitespace-nowrap">Group by:</span>
          <Select
            value={groupBy}
            className="w-56"
            variant="secondary"
            placeholder="All Skills"
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
        </div>
      </div>

      <ScrollShadow className="flex-1 overflow-y-auto px-2">
        {groupBy === 'all' ? (
          renderSkillsTable(installedSkills)
        ) : (
          <div className="flex flex-col gap-6">
            {currentGroups.map(group => (
              <div key={group.id} className="border border-white/5 rounded-xl bg-white/[0.02] p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 px-1">
                  {group.icon}
                  <Typography
                    title={group.title}
                    className="text-sm font-semibold text-white/90 font-JetBrainsMono truncate max-w-[60%]">
                    {group.title}
                  </Typography>
                  <Chip size="sm" variant="secondary" className="bg-white/10 text-white/80 text-[10px] h-5 py-0">
                    {group.skills.length}
                  </Chip>
                  {groupBy === 'folder' && (
                    <Button
                      className={
                        'text-[10px] text-semi-muted hover:text-LynxBlue' +
                        ' h-auto p-0 border-none bg-transparent min-w-0 ml-auto cursor-pointer hover:bg-transparent'
                      }
                      size="sm"
                      variant="ghost"
                      onPress={() => ipc.send('app:openPath', group.id)}>
                      Open Folder
                    </Button>
                  )}
                </div>
                {renderSkillsTable(group.skills)}
              </div>
            ))}
          </div>
        )}
      </ScrollShadow>
    </div>
  );
}

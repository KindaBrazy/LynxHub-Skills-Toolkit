import {Button, Chip, Description, ScrollShadow, Spinner, Table, Tooltip, Typography} from '@heroui/react';
import {bottomToast} from '@lynx/layouts/ToastProviders';
import {InfoCircle, TrashBin2} from '@solar-icons/react-perf/BoldDuotone';
import {Refresh} from '@solar-icons/react-perf/Linear';
import {useCallback, useState} from 'react';

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
    <div className="size-full overflow-hidden">
      <ScrollShadow className="size-full overflow-y-auto px-2">
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
                {installedSkills.map(skill => (
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
      </ScrollShadow>
    </div>
  );
}

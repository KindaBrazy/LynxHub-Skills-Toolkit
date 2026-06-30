import {Button, Chip, Description, ScrollShadow, Spinner, Table, Typography} from '@heroui/react';
import {InfoCircle, TrashBinMinimalistic} from '@solar-icons/react-perf/BoldDuotone';
import {Refresh} from '@solar-icons/react-perf/Linear';
import {useCallback, useState} from 'react';

import {InstalledSkill} from '../types';

const ipc = (window as any).electron.ipcRenderer;

interface InstalledSkillsTabProps {
  installedSkills: InstalledSkill[];
  isLoadingInstalled: boolean;
  onRefreshInstalled: () => Promise<void>;
}

export default function InstalledSkillsTab({
  installedSkills,
  isLoadingInstalled,
  onRefreshInstalled,
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
          await onRefreshInstalled();
        } else {
          alert(`Failed to update skill: ${res.error}`);
        }
      } catch (err) {
        console.error('Update error:', err);
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
          await onRefreshInstalled();
        } else {
          alert(`Failed to remove skill: ${res.error}`);
        }
      } catch (err) {
        console.error('Remove error:', err);
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
        <InfoCircle className="size-10 text-semi-muted mb-3" />
        <Typography className="text-sm font-semibold">No skills installed yet</Typography>
        <Description className="text-xs text-semi-muted mt-1">
          Head over to the 'Discover Skills' tab to install capabilities for your agents.
        </Description>
      </div>
    );
  }

  return (
    <div className="size-full overflow-hidden">
      <ScrollShadow className="size-full overflow-y-auto">
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
                      <div className="flex flex-wrap gap-1">
                        {skill.agents && skill.agents.length > 0 ? (
                          skill.agents.map(agent => (
                            <Chip key={agent} className="bg-white/10 text-white/90 text-[10px] h-5 py-0.5">
                              {agent}
                            </Chip>
                          ))
                        ) : (
                          <span className="text-xs text-semi-muted">None</span>
                        )}
                      </div>
                    </Table.Cell>
                    <Table.Cell className="font-JetBrainsMono text-xs text-semi-muted max-w-50 truncate">
                      {skill.path}
                    </Table.Cell>
                    <Table.Cell className="text-right">
                      <div className="inline-flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-3 text-xs"
                          onPress={() => handleUpdate(skill.name, skill.scope === 'global')}
                          isDisabled={updatingSkills[skill.name] || deletingSkills[skill.name]}>
                          {updatingSkills[skill.name] ? <Spinner size="sm" /> : <Refresh className="size-4 mr-1.5" />}
                          Update
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onPress={() => handleDelete(skill.name, skill.scope === 'global')}
                          isDisabled={updatingSkills[skill.name] || deletingSkills[skill.name]}
                          className="h-8 px-3 text-xs border-danger/20 hover:bg-danger/20 hover:text-white">
                          {deletingSkills[skill.name] ? (
                            <Spinner size="sm" />
                          ) : (
                            <TrashBinMinimalistic className="size-4 mr-1.5" />
                          )}
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

import type {Selection} from '@heroui/react';
import {Button, Checkbox, Chip, cn, Spinner, Tooltip} from '@heroui/react';
import {Folder, TrashBin2} from '@solar-icons/react-perf/BoldDuotone';
import {Refresh} from '@solar-icons/react-perf/Linear';

import {InstalledSkill} from '../../types';

const ipc = (window as any).electron.ipcRenderer;

interface SkillsTableProps {
  skills: InstalledSkill[];
  selectedKeys: Selection;
  setSelectedKeys: (keys: Selection) => void;
  selectedSkillsList: InstalledSkill[];
  updatingSkills: Record<string, boolean>;
  deletingSkills: Record<string, boolean>;
  confirmDelete: Record<string, boolean>;
  bulkLoadingStatus: string | null;
  handleUpdate: (name: string, isGlobal: boolean, path?: string) => Promise<void>;
  handleDelete: (name: string, isGlobal: boolean, path?: string) => Promise<void>;
  toggleSelectSkill: (skillKey: string) => void;
  showHeader?: boolean;
}

export function SkillsTable({
  skills,
  selectedKeys,
  setSelectedKeys,
  selectedSkillsList,
  updatingSkills,
  deletingSkills,
  confirmDelete,
  bulkLoadingStatus,
  handleUpdate,
  handleDelete,
  toggleSelectSkill,
  showHeader = false,
}: SkillsTableProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {showHeader && (
        <div
          className={
            'flex items-center gap-4 px-3 py-1.5 border-b border-foreground/5' +
            ' text-xs font-semibold text-semi-muted select-none'
          }>
          <div className="w-8 shrink-0 flex justify-center">
            <Checkbox
              onChange={checked => {
                setSelectedKeys(checked ? new Set(skills.map(s => `${s.name}-${s.scope}`)) : new Set());
              }}
              variant="secondary"
              aria-label="Select all"
              isSelected={selectedSkillsList.length === skills.length && skills.length > 0}
              isIndeterminate={selectedSkillsList.length > 0 && selectedSkillsList.length < skills.length}>
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
              </Checkbox.Content>
            </Checkbox>
          </div>
          <div className="flex-1 min-w-0">Name</div>
          <div className="w-44 shrink-0">Target Agents</div>
          <div className="w-12 shrink-0 text-center">Location</div>
          <div className="w-20 shrink-0 text-right">Actions</div>
        </div>
      )}
      <div className="flex flex-col gap-1 mt-1">
        {skills.map(skill => {
          const rowKey = `${skill.name}-${skill.scope}`;
          const isSelected = selectedKeys === 'all' || (selectedKeys as Set<any>).has(rowKey);
          const isUpdating = updatingSkills[skill.name];
          const isDeleting = deletingSkills[skill.name];

          return (
            <div
              className={cn(
                'group flex items-center gap-4 py-1.5 px-3 hover:bg-foreground/5' +
                  ' rounded-xl border border-transparent transition-all duration-150',
                isSelected && 'bg-foreground/[0.03] border-foreground/10',
              )}
              key={rowKey}>
              {/* Checkbox */}
              <div className="w-8 shrink-0 flex justify-center">
                <Checkbox
                  variant="secondary"
                  isSelected={isSelected}
                  aria-label={`Select ${skill.name}`}
                  onChange={() => toggleSelectSkill(rowKey)}>
                  <Checkbox.Content>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox.Content>
                </Checkbox>
              </div>

              {/* Name and Scope */}
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <span className="font-semibold text-sm text-foreground/90 truncate">{skill.name}</span>
                <Chip
                  className={cn(
                    'text-[10px] h-5 px-1.5 py-0 shrink-0 font-medium',
                    skill.scope === 'project'
                      ? 'bg-LynxBlue/15 text-LynxBlue border border-LynxBlue/20'
                      : 'bg-LynxPurple/15 text-LynxPurple border border-LynxPurple/20',
                  )}
                  variant="secondary">
                  {skill.scope === 'project' ? 'Project' : 'Global'}
                </Chip>
              </div>

              {/* Target Agents */}
              <div className="w-44 shrink-0 flex flex-wrap gap-1 items-center">
                {skill.agents && skill.agents.length > 0 ? (
                  skill.agents.length <= 2 ? (
                    skill.agents.map(agent => (
                      <Chip key={agent} className="bg-foreground/10 text-foreground/80 text-[10px] h-5 py-0.5 shrink-0">
                        {agent}
                      </Chip>
                    ))
                  ) : (
                    <>
                      {skill.agents.slice(0, 2).map(agent => (
                        <Chip
                          key={agent}
                          className="bg-foreground/10 text-foreground/80 text-[10px] h-5 py-0.5 shrink-0">
                          {agent}
                        </Chip>
                      ))}
                      <Tooltip delay={300}>
                        <Tooltip.Trigger>
                          <Chip
                            className={
                              'bg-foreground/5 hover:bg-foreground/15 text-foreground/60' +
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

              {/* Location Folder Icon */}
              <div className="w-12 shrink-0 flex justify-center">
                <Tooltip delay={300}>
                  <Tooltip.Trigger>
                    <Button
                      className={
                        'size-8 min-w-0 p-0 text-semi-muted hover:text-LynxBlue cursor-pointer' +
                        ' border-none bg-transparent hover:bg-foreground/5 rounded-full' +
                        ' flex items-center justify-center'
                      }
                      size="sm"
                      variant="ghost"
                      onPress={() => ipc.send('app:openPath', skill.path)}
                      isIconOnly>
                      <Folder className="size-4" />
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content showArrow>
                    <Tooltip.Arrow />
                    <div className="flex flex-col max-w-80">
                      <span className="text-xs font-bold mb-0.5 text-foreground/90">Skill Location</span>
                      <span className="font-JetBrainsMono text-[10px] text-foreground/70 text-wrap break-all">
                        {skill.path}
                      </span>
                    </div>
                  </Tooltip.Content>
                </Tooltip>
              </div>

              <div
                className={
                  'w-20 shrink-0 flex justify-end gap-1.5 opacity-0' +
                  ' group-hover:opacity-100 transition-opacity duration-150'
                }>
                <Tooltip delay={300}>
                  <Tooltip.Trigger>
                    <Button
                      className={
                        'size-8 min-w-0 p-0 text-semi-muted hover:text-LynxBlue cursor-pointer' +
                        ' border-none bg-transparent hover:bg-foreground/5 rounded-full' +
                        ' flex items-center justify-center'
                      }
                      size="sm"
                      variant="ghost"
                      isDisabled={isUpdating || isDeleting || !!bulkLoadingStatus}
                      onPress={() => handleUpdate(skill.name, skill.scope === 'global', skill.path)}>
                      {isUpdating ? <Spinner size="sm" /> : <Refresh className="size-4" />}
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content showArrow>
                    <Tooltip.Arrow />
                    Update Skill
                  </Tooltip.Content>
                </Tooltip>

                <Tooltip delay={300}>
                  <Tooltip.Trigger>
                    <Button
                      className={
                        'size-8 min-w-0 p-0 text-semi-muted hover:text-danger cursor-pointer' +
                        ' border-none bg-transparent hover:bg-danger/10 rounded-full' +
                        ' flex items-center justify-center'
                      }
                      size="sm"
                      variant="ghost"
                      isDisabled={isUpdating || isDeleting || !!bulkLoadingStatus}
                      onPress={() => handleDelete(skill.name, skill.scope === 'global', skill.path)}>
                      {isDeleting ? <Spinner size="sm" /> : <TrashBin2 className="size-4" />}
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content showArrow>
                    <Tooltip.Arrow />
                    {confirmDelete[skill.name] ? 'Confirm Remove?' : 'Remove Skill'}
                  </Tooltip.Content>
                </Tooltip>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

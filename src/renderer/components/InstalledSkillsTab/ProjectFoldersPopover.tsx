import {Button, Chip, Popover} from '@heroui/react';
import {Folder, TrashBin2} from '@solar-icons/react-perf/BoldDuotone';
import {Settings} from '@solar-icons/react-perf/Linear';

interface ProjectFoldersPopoverProps {
  projectDirs: string[];
  getSkillsCountForDir: (dir: string) => number;
  onRemoveProjectDir: (dir: string) => Promise<void>;
  onAddProjectDir: () => Promise<void>;
}

export function ProjectFoldersPopover({
  projectDirs,
  getSkillsCountForDir,
  onRemoveProjectDir,
  onAddProjectDir,
}: ProjectFoldersPopoverProps) {
  return (
    <Popover>
      <Popover.Trigger>
        <Button size="sm" variant="secondary" aria-label="Manage project folders" isIconOnly>
          <Settings />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-120">
        <Popover.Dialog className="flex flex-col gap-3">
          <Popover.Arrow />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Folder className="size-4 text-LynxBlue" />
              <span className="text-xs font-semibold text-foreground/90">Project Folders</span>
              <Chip
                size="sm"
                variant="secondary"
                className="bg-foreground/10 text-foreground/80 text-[10px] h-5 px-1.5 py-0">
                {projectDirs.length}
              </Chip>
            </div>
          </div>

          <div
            className={
              'flex flex-col gap-1.5 max-h-48 overflow-y-auto' +
              ' bg-surface-secondary border border-foreground/5 rounded-2xl p-2'
            }>
            {projectDirs.length === 0 ? (
              <span className="text-xs text-semi-muted text-center py-4">No project folders registered</span>
            ) : (
              projectDirs.map(dir => {
                const count = getSkillsCountForDir(dir);
                return (
                  <div
                    className={
                      'flex items-center justify-between text-xs' + ' py-1 px-2 hover:bg-foreground/5 rounded-lg group'
                    }
                    key={dir}>
                    <div className="flex items-center gap-2 truncate">
                      <span title={dir} className="font-JetBrainsMono text-[10px] text-foreground/70 truncate">
                        {dir}
                      </span>
                      <Chip
                        size="sm"
                        variant="secondary"
                        className={'bg-foreground/5 text-foreground/50 text-[9px] h-4.5 py-0 px-1 shrink-0 ml-1.5'}>
                        {count} skill{count === 1 ? '' : 's'}
                      </Chip>
                    </div>
                    <Button
                      className={
                        'h-5 min-w-0 p-0 text-semi-muted hover:text-danger' +
                        ' cursor-pointer border-none bg-transparent'
                      }
                      size="sm"
                      variant="ghost"
                      onPress={() => onRemoveProjectDir(dir)}>
                      <TrashBin2 className="size-3.5" />
                    </Button>
                  </div>
                );
              })
            )}
          </div>

          <Button
            className={
              'w-full text-[11px] h-8 bg-LynxBlue/20 text-LynxBlue' + ' border-none hover:bg-LynxBlue/30 shrink-0'
            }
            size="sm"
            variant="secondary"
            onPress={onAddProjectDir}>
            + Add Project Folder
          </Button>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}

import {Button, Checkbox, Description, Modal, ScrollShadow, Typography} from '@heroui/react';
import TabModal from '@lynx/components/TabModal';
import {Download, SettingsMinimalistic} from '@solar-icons/react-perf/BoldDuotone';

import {OfficialOwner, RegistrySkill} from '../../types';
import {formatInstalls} from './SkillCard';

interface CreatorSkillsModalProps {
  selectedOwnerForSkills: OfficialOwner | null;
  onClose: () => void;
  isSkillInstalled: (name: string) => boolean;
  onSelectSkill: (skill: RegistrySkill) => void;
  selectedSkills: RegistrySkill[];
  onToggleSelectSkill: (skill: RegistrySkill) => void;
}

export function CreatorSkillsModal({
  selectedOwnerForSkills,
  onClose,
  isSkillInstalled,
  onSelectSkill,
  selectedSkills,
  onToggleSelectSkill,
}: CreatorSkillsModalProps) {
  return (
    <TabModal size="lg" isOpen={!!selectedOwnerForSkills} onOpenChange={open => !open && onClose()} isDismissable>
      <Modal.CloseTrigger onPress={onClose} />
      <Modal.Header className="pb-3 border-b border-border/50 flex items-center gap-3 font-Nunito">
        <img
          onError={e => {
            (e.target as HTMLImageElement).src = 'https://github.com/github.png';
          }}
          alt={selectedOwnerForSkills?.owner}
          className="size-10 rounded-full border border-border bg-black"
          src={`https://github.com/${selectedOwnerForSkills?.owner}.png`}
        />
        <div>
          <Modal.Heading className="text-lg font-bold">{selectedOwnerForSkills?.owner}</Modal.Heading>
          <Description className="text-xs text-semi-muted font-JetBrainsMono">All Available Skills</Description>
        </div>
      </Modal.Header>

      <Modal.Body className="font-Nunito flex flex-col max-h-[70vh] pr-1 py-4">
        <ScrollShadow className="flex-1 overflow-y-auto flex flex-col gap-4 mt-2">
          {selectedOwnerForSkills?.repos.map(r => (
            <div key={r.repo} className="flex flex-col gap-2">
              <Typography
                className={
                  'text-xs font-semibold text-semi-muted font-JetBrainsMono ' +
                  'bg-foreground/5 px-2 py-1 rounded-md w-fit'
                }>
                {r.repo}
              </Typography>
              <div className="flex flex-col gap-1.5 pl-1">
                {r.skills.map(skill => {
                  const registrySkill: RegistrySkill = {
                    id: `${r.repo}/${skill.name}`,
                    name: skill.name,
                    installs: skill.installs,
                    source: r.repo,
                  };
                  const installed = isSkillInstalled(skill.name);
                  const isSelected = selectedSkills.some(s => s.id === registrySkill.id);
                  return (
                    <div
                      className={
                        'flex items-center gap-3 p-2.5 rounded-xl bg-surface/40 transition' +
                        ' border cursor-pointer ' +
                        (installed
                          ? 'border-success/30 bg-success/5'
                          : 'border-border-secondary/40 hover:border-foreground/10')
                      }
                      key={`${r.repo}-${skill.name}`}
                      onClick={() => onToggleSelectSkill(registrySkill)}>
                      <Checkbox
                        variant="secondary"
                        isSelected={isSelected}
                        aria-label={`Select ${skill.name}`}
                        onChange={() => onToggleSelectSkill(registrySkill)}>
                        <Checkbox.Content>
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                        </Checkbox.Content>
                      </Checkbox>
                      <div className="flex-1 min-w-0 pr-2">
                        <Typography className="text-xs font-bold truncate">{skill.name}</Typography>
                        <Typography className="text-[10px] text-semi-muted truncate font-JetBrainsMono mt-0.5">
                          {formatInstalls(skill.installs)} installs
                        </Typography>
                      </div>
                      <Button
                        onPress={() => {
                          onClose();
                          onSelectSkill(registrySkill);
                        }}
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 min-w-8"
                        onClick={e => e.stopPropagation()}
                        isIconOnly>
                        {installed ? <SettingsMinimalistic className="size-3.5" /> : <Download className="size-3.5" />}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </ScrollShadow>
      </Modal.Body>
    </TabModal>
  );
}

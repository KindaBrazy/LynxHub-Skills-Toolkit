import {Button, Checkbox, Description, InputGroup, Modal, ScrollShadow, Typography} from '@heroui/react';
import TabModal from '@lynx/components/TabModal';
import {Download, SettingsMinimalistic} from '@solar-icons/react-perf/BoldDuotone';
import {Magnifier} from '@solar-icons/react-perf/Linear';
import {ArrowDown} from '@solar-icons/react-perf/LineDuotone';
import {X} from 'lucide-react';
import {useEffect, useState} from 'react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(30);

  useEffect(() => {
    if (selectedOwnerForSkills) {
      setSearchQuery('');
      setLimit(30);
    }
  }, [selectedOwnerForSkills]);

  useEffect(() => {
    setLimit(30);
  }, [searchQuery]);

  const filteredRepos =
    selectedOwnerForSkills?.repos
      .map(r => {
        const filteredSkills = r.skills.filter(
          skill =>
            skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.repo.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        return {
          ...r,
          skills: filteredSkills,
        };
      })
      .filter(r => r.skills.length > 0) || [];

  const totalCount = filteredRepos.reduce((acc, r) => acc + r.skills.length, 0);

  // Take only the first `limit` skills across all filtered repos
  let renderedCount = 0;
  const reposToRender: typeof filteredRepos = [];
  for (const r of filteredRepos) {
    if (renderedCount >= limit) break;
    const skillsToTake = r.skills.slice(0, limit - renderedCount);
    if (skillsToTake.length > 0) {
      reposToRender.push({
        ...r,
        skills: skillsToTake,
      });
      renderedCount += skillsToTake.length;
    }
  }

  const hasMore = totalCount > renderedCount;

  return (
    <TabModal
      size="lg"
      dialogClassName="max-w-4xl! px-1"
      isOpen={!!selectedOwnerForSkills}
      onOpenChange={open => !open && onClose()}
      isDismissable>
      <Modal.CloseTrigger onPress={onClose} />
      <Modal.Header className="pb-3 font-Nunito w-full pr-10 pl-4">
        <div className="flex flex-row items-center justify-between text-left gap-4 w-full">
          <div className="flex flex-row items-center justify-start gap-3.5 min-w-0">
            <img
              onError={e => {
                (e.target as HTMLImageElement).src = 'https://github.com/github.png';
              }}
              alt={selectedOwnerForSkills?.owner}
              src={`https://github.com/${selectedOwnerForSkills?.owner}.png`}
              className="size-11 rounded-full border border-border/80 bg-black shrink-0"
            />
            <div className="flex flex-col justify-center text-left min-w-0">
              <Modal.Heading className="text-lg font-bold text-foreground leading-tight">
                {selectedOwnerForSkills?.owner}
              </Modal.Heading>
              <Description className="text-xs text-semi-muted font-JetBrainsMono mt-0.5">
                All Available Skills
              </Description>
            </div>
          </div>

          {/* Search bar inside header */}
          <div className="w-90 shrink-0 mr-4">
            <InputGroup variant="secondary" fullWidth>
              <InputGroup.Prefix>
                <Magnifier className="size-4 text-semi-muted" />
              </InputGroup.Prefix>
              <InputGroup.Input
                value={searchQuery}
                placeholder="Search creator skills..."
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <InputGroup.Suffix>
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label="Clear search"
                    onPress={() => setSearchQuery('')}
                    className="h-5 w-5 min-w-5 p-0 hover:bg-white/10 rounded-full flex items-center justify-center"
                    isIconOnly>
                    <X className="size-3 text-semi-muted" />
                  </Button>
                </InputGroup.Suffix>
              )}
            </InputGroup>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="font-Nunito flex flex-col max-h-[70vh] pr-1">
        <ScrollShadow className="flex-1 overflow-y-auto flex flex-col gap-5 px-4 mt-2">
          {filteredRepos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-semi-muted text-center gap-1.5">
              <Typography className="text-sm font-semibold">No skills found matching "{searchQuery}"</Typography>
              <Description className="text-xs">Try searching for a different keyword or name</Description>
            </div>
          ) : (
            <>
              {reposToRender.map(r => (
                <div key={r.repo} className="flex flex-col gap-3">
                  <Typography
                    className={
                      'text-xs font-semibold text-semi-muted font-JetBrainsMono ' +
                      'bg-foreground/5 px-2.5 py-1 rounded-lg w-fit border border-border-secondary/20'
                    }>
                    {r.repo}
                  </Typography>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pl-1">
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
                            'flex items-center gap-2 px-2.5 py-2 rounded-xl' +
                            ' bg-surface/30 transition-all duration-200 border cursor-pointer' +
                            ' hover:shadow-sm active:scale-[0.99] ' +
                            (installed
                              ? 'border-success/30 bg-success/5 hover:bg-success/10'
                              : 'border-border-secondary/40 hover:border-foreground/10 hover:bg-foreground/5')
                          }
                          key={`${r.repo}-${skill.name}`}
                          onClick={() => onToggleSelectSkill(registrySkill)}>
                          <Checkbox
                            variant="secondary"
                            isSelected={isSelected}
                            className="scale-90 origin-left"
                            aria-label={`Select ${skill.name}`}
                            onChange={() => onToggleSelectSkill(registrySkill)}>
                            <Checkbox.Content>
                              <Checkbox.Control>
                                <Checkbox.Indicator />
                              </Checkbox.Control>
                            </Checkbox.Content>
                          </Checkbox>
                          <div className="flex-1 min-w-0 pr-1 flex flex-col gap-y-1">
                            <span className="text-xs font-semibold truncate text-foreground">{skill.name}</span>
                            <span
                              className={
                                'text-[10px] text-semi-muted truncate font-JetBrainsMono flex items-center gap-x-1'
                              }>
                              {formatInstalls(skill.installs)} <ArrowDown />
                            </span>
                          </div>
                          <Button
                            onPress={() => {
                              onClose();
                              onSelectSkill(registrySkill);
                            }}
                            className={
                              'size-7 min-w-7 hover:bg-foreground/10 rounded-lg' +
                              ' flex items-center justify-center shrink-0'
                            }
                            size="sm"
                            variant="ghost"
                            onClick={e => e.stopPropagation()}
                            isIconOnly>
                            {installed ? (
                              <SettingsMinimalistic className="size-3.5 text-semi-muted" />
                            ) : (
                              <Download className="size-3.5 text-foreground" />
                            )}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {hasMore && (
                <div className="flex justify-center mt-4 pb-6">
                  <Button
                    className={
                      'px-8 py-2 font-bold text-xs bg-foreground/5 hover:bg-foreground/10' +
                      ' border border-border-secondary/30 rounded-xl hover:border-LynxBlue/30' +
                      ' text-foreground transition-all duration-200'
                    }
                    variant="secondary"
                    onPress={() => setLimit(prev => prev + 30)}>
                    Load More Skills (Showing {renderedCount} of {totalCount})
                  </Button>
                </div>
              )}
            </>
          )}
        </ScrollShadow>
      </Modal.Body>
    </TabModal>
  );
}

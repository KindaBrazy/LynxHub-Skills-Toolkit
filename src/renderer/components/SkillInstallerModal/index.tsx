import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  Description,
  EmptyState,
  Label,
  ListBox,
  ModalCloseTrigger,
  SearchField,
  Select,
  Separator,
  Spinner,
  Tabs,
  Tag,
  TagGroup,
  Typography,
  useFilter,
} from '@heroui/react';
import TabModal from '@lynx/components/TabModal';
import {CheckCircle, CloudStorage, InfoCircle} from '@solar-icons/react-perf/BoldDuotone';
import {useCallback, useEffect, useState} from 'react';

import {AuditReport, RegistrySkill} from '../../types';
import {SecurityAudits} from './SecurityAudits';

const ipc = (window as any).electron.ipcRenderer;

interface SkillInstallerModalProps {
  selectedSkills: RegistrySkill[];
  onClose: () => void;
  onInstallSuccess: () => Promise<void>;
}

export default function SkillInstallerModal({selectedSkills, onClose, onInstallSuccess}: SkillInstallerModalProps) {
  const {contains} = useFilter({sensitivity: 'base'});

  const [installScope, setInstallScope] = useState<'project' | 'global'>('project');
  const [installMethod, setInstallMethod] = useState<'symlink' | 'copy'>('symlink');
  const [supportedAgents, setSupportedAgents] = useState<{name: string; displayName: string}[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>(['antigravity']);
  const [allAgents, setAllAgents] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgressMessage, setInstallProgressMessage] = useState<string>('');
  const [installResult, setInstallResult] = useState<{success: boolean; message: string} | null>(null);

  // Projects list state
  const [projectDirs, setProjectDirs] = useState<string[]>([]);
  const [selectedProjectCwd, setSelectedProjectCwd] = useState<string>('');

  const onRemoveTags = useCallback((keys: Set<any>) => {
    setSelectedAgents(prev => prev.filter(key => !keys.has(key)));
  }, []);

  // Security Audits state
  const [auditReports, setAuditReports] = useState<AuditReport[]>([]);
  const [isLoadingAudit, setIsLoadingAudit] = useState(false);

  const loadProjects = useCallback(async () => {
    try {
      const dirs = await ipc.invoke('skills-manager:get-project-dirs');
      setProjectDirs(dirs || []);
      if (dirs && dirs.length > 0) {
        setSelectedProjectCwd(prev => (dirs.includes(prev) ? prev : dirs[0]));
      } else {
        setSelectedProjectCwd('');
      }
    } catch (err) {
      console.error('Failed to load project dirs:', err);
    }
  }, []);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const list = await ipc.invoke('skills-manager:get-agents');
        setSupportedAgents(list);
      } catch (err) {
        console.error('Failed to load agents list:', err);
      }
    };
    loadAgents();
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    if (selectedSkills.length > 0) {
      setInstallScope('project');
      setInstallMethod('symlink');
      setSelectedAgents(['antigravity']);
      setAllAgents(false);
      setIsInstalling(false);
      setInstallProgressMessage('');
      setInstallResult(null);
      setAuditReports([]);

      const loadAudits = async () => {
        setIsLoadingAudit(true);
        try {
          const allAudits: AuditReport[] = [];
          await Promise.all(
            selectedSkills.map(async skill => {
              const source = skill.source || skill.id?.split('/').slice(0, 2).join('/');
              const skillName = skill.name;
              if (source && skillName) {
                const res = await ipc.invoke('skills-manager:get-audit', source, skillName);
                if (res) {
                  allAudits.push(res);
                }
              }
            }),
          );
          setAuditReports(allAudits);
        } catch (err) {
          console.error('Failed to fetch security audits:', err);
        } finally {
          setIsLoadingAudit(false);
        }
      };
      loadAudits();
      loadProjects();
    }
  }, [selectedSkills, loadProjects]);

  const handleProjectSelectChange = useCallback(async (key: string) => {
    if (key === 'add-new') {
      try {
        const dir = await ipc.invoke('skills-manager:select-project-dir');
        if (dir) {
          const updated = await ipc.invoke('skills-manager:add-project-dir', dir);
          setProjectDirs(updated || []);
          setSelectedProjectCwd(dir);
        }
      } catch (err) {
        console.error('Failed to select directory:', err);
      }
    } else {
      setSelectedProjectCwd(key);
    }
  }, []);

  const handleStartInstall = useCallback(async () => {
    if (selectedSkills.length === 0) return;
    setIsInstalling(true);
    setInstallResult(null);

    const agent = allAgents ? '*' : selectedAgents.join(' ');
    const isGlobal = installScope === 'global';
    const isCopy = installMethod === 'copy';
    const targetCwd = isGlobal ? undefined : selectedProjectCwd;

    let successCount = 0;
    let failCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < selectedSkills.length; i++) {
      const skill = selectedSkills[i];
      setInstallProgressMessage(`Installing skill ${i + 1} of ${selectedSkills.length}: "${skill.name}"...`);

      const source = skill.source
        ? skill.source.includes('/')
          ? `${skill.source}@${skill.name}`
          : `${skill.source}/${skill.name}`
        : skill.id || skill.name;

      try {
        const res = await ipc.invoke('skills-manager:add', source, isGlobal, agent, isCopy, targetCwd);
        if (res.success) {
          successCount++;
        } else {
          failCount++;
          errors.push(`"${skill.name}": ${res.error || 'Failed to install'}`);
        }
      } catch (err: any) {
        failCount++;
        errors.push(`"${skill.name}": ${err.message || String(err)}`);
      }
    }

    if (failCount === 0) {
      setInstallResult({
        success: true,
        message:
          selectedSkills.length > 1
            ? `Successfully installed all ${successCount} skills!`
            : `Successfully installed ${selectedSkills[0].name}!`,
      });
      await onInstallSuccess();
    } else if (successCount === 0) {
      setInstallResult({
        success: false,
        message: `Failed to install skills:\n${errors.join('\n')}`,
      });
    } else {
      setInstallResult({
        success: false,
        message: `Installed ${successCount} skill(s), ${failCount} failed:\n${errors.join('\n')}`,
      });
      await onInstallSuccess();
    }

    setIsInstalling(false);
  }, [selectedSkills, installScope, installMethod, selectedAgents, allAgents, onInstallSuccess, selectedProjectCwd]);

  return (
    <TabModal
      size="lg"
      dialogClassName="max-w-3xl"
      isOpen={selectedSkills.length > 0}
      onOpenChange={open => !open && onClose()}>
      <ModalCloseTrigger onPress={onClose} />
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <CloudStorage className="size-6 text-LynxPurple" />
          <Typography className="text-lg font-bold">
            {selectedSkills.length > 1
              ? `Install ${selectedSkills.length} Skills`
              : `Install ${selectedSkills[0]?.name}`}
          </Typography>
        </div>
        <Description className="text-xs text-semi-muted">
          {selectedSkills.length > 1
            ? `Configure target agents and scope for the ${selectedSkills.length} selected skills.`
            : 'Configure target agents and scope for this skill.'}
        </Description>

        {selectedSkills.length > 1 && (
          <div
            className={
              'flex flex-wrap gap-1.5 p-2 bg-surface-secondary' + ' rounded-2xl' + ' max-h-24 overflow-y-auto'
            }>
            {selectedSkills.map(s => (
              <Chip size="sm" key={s.id} variant="secondary" className="bg-surface px-1.5">
                {s.name}
              </Chip>
            ))}
          </div>
        )}

        <Separator className="opacity-10" />

        {/* Scope config */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-semi-muted">Installation Scope</Label>
          <Tabs
            className="w-full"
            selectedKey={installScope}
            aria-label="Installation Scope"
            onSelectionChange={key => setInstallScope(key as any)}>
            <Tabs.ListContainer>
              <Tabs.List>
                <Tabs.Tab id="project">Project-scoped</Tabs.Tab>
                <Tabs.Tab id="global">Global (User-level)</Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
        </div>

        {/* Project Destination Dropdown */}
        {installScope === 'project' && (
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-semi-muted">Project Destination</Label>
            <Select
              variant="secondary"
              isDisabled={isInstalling}
              value={selectedProjectCwd}
              placeholder="Select project destination"
              onChange={val => handleProjectSelectChange(val as string)}
              fullWidth>
              <Select.Trigger>
                <Select.Value>{selectedProjectCwd || 'Select a project folder...'}</Select.Value>
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {projectDirs.map(dir => (
                    <ListBox.Item id={dir} key={dir} textValue={dir} className="font-JetBrainsMono text-xs">
                      {dir}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                  {projectDirs.length > 0 && <Separator className="my-1 opacity-10" />}
                  <ListBox.Item
                    id="add-new"
                    className="text-LynxBlue font-medium"
                    textValue="+ Register new project directory...">
                    + Register new project directory...
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        )}

        {/* Install Method */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-semi-muted">Installation Method</Label>
          <Tabs
            className="w-full"
            selectedKey={installMethod}
            aria-label="Installation Method"
            onSelectionChange={key => setInstallMethod(key as any)}>
            <Tabs.ListContainer>
              <Tabs.List>
                <Tabs.Tab id="symlink">Symlink (Recommended)</Tabs.Tab>
                <Tabs.Tab id="copy">Copy Files</Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
        </div>

        {/* Target Agents */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-semi-muted">Target AI Agents</Label>
            <Checkbox variant="secondary" isSelected={allAgents} onChange={setAllAgents}>
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <span className="text-[10px] text-semi-muted">All Agents</span>
              </Checkbox.Content>
            </Checkbox>
          </div>

          {!allAgents && (
            <Autocomplete
              variant="secondary"
              value={selectedAgents}
              selectionMode="multiple"
              placeholder="Select target agents"
              onChange={(keys: any) => setSelectedAgents(keys as string[])}
              fullWidth>
              <Autocomplete.Trigger>
                <Autocomplete.Value>
                  {({defaultChildren, isPlaceholder, state}: any) => {
                    if (isPlaceholder || state.selectedItems.length === 0) {
                      return defaultChildren;
                    }

                    const selectedItemsKeys = state.selectedItems.map((item: any) => item.key);

                    return (
                      <TagGroup size="sm" onRemove={onRemoveTags}>
                        <TagGroup.List>
                          {selectedItemsKeys.map((selectedItemKey: any) => {
                            const agent = supportedAgents.find(s => s.name === selectedItemKey);
                            if (!agent) return null;
                            return (
                              <Tag id={agent.name} key={agent.name}>
                                {agent.displayName}
                              </Tag>
                            );
                          })}
                        </TagGroup.List>
                      </TagGroup>
                    );
                  }}
                </Autocomplete.Value>
                <Autocomplete.Indicator />
              </Autocomplete.Trigger>
              <Autocomplete.Popover>
                <Autocomplete.Filter filter={contains}>
                  <SearchField name="search" variant="secondary">
                    <SearchField.Group>
                      <SearchField.SearchIcon />
                      <SearchField.Input placeholder="Search agents..." />
                      <SearchField.ClearButton />
                    </SearchField.Group>
                  </SearchField>
                  <ListBox renderEmptyState={() => <EmptyState>No agents found</EmptyState>}>
                    {supportedAgents.map(agent => (
                      <ListBox.Item id={agent.name} key={agent.name} textValue={agent.displayName}>
                        {agent.displayName}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Autocomplete.Filter>
              </Autocomplete.Popover>
            </Autocomplete>
          )}
        </div>

        {/* Security Audits component */}
        <SecurityAudits auditReports={auditReports} isLoadingAudit={isLoadingAudit} />

        <Separator className="opacity-10" />

        {/* Installation Result / Logger */}
        {isInstalling && (
          <div className="flex items-center gap-2 py-2">
            <Spinner size="sm" />
            <span className="text-xs text-semi-muted">
              {selectedSkills.length > 1 ? installProgressMessage : 'Installing skill package via CLI...'}
            </span>
          </div>
        )}

        {installResult && (
          <div
            className={`flex items-start gap-2 p-3 rounded-xl text-xs ${
              installResult.success ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
            }`}>
            {installResult.success ? (
              <CheckCircle className="size-4 shrink-0 mt-0.5 text-success" />
            ) : (
              <InfoCircle className="size-4 shrink-0 mt-0.5 text-danger" />
            )}
            <span className="break-all">{installResult.message}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end">
          <Button
            isDisabled={
              isInstalling ||
              (!allAgents && selectedAgents.length === 0) ||
              (installScope === 'project' && !selectedProjectCwd)
            }
            size="sm"
            onPress={handleStartInstall}
            className="bg-LynxPurple text-white px-5">
            {selectedSkills.length > 1 ? `Install ${selectedSkills.length} Skills` : 'Install Skill'}
          </Button>
        </div>
      </div>
    </TabModal>
  );
}

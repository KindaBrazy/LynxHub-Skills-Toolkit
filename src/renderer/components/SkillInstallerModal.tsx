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
  Separator,
  Spinner,
  Tabs,
  Tag,
  TagGroup,
  Typography,
  useFilter,
} from '@heroui/react';
import TabModal from '@lynx/components/TabModal';
import {CheckCircle, CloudStorage, InfoCircle, ShieldCheck} from '@solar-icons/react-perf/BoldDuotone';
import {useCallback, useEffect, useState} from 'react';

import {AuditReport, RegistrySkill} from '../types';

const ipc = (window as any).electron.ipcRenderer;

interface SkillInstallerModalProps {
  selectedSkill: RegistrySkill | null;
  onClose: () => void;
  onInstallSuccess: () => Promise<void>;
}

export default function SkillInstallerModal({selectedSkill, onClose, onInstallSuccess}: SkillInstallerModalProps) {
  const {contains} = useFilter({sensitivity: 'base'});

  const [installScope, setInstallScope] = useState<'project' | 'global'>('project');
  const [installMethod, setInstallMethod] = useState<'symlink' | 'copy'>('symlink');
  const [supportedAgents, setSupportedAgents] = useState<{name: string; displayName: string}[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>(['antigravity']);
  const [allAgents, setAllAgents] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installResult, setInstallResult] = useState<{success: boolean; message: string} | null>(null);

  const onRemoveTags = useCallback((keys: Set<any>) => {
    setSelectedAgents(prev => prev.filter(key => !keys.has(key)));
  }, []);

  // Security Audits state
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null);
  const [isLoadingAudit, setIsLoadingAudit] = useState(false);

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
  }, []);

  useEffect(() => {
    if (selectedSkill) {
      setInstallScope('project');
      setInstallMethod('symlink');
      setSelectedAgents(['antigravity']);
      setAllAgents(false);
      setIsInstalling(false);
      setInstallResult(null);
      setAuditReport(null);

      const loadAudit = async () => {
        setIsLoadingAudit(true);
        try {
          const source = selectedSkill.source || selectedSkill.id?.split('/').slice(0, 2).join('/');
          const skillName = selectedSkill.name;
          if (source && skillName) {
            const res = await ipc.invoke('skills-manager:get-audit', source, skillName);
            setAuditReport(res);
          }
        } catch (err) {
          console.error('Failed to fetch security audits:', err);
        } finally {
          setIsLoadingAudit(false);
        }
      };

      loadAudit();
    }
  }, [selectedSkill]);

  const handleStartInstall = useCallback(async () => {
    if (!selectedSkill) return;
    setIsInstalling(true);
    setInstallResult(null);

    const source = selectedSkill.source
      ? selectedSkill.source.includes('/')
        ? `${selectedSkill.source}@${selectedSkill.name}`
        : `${selectedSkill.source}/${selectedSkill.name}`
      : selectedSkill.id || selectedSkill.name;

    const agent = allAgents ? '*' : selectedAgents.join(' ');
    const isGlobal = installScope === 'global';
    const isCopy = installMethod === 'copy';

    try {
      const res = await ipc.invoke('skills-manager:add', source, isGlobal, agent, isCopy);
      if (res.success) {
        setInstallResult({
          success: true,
          message: `Successfully installed ${selectedSkill.name}!`,
        });
        await onInstallSuccess();
      } else {
        setInstallResult({
          success: false,
          message: res.error || 'Failed to install skill.',
        });
      }
    } catch (err: any) {
      setInstallResult({
        success: false,
        message: err.message || String(err),
      });
    } finally {
      setIsInstalling(false);
    }
  }, [selectedSkill, installScope, installMethod, selectedAgents, allAgents, onInstallSuccess]);

  return (
    <TabModal size="lg" isOpen={!!selectedSkill} dialogClassName="max-w-3xl" onOpenChange={open => !open && onClose()}>
      <ModalCloseTrigger onPress={onClose} />
      <div className="flex flex-col gap-4 font-Nunito">
        <div className="flex items-center gap-2">
          <CloudStorage className="size-6 text-LynxPurple" />
          <Typography className="text-lg font-bold">Install {selectedSkill?.name}</Typography>
        </div>
        <Description className="text-xs text-semi-muted">Configure target agents and scope for this skill.</Description>

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

        {/* Security Audits */}
        <div className="flex flex-col gap-1.5 mt-2 bg-black/10 border border-border-secondary/40 p-3 rounded-xl">
          <Label className="text-xs font-semibold text-semi-muted flex items-center gap-1">
            <ShieldCheck className="size-4 text-LynxPurple" />
            Security & Safety Audits
          </Label>

          {isLoadingAudit ? (
            <div className="flex items-center gap-2 py-1">
              <Spinner size="sm" />
              <span className="text-xs text-semi-muted">Querying security reports...</span>
            </div>
          ) : auditReport && auditReport.audits && auditReport.audits.length > 0 ? (
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {auditReport.audits.map(audit => {
                  const isFail = audit.status === 'fail';
                  const isWarn = audit.status === 'warn';

                  let badgeColor = 'bg-success-soft text-success';
                  if (isWarn) badgeColor = 'bg-warning-soft text-warning';
                  if (isFail) badgeColor = 'bg-danger-soft text-danger';

                  return (
                    <div
                      className={
                        'flex flex-col justify-between p-2 rounded-lg bg-black/20' +
                        ' border border-border-secondary/30'
                      }
                      key={audit.provider}
                      title={`${audit.provider}: ${audit.summary}`}>
                      <span className="text-[10px] font-bold text-semi-muted truncate">{audit.provider}</span>
                      <div className="flex items-center justify-between gap-1.5 mt-1">
                        <Chip className={`${badgeColor} text-[9px] h-4.5 px-1 shrink-0`}>
                          {audit.status.toUpperCase()}
                        </Chip>
                        {audit.riskLevel && (
                          <span className="text-[8px] text-semi-muted font-JetBrainsMono truncate">
                            {audit.riskLevel}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <Typography className="text-[10px] text-semi-muted mt-1 leading-normal">
                Verdicts provided by Gen Agent Trust Hub, Socket, Snyk, Runlayer, ZeroLeaks.
              </Typography>
            </div>
          ) : (
            <Typography className="text-[11px] text-semi-muted italic mt-1">
              No security audit report found for this skill yet. Review before running.
            </Typography>
          )}
        </div>

        <Separator className="opacity-10" />

        {/* Installation Result / Logger */}
        {isInstalling && (
          <div className="flex items-center gap-2 py-2">
            <Spinner size="sm" />
            <span className="text-xs text-semi-muted">Installing skill package via CLI...</span>
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
            size="sm"
            onPress={handleStartInstall}
            className="bg-LynxPurple text-white px-5"
            isDisabled={isInstalling || (!allAgents && selectedAgents.length === 0)}>
            Install Skill
          </Button>
        </div>
      </div>
    </TabModal>
  );
}

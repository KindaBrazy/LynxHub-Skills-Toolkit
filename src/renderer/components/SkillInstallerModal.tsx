import {
  Button,
  Checkbox,
  CheckboxGroup,
  Description,
  Label,
  Modal,
  Separator,
  Spinner,
  Tabs,
  Typography,
} from '@heroui/react';
import {CheckCircle, CloudStorage, InfoCircle} from '@solar-icons/react-perf/BoldDuotone';
import {useCallback, useEffect, useState} from 'react';

import {RegistrySkill} from '../types';

const ipc = (window as any).electron.ipcRenderer;

const SUPPORTED_AGENTS = [
  'Antigravity',
  'Claude Code',
  'Cursor',
  'GitHub Copilot',
  'Cline',
  'Codex',
  'OpenCode',
  'Gemini CLI',
  'Windsurf',
  'Trae',
];

interface SkillInstallerModalProps {
  selectedSkill: RegistrySkill | null;
  onClose: () => void;
  onInstallSuccess: () => Promise<void>;
}

export default function SkillInstallerModal({selectedSkill, onClose, onInstallSuccess}: SkillInstallerModalProps) {
  const [installScope, setInstallScope] = useState<'project' | 'global'>('project');
  const [installMethod, setInstallMethod] = useState<'symlink' | 'copy'>('symlink');
  const [selectedAgents, setSelectedAgents] = useState<string[]>(['Antigravity']);
  const [allAgents, setAllAgents] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installResult, setInstallResult] = useState<{success: boolean; message: string} | null>(null);

  useEffect(() => {
    if (selectedSkill) {
      setInstallScope('project');
      setInstallMethod('symlink');
      setSelectedAgents(['Antigravity']);
      setAllAgents(false);
      setIsInstalling(false);
      setInstallResult(null);
    }
  }, [selectedSkill]);

  const handleStartInstall = useCallback(async () => {
    if (!selectedSkill) return;
    setIsInstalling(true);
    setInstallResult(null);

    const source = selectedSkill.source
      ? `${selectedSkill.source}/${selectedSkill.name}`
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
    <Modal isOpen={!!selectedSkill} onOpenChange={open => !open && onClose()}>
      <Modal.Backdrop>
        <Modal.Container size="md">
          <Modal.Dialog>
            <div className="flex flex-col gap-4 font-Nunito">
              <div className="flex items-center gap-2">
                <CloudStorage className="size-6 text-LynxPurple" />
                <Typography className="text-lg font-bold">Install {selectedSkill?.name}</Typography>
              </div>
              <Description className="text-xs text-semi-muted">
                Configure target agents and scope for this skill.
              </Description>

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
                    <Tabs.List className="w-full bg-white/5 p-1 rounded-lg">
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
                    <Tabs.List className="w-full bg-white/5 p-1 rounded-lg">
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
                  <Checkbox isSelected={allAgents} onChange={setAllAgents}>
                    <span className="text-[10px] text-semi-muted">All Agents</span>
                  </Checkbox>
                </div>

                {!allAgents && (
                  <CheckboxGroup
                    value={selectedAgents}
                    onChange={setSelectedAgents}
                    aria-label="Target AI Agents"
                    className="grid grid-cols-2 gap-2 mt-1">
                    {SUPPORTED_AGENTS.map(agent => (
                      <Checkbox key={agent} value={agent}>
                        <span className="text-xs">{agent}</span>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
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
                  className={`flex items-start gap-2 p-3 rounded-lg text-xs ${
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
              <div className="flex gap-2 justify-end mt-2">
                <Button size="sm" variant="ghost" onPress={onClose} isDisabled={isInstalling}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onPress={handleStartInstall}
                  className="bg-LynxPurple text-white px-5"
                  isDisabled={isInstalling || (!allAgents && selectedAgents.length === 0)}>
                  Install Skill
                </Button>
              </div>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

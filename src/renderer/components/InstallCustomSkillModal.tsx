import {Button, Description, InputGroup, Modal, Typography} from '@heroui/react';
import TabModal from '@lynx/components/TabModal';
import {CloudStorage, Folder} from '@solar-icons/react-perf/BoldDuotone';
import {useState} from 'react';

import {RegistrySkill} from '../types';

const ipc = (window as any).electron.ipcRenderer;

interface InstallCustomSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: (skill: RegistrySkill) => void;
}

export default function InstallCustomSkillModal({isOpen, onClose, onProceed}: InstallCustomSkillModalProps) {
  const [customSource, setCustomSource] = useState('');

  const handleProceed = () => {
    const trimmed = customSource.trim();
    if (!trimmed) return;

    // Extract name from source (e.g. last path segment)
    const name = trimmed.split(/[/\\]/).filter(Boolean).pop() || trimmed;

    const customSkill: RegistrySkill = {
      id: trimmed,
      name: name,
      installs: 0,
      source: '', // Empty source indicates to installer it is a custom package string
    };

    onProceed(customSkill);
    setCustomSource('');
    onClose();
  };

  const handleSelectFolder = async () => {
    try {
      const dir = await ipc.invoke('skills-manager:select-project-dir');
      if (dir) {
        setCustomSource(dir);
      }
    } catch (err) {
      console.error('Failed to select local directory:', err);
    }
  };

  return (
    <TabModal size="lg" isOpen={isOpen} dialogClassName="max-w-2xl pb-3 px-1" onOpenChange={open => !open && onClose()}>
      <Modal.CloseTrigger onPress={onClose} />
      <Modal.Header className="flex flex-col gap-y-1 px-4">
        <div className="flex items-center gap-2">
          <CloudStorage className="size-6 text-LynxPurple" />
          <Modal.Heading className="text-lg font-bold">Install Custom Skill</Modal.Heading>
        </div>
        <Description className="text-xs text-semi-muted">
          Install a custom agent skill from a Git repository or local folder.
        </Description>
      </Modal.Header>

      <Modal.Body className="flex flex-col gap-4 px-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-semi-muted">Custom Skill Source</label>
          <InputGroup variant="secondary" className="font-JetBrainsMono text-sm" fullWidth>
            <InputGroup.Input
              className="px-3"
              value={customSource}
              onChange={e => setCustomSource(e.target.value)}
              placeholder="e.g., owner/repo or select a local folder path"
            />
            <InputGroup.Suffix className="pr-1.5">
              <Button
                size="sm"
                variant="ghost"
                onPress={handleSelectFolder}
                aria-label="Select local folder"
                className="h-7 w-7 min-w-7 p-0 hover:bg-white/10 rounded-lg flex items-center justify-center"
                isIconOnly>
                <Folder className="size-4 text-semi-muted hover:text-white" />
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
        </div>

        <div className="flex flex-col gap-2 p-3 bg-surface-secondary border border-border rounded-2xl text-xs">
          <Typography className="font-semibold text-foreground/90">Supported Source Formats</Typography>

          <div className="grid grid-cols-1 gap-2.5 mt-1 text-semi-muted leading-relaxed">
            <div>
              <span className="font-bold text-foreground/80 font-JetBrainsMono">GitHub Shorthand: </span>
              <code className="text-accent bg-foreground/5 px-1 rounded font-JetBrainsMono">owner/repo</code>
              <p className="text-[10px] pl-2 mt-0.5">e.g., vercel-labs/agent-skills</p>
            </div>
            <div>
              <span className="font-bold text-foreground/80 font-JetBrainsMono">Full Repo URL: </span>
              <code className="text-accent bg-foreground/5 px-1 rounded font-JetBrainsMono">
                https://github.com/owner/repo
              </code>
              <p className="text-[10px] pl-2 mt-0.5">e.g., https://github.com/vercel-labs/agent-skills</p>
            </div>
            <div>
              <span className="font-bold text-foreground/80 font-JetBrainsMono">Direct Path in Repo: </span>
              <code className="text-accent bg-foreground/5 px-1 rounded font-JetBrainsMono">
                https://github.com/owner/repo/tree/main/skills/name
              </code>
              <p className="text-[10px] pl-2 mt-0.5">
                e.g., https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines
              </p>
            </div>
            <div>
              <span className="font-bold text-foreground/80 font-JetBrainsMono">GitLab or Any Git URL: </span>
              <code className="text-accent bg-foreground/5 px-1 rounded font-JetBrainsMono">
                https://gitlab.com/org/repo
              </code>
              <p className="text-[10px] pl-2 mt-0.5">e.g., git@github.com:vercel-labs/agent-skills.git</p>
            </div>
            <div>
              <span className="font-bold text-foreground/80 font-JetBrainsMono">Local Folder Path: </span>
              <code className="text-accent bg-foreground/5 px-1 rounded font-JetBrainsMono">
                Select folder via browse button or type path
              </code>
              <p className="text-[10px] pl-2 mt-0.5">Loads skills from a local directory path</p>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="pt-3">
        <Button size="sm" className="px-5" onPress={onClose} variant="secondary">
          Cancel
        </Button>
        <Button
          size="sm"
          onPress={handleProceed}
          isDisabled={!customSource.trim()}
          className="bg-LynxPurple text-white px-5">
          Proceed to Settings
        </Button>
      </Modal.Footer>
    </TabModal>
  );
}

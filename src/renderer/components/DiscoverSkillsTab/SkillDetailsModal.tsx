import {Button, Chip, Modal, Separator, Spinner, Typography} from '@heroui/react';
import TabModal from '@lynx/components/TabModal';
import {CloudStorage, Download, SettingsMinimalistic} from '@solar-icons/react-perf/BoldDuotone';
import {ExternalLink} from 'lucide-react';
import {useEffect, useState} from 'react';

import {AuditReport, RegistrySkill} from '../../types';
import {SecurityAudits} from '../SkillInstallerModal/SecurityAudits';
import {formatInstalls, getGithubUrl} from './SkillCard';

const ipc = (window as any).electron.ipcRenderer;

interface SkillDetailsModalProps {
  skill: RegistrySkill | null;
  onClose: () => void;
  isSkillInstalled: (name: string) => boolean;
  onInstall: (skill: RegistrySkill) => void;
}

export function SkillDetailsModal({skill, onClose, isSkillInstalled, onInstall}: SkillDetailsModalProps) {
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null);
  const [isLoadingAudit, setIsLoadingAudit] = useState<boolean>(false);

  useEffect(() => {
    if (!skill) {
      setDescription('');
      setAuditReport(null);
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      setIsLoadingAudit(true);

      const source = skill.source || skill.id?.split('/').slice(0, 2).join('/');
      const skillName = skill.name;

      // Start both calls in parallel
      const descPromise = ipc.invoke('skills-manager:get-description', skill.source, skill.name);
      const auditPromise =
        source && skillName ? ipc.invoke('skills-manager:get-audit', source, skillName) : Promise.resolve(null);

      try {
        const [descRes, auditRes] = await Promise.all([descPromise, auditPromise]);
        setDescription(descRes || 'No description found on the registry.');
        setAuditReport(auditRes);
      } catch (err) {
        console.error('Failed to load skill details:', err);
        setDescription('Failed to load skill description from the registry.');
      } finally {
        setIsLoading(false);
        setIsLoadingAudit(false);
      }
    };

    loadData();
  }, [skill]);

  if (!skill) return null;

  const installed = isSkillInstalled(skill.name);
  const githubUrl = getGithubUrl(skill.source);

  return (
    <TabModal
      size="lg"
      isOpen={!!skill}
      dialogClassName="max-w-2xl px-1"
      onOpenChange={open => !open && onClose()}
      isDismissable>
      <Modal.CloseTrigger onPress={onClose} />
      <Modal.Header className="flex flex-col gap-y-1 px-4">
        <div className="flex items-center gap-2">
          <CloudStorage className="size-6 text-LynxPurple" />
          <Modal.Heading className="text-lg font-bold">{skill.name}</Modal.Heading>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          {githubUrl ? (
            <a
              target="_blank"
              href={githubUrl}
              rel="noopener noreferrer"
              title="View source on GitHub"
              className="text-xs text-semi-muted hover:text-LynxBlue transition flex items-center gap-1 min-w-0">
              <span className="truncate">{skill.source}</span>
              <ExternalLink className="size-3 shrink-0" />
            </a>
          ) : (
            <span className="text-xs text-semi-muted truncate">{skill.source}</span>
          )}
          {installed && (
            <>
              <span className="text-border/60 text-xs">•</span>
              <Chip variant="secondary" className="bg-success-soft text-success text-[10px] h-5 shrink-0">
                Installed
              </Chip>
            </>
          )}
        </div>
      </Modal.Header>

      <Modal.Body className="flex flex-col gap-4 px-4 py-2 max-h-[60vh] overflow-y-auto">
        {/* Installs & Stats */}
        <div
          className={'flex items-center gap-4 bg-surface-secondary/40 border border-border/30 px-4 py-3 rounded-2xl'}>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-semi-muted font-JetBrainsMono leading-none">
              Downloads
            </span>
            <span className="text-xl font-bold mt-1 leading-none">{formatInstalls(skill.installs)}</span>
          </div>
        </div>

        {/* Description Section */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-semi-muted">Description</span>
          {isLoading ? (
            <div className="flex items-center gap-2 py-4">
              <Spinner size="sm" />
              <span className="text-xs text-semi-muted">Fetching skill description...</span>
            </div>
          ) : (
            <Typography
              className={
                'text-sm leading-relaxed text-foreground-secondary bg-surface-secondary/20' +
                ' border border-border/40 p-4 rounded-2xl whitespace-pre-line'
              }>
              {description}
            </Typography>
          )}
        </div>

        <Separator className="opacity-10" />

        {/* Security Audits */}
        <div className="flex flex-col gap-1.5">
          <SecurityAudits auditReport={auditReport} isLoadingAudit={isLoadingAudit} />
        </div>
      </Modal.Body>

      <Separator className="opacity-10" />

      <Modal.Footer className="pt-3 px-4 flex justify-between">
        <Button size="sm" onPress={onClose} variant="secondary">
          Close
        </Button>
        <Button
          onPress={() => {
            onClose();
            onInstall(skill);
          }}
          size="sm"
          className="bg-LynxPurple text-white px-5 font-semibold">
          {installed ? <SettingsMinimalistic className="size-4" /> : <Download className="size-4" />}
          {installed ? 'Configure / Re-install' : 'Install Skill'}
        </Button>
      </Modal.Footer>
    </TabModal>
  );
}

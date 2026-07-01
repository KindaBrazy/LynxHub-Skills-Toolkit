import {Button, Card, Checkbox, Chip, Typography} from '@heroui/react';
import {Download, Fire, SettingsMinimalistic} from '@solar-icons/react-perf/BoldDuotone';
import {ExternalLink, TrendingUp} from 'lucide-react';

import {RegistrySkill} from '../../types';

export const getGithubUrl = (source: string) => {
  const parts = source.split('/');
  if (parts.length >= 2) {
    return `https://github.com/${parts[0]}/${parts[1]}`;
  }
  return null;
};

export const formatInstalls = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  }
  const suffixes = ['K', 'M', 'B', 'T'];
  const magnitude = Math.min(Math.floor(Math.log10(num) / 3) - 1, suffixes.length - 1);
  if (magnitude < 0) return num.toString();
  const scaled = num / Math.pow(10, (magnitude + 1) * 3);
  return `${Math.floor(scaled)}${suffixes[magnitude]}`;
};

interface SkillCardProps {
  skill: RegistrySkill;
  rank?: number;
  installed: boolean;
  onSelect: (skill: RegistrySkill) => void;
  activeSubTab: string;
  isSelected: boolean;
  onToggleSelect: (skill: RegistrySkill) => void;
}

export function SkillCard({
  skill,
  rank,
  installed,
  onSelect,
  activeSubTab,
  isSelected,
  onToggleSelect,
}: SkillCardProps) {
  const githubUrl = getGithubUrl(skill.source);

  let Icon = Download;
  let iconClass = 'text-semi-muted/80';
  if (activeSubTab === 'trending') {
    Icon = TrendingUp as any;
    iconClass = 'text-LynxBlue';
  } else if (activeSubTab === 'hot') {
    Icon = Fire;
    iconClass = 'text-LynxOrange';
  }

  return (
    <Card
      className={
        'border border-border hover:border-foreground/10 hover:shadow-lg hover:shadow-black/20' +
        ' transition flex flex-col justify-between h-full'
      }
      variant="secondary">
      <Card.Header className="flex flex-col gap-2 pb-2">
        <div className="flex items-center justify-between w-full min-h-6">
          <Checkbox isSelected={isSelected} aria-label={`Select ${skill.name}`} onChange={() => onToggleSelect(skill)}>
            <Checkbox.Content>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
            </Checkbox.Content>
          </Checkbox>

          <div className="flex items-center gap-1.5 ml-auto">
            {rank !== undefined && (
              <span
                className={
                  'flex items-center justify-center text-[10px] font-extrabold px-1.5 py-0.5 rounded-lg' +
                  ' bg-LynxPurple/10 text-LynxPurple font-JetBrainsMono border border-LynxPurple/20 shrink-0'
                }>
                #{rank}
              </span>
            )}
            {installed && (
              <Chip variant="secondary" className="bg-success-soft text-success text-[10px] h-5 shrink-0">
                Installed
              </Chip>
            )}
          </div>
        </div>

        <div className="min-w-0 w-full mt-1">
          <Typography title={skill.name} className="font-bold text-base text-wrap line-clamp-2 leading-snug">
            {skill.name}
          </Typography>
          <div className="flex items-center gap-1 mt-1">
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
          </div>
        </div>
      </Card.Header>

      <Card.Content className="pb-3 pt-1 mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-semi-muted font-JetBrainsMono">
          <Icon className={`size-3.5 ${iconClass}`} />
          <span>{skill.installs > 0 ? `${formatInstalls(skill.installs)} Downloads` : 'New skill'}</span>
        </div>
      </Card.Content>

      <Card.Footer className="flex justify-end gap-2 border-t border-border-secondary/50 pt-3">
        <Button size="sm" onPress={() => onSelect(skill)} className="w-full justify-center">
          {installed ? <SettingsMinimalistic className="size-4" /> : <Download className="size-4" />}
          {installed ? 'Configure / Re-install' : 'Install'}
        </Button>
      </Card.Footer>
    </Card>
  );
}

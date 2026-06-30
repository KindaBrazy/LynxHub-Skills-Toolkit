import {Button, Card, Chip, Description, InputGroup, ScrollShadow, Spinner, Typography} from '@heroui/react';
import {Download, SettingsMinimalistic} from '@solar-icons/react-perf/BoldDuotone';
import {Magnifier} from '@solar-icons/react-perf/Linear';
import {ExternalLink, X} from 'lucide-react';

import {RegistrySkill} from '../types';

interface DiscoverSkillsTabProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  searchResults: RegistrySkill[];
  isLoadingSearch: boolean;
  hasSearched: boolean;
  onSearch: () => Promise<void>;
  isSkillInstalled: (name: string) => boolean;
  onSelectSkill: (skill: RegistrySkill) => void;
}

const getGithubUrl = (source: string) => {
  const parts = source.split('/');
  if (parts.length >= 2) {
    return `https://github.com/${parts[0]}/${parts[1]}`;
  }
  return null;
};

const formatInstalls = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  }
  const suffixes = ['k', 'm', 'b', 't'];
  const magnitude = Math.min(Math.floor(Math.log10(num) / 3) - 1, suffixes.length - 1);
  if (magnitude < 0) return num.toString();
  const scaled = num / Math.pow(10, (magnitude + 1) * 3);
  return `${Math.floor(scaled)}${suffixes[magnitude]}`;
};

export default function DiscoverSkillsTab({
  searchQuery,
  onSearchQueryChange,
  searchResults,
  isLoadingSearch,
  hasSearched,
  onSearch,
  isSkillInstalled,
  onSelectSkill,
}: DiscoverSkillsTabProps) {
  return (
    <>
      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <InputGroup className="flex-1" variant="secondary">
          <InputGroup.Prefix className="pl-3" aria-hidden="true">
            <Magnifier className="size-4 text-semi-muted" />
          </InputGroup.Prefix>
          <InputGroup.Input
            className="pl-2"
            value={searchQuery}
            aria-label="Search skills registry"
            onKeyDown={e => e.key === 'Enter' && onSearch()}
            onChange={e => onSearchQueryChange(e.target.value)}
            placeholder="Search skills (e.g. typescript, nextjs, convex)..."
          />
          {searchQuery && (
            <InputGroup.Suffix className="pr-2">
              <Button
                size="sm"
                variant="ghost"
                aria-label="Clear search"
                onPress={() => onSearchQueryChange('')}
                className="h-6 w-6 min-w-6 p-0 hover:bg-white/10 rounded-full flex items-center justify-center"
                isIconOnly>
                <X className="size-3.5 text-semi-muted" />
              </Button>
            </InputGroup.Suffix>
          )}
        </InputGroup>
        <Button onPress={onSearch} variant="secondary" isDisabled={!searchQuery.trim()}>
          Search
        </Button>
      </div>

      {isLoadingSearch ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Spinner size="lg" />
          <Description className="text-sm text-semi-muted">Searching registry...</Description>
        </div>
      ) : searchResults.length === 0 ? (
        hasSearched ? (
          <div className="text-center py-12 text-semi-muted">
            No skills found matching "{searchQuery}". Try another keyword.
          </div>
        ) : (
          <div className="text-center py-12 text-semi-muted">
            Type a keyword and press search to discover agent skills.
          </div>
        )
      ) : (
        <ScrollShadow
          className={
            'grid grid-cols-1 gap-4 overflow-y-auto flex-1 min-h-0 pb-4' +
            ' sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }>
          {searchResults.map(skill => {
            const installed = isSkillInstalled(skill.name);
            const githubUrl = getGithubUrl(skill.source);
            return (
              <Card
                key={skill.id}
                variant="secondary"
                className="border border-border hover:border-foreground/10 transition flex flex-col justify-between">
                <Card.Header className="flex justify-between items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <Typography title={skill.name} className="font-bold text-base truncate">
                      {skill.name}
                    </Typography>
                    <div className="flex items-center gap-1 mt-0.5">
                      {githubUrl ? (
                        <a
                          className={
                            'text-xs text-semi-muted hover:text-LynxBlue' +
                            ' transition flex items-center gap-1 min-w-0'
                          }
                          target="_blank"
                          href={githubUrl}
                          rel="noopener noreferrer"
                          title="View source on GitHub">
                          <span className="truncate">{skill.source}</span>
                          <ExternalLink className="size-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-xs text-semi-muted truncate">{skill.source}</span>
                      )}
                    </div>
                  </div>
                  {installed && (
                    <Chip className="bg-success-soft text-success text-[10px] h-5 shrink-0">Installed</Chip>
                  )}
                </Card.Header>
                <Card.Content className="pb-3 pt-1">
                  <Typography className="text-xs text-semi-muted">
                    {skill.installs > 0 ? `${formatInstalls(skill.installs)} downloads` : 'New skill'}
                  </Typography>
                </Card.Content>
                <Card.Footer className="flex justify-end gap-2 border-t border-border-secondary/50 pt-3">
                  <Button size="sm" className="w-full justify-center" onPress={() => onSelectSkill(skill)}>
                    {installed ? <SettingsMinimalistic className="size-4" /> : <Download className="size-4" />}
                    {installed ? 'Configure / Re-install' : 'Install'}
                  </Button>
                </Card.Footer>
              </Card>
            );
          })}
        </ScrollShadow>
      )}
    </>
  );
}

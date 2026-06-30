import {Button, Card, Chip, Description, InputGroup, ScrollShadow, Spinner, Tabs, Typography} from '@heroui/react';
import {Download, Fire, SettingsMinimalistic, Star, VerifiedCheck} from '@solar-icons/react-perf/BoldDuotone';
import {Magnifier} from '@solar-icons/react-perf/Linear';
import {ExternalLink, TrendingUp, X} from 'lucide-react';
import {useCallback, useEffect, useState} from 'react';

import {OfficialOwner, RegistrySkill} from '../types';

const ipc = (window as any).electron.ipcRenderer;

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
  const [activeSubTab, setActiveSubTab] = useState<'all-time' | 'trending' | 'hot' | 'official'>('all-time');
  const [discoverSkills, setDiscoverSkills] = useState<RegistrySkill[]>([]);
  const [officialOwners, setOfficialOwners] = useState<OfficialOwner[]>([]);
  const [isLoadingDiscover, setIsLoadingDiscover] = useState(false);

  const loadDiscoverData = useCallback(async (tab: typeof activeSubTab) => {
    setIsLoadingDiscover(true);
    try {
      const res = await ipc.invoke('skills-manager:get-discover-data', tab);
      if (tab === 'official') {
        setOfficialOwners(res || []);
      } else {
        setDiscoverSkills(res || []);
      }
    } catch (err) {
      console.error('Failed to load discover data:', err);
    } finally {
      setIsLoadingDiscover(false);
    }
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      loadDiscoverData(activeSubTab);
    }
  }, [activeSubTab, searchQuery, loadDiscoverData]);

  const handleTabChange = (key: string) => {
    setActiveSubTab(key as any);
    onSearchQueryChange('');
  };

  const isSearching = searchQuery.trim() !== '' && (hasSearched || isLoadingSearch);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Search Bar */}
      <div className="flex gap-2 mb-6 shrink-0">
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

      {isSearching ? (
        // Search Results View
        <div className="flex-1 flex flex-col min-h-0">
          {isLoadingSearch ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Spinner size="lg" />
              <Description className="text-sm text-semi-muted">Searching registry...</Description>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12 text-semi-muted">
              No skills found matching "{searchQuery}". Try another keyword.
            </div>
          ) : (
            <ScrollShadow
              className={
                'grid grid-cols-1 gap-4 overflow-y-auto flex-1 min-h-0 pb-4' +
                ' sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2'
              }>
              {searchResults.map(skill => {
                const installed = isSkillInstalled(skill.name);
                const githubUrl = getGithubUrl(skill.source);
                return (
                  <Card
                    className={
                      'border border-border hover:border-foreground/10' + ' transition flex flex-col justify-between'
                    }
                    key={skill.id}
                    variant="secondary">
                    <Card.Header className="flex justify-between items-start gap-2 overflow-hidden">
                      <div className="min-w-0 flex-1">
                        <Typography title={skill.name} className="font-bold text-base text-wrap line-clamp-2">
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
                      <Typography className="text-xs text-semi-muted font-JetBrainsMono">
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
        </div>
      ) : (
        // Discovery Views (Sub-tabs)
        <div className="flex-1 flex flex-col min-h-0">
          <Tabs
            selectedKey={activeSubTab}
            aria-label="Discover collections navigation"
            onSelectionChange={key => handleTabChange(String(key))}
            className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <Tabs.ListContainer className="w-fit mb-4 shrink-0">
              <Tabs.List>
                <Tabs.Tab id="all-time" className="flex items-center gap-1.5 text-nowrap">
                  <Star className="size-4" />
                  All Time
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="trending" className="flex items-center gap-1.5  text-nowrap">
                  <TrendingUp className="size-3.5" />
                  Trending
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="hot" className="flex items-center gap-1.5  text-nowrap">
                  <Fire className="size-4" />
                  Hot
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="official" className="flex items-center gap-1.5  text-nowrap">
                  <VerifiedCheck className="size-4" />
                  Official
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>

            {isLoadingDiscover ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Spinner size="lg" />
                <Description className="text-sm text-semi-muted">Loading collection...</Description>
              </div>
            ) : activeSubTab === 'official' ? (
              // Official Creators Grid
              <ScrollShadow className="flex-1 overflow-y-auto pb-4 px-2 min-h-0">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {officialOwners.map(owner => {
                    const totalInstalls = owner.repos.reduce((acc, r) => acc + r.totalInstalls, 0);
                    const totalSkills = owner.repos.reduce((acc, r) => acc + r.skills.length, 0);
                    return (
                      <Card
                        className={
                          'border border-border hover:border-foreground/10' +
                          ' transition p-4 flex flex-col justify-between'
                        }
                        key={owner.owner}
                        variant="secondary">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <img
                              onError={e => {
                                (e.target as HTMLImageElement).src = 'https://github.com/github.png';
                              }}
                              alt={owner.owner}
                              src={`https://github.com/${owner.owner}.png`}
                              className="size-10 rounded-full border border-border bg-black"
                            />
                            <div>
                              <Typography className="font-bold text-base leading-tight">{owner.owner}</Typography>
                              <Description className="text-[11px] text-semi-muted font-JetBrainsMono mt-0.5">
                                {totalSkills} {totalSkills === 1 ? 'skill' : 'skills'} · {formatInstalls(totalInstalls)}
                                installs
                              </Description>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 mt-2">
                            <Typography className="text-xs font-semibold text-semi-muted">Featured Skills:</Typography>
                            <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
                              {owner.repos.flatMap(r =>
                                r.skills.slice(0, 3).map(skill => {
                                  const registrySkill: RegistrySkill = {
                                    id: `${r.repo}/${skill.name}`,
                                    name: skill.name,
                                    installs: skill.installs,
                                    source: r.repo,
                                  };
                                  const installed = isSkillInstalled(skill.name);
                                  return (
                                    <div
                                      className={
                                        'flex items-center justify-between p-2 rounded bg-black/20' +
                                        ' border border-border-secondary/40 hover:border-foreground/10 transition'
                                      }
                                      key={`${r.repo}-${skill.name}`}>
                                      <div className="min-w-0 pr-2">
                                        <Typography className="text-xs font-bold truncate">{skill.name}</Typography>
                                        <Typography className="text-[10px] text-semi-muted truncate font-JetBrainsMono">
                                          {r.repo.split('/')[1]} · {formatInstalls(skill.installs)}
                                        </Typography>
                                      </div>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 min-h-7 px-2"
                                        onPress={() => onSelectSkill(registrySkill)}>
                                        {installed ? (
                                          <SettingsMinimalistic className="size-3.5" />
                                        ) : (
                                          <Download className="size-3.5" />
                                        )}
                                      </Button>
                                    </div>
                                  );
                                }),
                              )}
                              {totalSkills > 3 && (
                                <Typography className="text-[10px] text-semi-muted text-center py-1">
                                  + {totalSkills - 3} more skills
                                </Typography>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </ScrollShadow>
            ) : (
              // Leaderboard Grid (All Time, Trending, Hot)
              <ScrollShadow
                className={
                  'grid grid-cols-1 gap-4 overflow-y-auto flex-1 min-h-0 pb-4' +
                  ' sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2'
                }>
                {discoverSkills.map((skill, index) => {
                  const installed = isSkillInstalled(skill.name);
                  const githubUrl = getGithubUrl(skill.source);
                  return (
                    <Card
                      className={
                        'border border-border hover:border-foreground/10' + ' transition flex flex-col justify-between'
                      }
                      key={skill.id}
                      variant="secondary">
                      <Card.Header className="flex justify-between items-start gap-2 overflow-hidden">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-LynxPurple font-JetBrainsMono">#{index + 1}</span>
                            <Typography title={skill.name} className="font-bold text-base text-wrap line-clamp-2">
                              {skill.name}
                            </Typography>
                          </div>
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
                        <Typography className="text-xs text-semi-muted font-JetBrainsMono">
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
          </Tabs>
        </div>
      )}
    </div>
  );
}

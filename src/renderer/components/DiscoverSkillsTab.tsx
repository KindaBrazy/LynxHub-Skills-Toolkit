import {
  Button,
  Card,
  Chip,
  Description,
  InputGroup,
  Label,
  ListBox,
  Pagination,
  ScrollShadow,
  Select,
  Spinner,
  Tabs,
  Typography,
} from '@heroui/react';
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

interface SkillCardProps {
  skill: RegistrySkill;
  rank?: number;
  installed: boolean;
  onSelect: (skill: RegistrySkill) => void;
  activeSubTab: string;
}

function SkillCard({skill, rank, installed, onSelect, activeSubTab}: SkillCardProps) {
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
      key={skill.id}
      variant="secondary">
      <Card.Header className="flex flex-col gap-2 pb-2">
        {(rank !== undefined || installed) && (
          <div className="flex items-center justify-between w-full min-h-6">
            {rank !== undefined ? (
              <span
                className={
                  'flex items-center justify-center text-[10px] font-extrabold px-1.5 py-0.5 rounded-lg' +
                  ' bg-LynxPurple/10 text-LynxPurple font-JetBrainsMono border border-LynxPurple/20 shrink-0'
                }>
                #{rank}
              </span>
            ) : (
              <div />
            )}
            {installed && (
              <Chip variant="secondary" className="bg-success-soft text-success text-[10px] h-5 shrink-0">
                Installed
              </Chip>
            )}
          </div>
        )}

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
          <span>{skill.installs > 0 ? `${formatInstalls(skill.installs)} downloads` : 'New skill'}</span>
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);

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
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const isSearching = searchQuery.trim() !== '' && (hasSearched || isLoadingSearch);

  const totalItems = isSearching
    ? searchResults.length
    : activeSubTab === 'official'
      ? officialOwners.length
      : discoverSkills.length;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const effectivePage = Math.max(1, Math.min(currentPage, totalPages || 1));

  const startIndex = (effectivePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (effectivePage > 3) {
        pages.push('ellipsis');
      }
      const start = Math.max(2, effectivePage - 1);
      const end = Math.min(totalPages - 1, effectivePage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (effectivePage < totalPages - 2) {
        pages.push('ellipsis');
      }
      pages.push(totalPages);
    }
    return pages;
  };

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
              {searchResults.slice(startIndex, endIndex).map(skill => {
                const installed = isSkillInstalled(skill.name);
                return (
                  <SkillCard
                    skill={skill}
                    key={skill.id}
                    installed={installed}
                    onSelect={onSelectSkill}
                    activeSubTab={activeSubTab}
                  />
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
            <div className="w-full flex justify-between items-center">
              <Tabs.ListContainer>
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
              <div className="flex items-center gap-2">
                <span className="text-xs text-semi-muted font-medium text-nowrap">Items per page:</span>
                <Select
                  onChange={val => {
                    if (val !== null && val !== undefined) {
                      setItemsPerPage(Number(val));
                      setCurrentPage(1);
                    }
                  }}
                  className="w-30"
                  variant="secondary"
                  value={String(itemsPerPage)}
                  placeholder={String(itemsPerPage)}>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="12" textValue="12">
                        <ListBox.ItemIndicator />
                        <Label>12</Label>
                      </ListBox.Item>
                      <ListBox.Item id="24" textValue="24">
                        <ListBox.ItemIndicator />
                        <Label>24</Label>
                      </ListBox.Item>
                      <ListBox.Item id="48" textValue="48">
                        <ListBox.ItemIndicator />
                        <Label>48</Label>
                      </ListBox.Item>
                      <ListBox.Item id="96" textValue="96">
                        <ListBox.ItemIndicator />
                        <Label>96</Label>
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
                <span className="text-xs text-semi-muted font-JetBrainsMono ml-2 text-nowrap">
                  Showing {startIndex + 1}–{Math.min(endIndex, totalItems)} of {totalItems}
                </span>
              </div>
            </div>

            {isLoadingDiscover ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Spinner size="lg" />
                <Description className="text-sm text-semi-muted">Loading collection...</Description>
              </div>
            ) : activeSubTab === 'official' ? (
              // Official Creators Grid
              <ScrollShadow className="flex-1 overflow-y-auto pb-4 px-2 min-h-0">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {officialOwners.slice(startIndex, endIndex).map(owner => {
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
                                        'flex items-center justify-between p-2 rounded bg-black/20 transition border ' +
                                        (installed
                                          ? 'border-success/30 bg-success/5'
                                          : 'border-border-secondary/40 hover:border-foreground/10')
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
                {discoverSkills.slice(startIndex, endIndex).map((skill, index) => {
                  const installed = isSkillInstalled(skill.name);
                  return (
                    <SkillCard
                      skill={skill}
                      key={skill.id}
                      installed={installed}
                      onSelect={onSelectSkill}
                      activeSubTab={activeSubTab}
                      rank={startIndex + index + 1}
                    />
                  );
                })}
              </ScrollShadow>
            )}
          </Tabs>
        </div>
      )}

      {/* Pagination Footer */}
      {totalItems > 12 && (
        <div className="flex items-center pt-4 shrink-0">
          <Pagination className="justify-center">
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous isDisabled={effectivePage === 1} onPress={() => setCurrentPage(effectivePage - 1)}>
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>
              {getPageNumbers().map((p, i) =>
                p === 'ellipsis' ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link isActive={p === effectivePage} onPress={() => setCurrentPage(p)}>
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                ),
              )}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={effectivePage === totalPages}
                  onPress={() => setCurrentPage(effectivePage + 1)}>
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      )}
    </div>
  );
}

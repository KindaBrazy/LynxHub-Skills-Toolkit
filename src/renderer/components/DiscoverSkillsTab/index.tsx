import {
  Button,
  Card,
  Checkbox,
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
import {Fire, Star, VerifiedCheck} from '@solar-icons/react-perf/BoldDuotone';
import {Magnifier} from '@solar-icons/react-perf/Linear';
import {TrendingUp, X} from 'lucide-react';
import {useCallback, useEffect, useState} from 'react';

import {OfficialOwner, RegistrySkill} from '../../types';
import {CreatorSkillsModal} from './CreatorSkillsModal';
import {formatInstalls, SkillCard} from './SkillCard';
import {SkillDetailsModal} from './SkillDetailsModal';

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
  onSelectSkills: (skills: RegistrySkill[]) => void;
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
  onSelectSkills,
}: DiscoverSkillsTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<'all-time' | 'trending' | 'hot' | 'official'>('all-time');
  const [discoverSkills, setDiscoverSkills] = useState<RegistrySkill[]>([]);
  const [officialOwners, setOfficialOwners] = useState<OfficialOwner[]>([]);
  const [isLoadingDiscover, setIsLoadingDiscover] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [selectedOwnerForSkills, setSelectedOwnerForSkills] = useState<OfficialOwner | null>(null);
  const [selectedSkillForDetails, setSelectedSkillForDetails] = useState<RegistrySkill | null>(null);

  const [selectedSkills, setSelectedSkills] = useState<RegistrySkill[]>([]);

  useEffect(() => {
    setSelectedSkills([]);
  }, [activeSubTab, searchQuery]);

  const toggleSelectSkill = useCallback((skill: RegistrySkill) => {
    setSelectedSkills(prev => {
      const exists = prev.some(s => s.id === skill.id);
      if (exists) {
        return prev.filter(s => s.id !== skill.id);
      } else {
        return [...prev, skill];
      }
    });
  }, []);

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

  const currentSkills = isSearching
    ? searchResults.slice(startIndex, endIndex)
    : activeSubTab === 'official'
      ? []
      : discoverSkills.slice(startIndex, endIndex);

  const isAllSelected =
    currentSkills.length > 0 && currentSkills.every(s => selectedSkills.some(selected => selected.id === s.id));
  const isSomeSelected =
    currentSkills.length > 0 &&
    !isAllSelected &&
    currentSkills.some(s => selectedSkills.some(selected => selected.id === s.id));

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

      {/* Bulk selection toolbar */}
      {selectedSkills.length > 0 && (
        <div
          className={
            'flex items-center justify-between px-3 py-2 mb-4 rounded-2xl' +
            ' bg-LynxBlue/15 border border-LynxBlue/25 animate-in fade-in' +
            ' slide-in-from-top-2 duration-200'
          }>
          <div className="flex items-center gap-3">
            <Typography className="text-sm font-semibold text-LynxBlue">
              {selectedSkills.length} skill{selectedSkills.length === 1 ? '' : 's'} selected for installation
            </Typography>
            <Button size="sm" variant="ghost" className="text-xs text-semi-muted" onPress={() => setSelectedSkills([])}>
              Clear Selection
            </Button>
          </div>
          <Button
            size="sm"
            onPress={() => onSelectSkills(selectedSkills)}
            className="bg-LynxPurple text-white px-5 font-semibold">
            Install Selected ({selectedSkills.length})
          </Button>
        </div>
      )}

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
            <>
              <div className="flex justify-between items-center mb-3 px-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    onChange={checked => {
                      if (checked) {
                        setSelectedSkills(prev => {
                          const next = [...prev];
                          currentSkills.forEach(s => {
                            if (!next.some(existing => existing.id === s.id)) {
                              next.push(s);
                            }
                          });
                          return next;
                        });
                      } else {
                        setSelectedSkills(prev => prev.filter(s => !currentSkills.some(c => c.id === s.id)));
                      }
                    }}
                    variant="secondary"
                    isSelected={isAllSelected}
                    isIndeterminate={isSomeSelected}>
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <span className="text-xs text-semi-muted font-medium">Select Page</span>
                    </Checkbox.Content>
                  </Checkbox>
                </div>
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
              <ScrollShadow
                className={
                  'grid grid-cols-1 gap-4 overflow-y-auto flex-1 min-h-0 pb-4 content-start' +
                  ' sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2'
                }>
                {searchResults.slice(startIndex, endIndex).map(skill => {
                  const installed = isSkillInstalled(skill.name);
                  const isSelected = selectedSkills.some(s => s.id === skill.id);
                  return (
                    <SkillCard
                      skill={skill}
                      key={skill.id}
                      installed={installed}
                      isSelected={isSelected}
                      onSelect={onSelectSkill}
                      activeSubTab={activeSubTab}
                      onToggleSelect={toggleSelectSkill}
                      onShowDetails={setSelectedSkillForDetails}
                    />
                  );
                })}
              </ScrollShadow>
            </>
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
                {activeSubTab !== 'official' && (
                  <Checkbox
                    onChange={checked => {
                      if (checked) {
                        setSelectedSkills(prev => {
                          const next = [...prev];
                          currentSkills.forEach(s => {
                            if (!next.some(existing => existing.id === s.id)) {
                              next.push(s);
                            }
                          });
                          return next;
                        });
                      } else {
                        setSelectedSkills(prev => prev.filter(s => !currentSkills.some(c => c.id === s.id)));
                      }
                    }}
                    className="mr-4"
                    variant="secondary"
                    isSelected={isAllSelected}
                    isIndeterminate={isSomeSelected}>
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <span className="text-xs text-semi-muted font-medium">Select Page</span>
                    </Checkbox.Content>
                  </Checkbox>
                )}
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
                          'border border-border hover:border-LynxBlue/40 cursor-pointer' +
                          ' transition-all duration-300 flex flex-row items-center justify-between' +
                          ' hover:bg-LynxBlue/5 hover:shadow-lg hover:shadow-LynxBlue/5 active:scale-[0.98] group'
                        }
                        key={owner.owner}
                        variant="secondary"
                        onClick={() => setSelectedOwnerForSkills(owner)}>
                        <div className="flex items-center gap-3.5 min-w-0">
                          <img
                            onError={e => {
                              (e.target as HTMLImageElement).src = 'https://github.com/github.png';
                            }}
                            className={
                              'size-12 rounded-full border border-border/80 bg-black' +
                              ' group-hover:scale-105 transition-transform duration-300 shrink-0'
                            }
                            alt={owner.owner}
                            src={`https://github.com/${owner.owner}.png`}
                          />
                          <div className="min-w-0">
                            <Typography
                              className={
                                'font-bold text-base leading-tight' +
                                ' group-hover:text-LynxBlue transition-colors duration-300'
                              }>
                              {owner.owner}
                            </Typography>
                            <Description
                              className={
                                'text-xs text-semi-muted font-JetBrainsMono mt-1.5' + ' flex items-center gap-1.5'
                              }>
                              <span className="font-semibold">
                                {totalSkills} {totalSkills === 1 ? 'skill' : 'skills'}
                              </span>
                              <span className="text-border/60">•</span>
                              <span>{formatInstalls(totalInstalls)} installs</span>
                            </Description>
                          </div>
                        </div>

                        {/* Modern Arrow Indicator */}
                        <div
                          className={
                            'flex items-center justify-center size-8 rounded-full bg-foreground/5' +
                            ' group-hover:bg-LynxBlue group-hover:text-white' +
                            ' transition-all duration-300 shrink-0'
                          }>
                          <svg
                            className={
                              'size-4 stroke-current group-hover:translate-x-0.5' + ' transition-transform duration-300'
                            }
                            fill="none"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24">
                            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
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
                  'grid grid-cols-1 gap-4 overflow-y-auto flex-1 min-h-0 pb-4 content-start' +
                  ' sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2'
                }>
                {discoverSkills.slice(startIndex, endIndex).map((skill, index) => {
                  const installed = isSkillInstalled(skill.name);
                  const isSelected = selectedSkills.some(s => s.id === skill.id);
                  return (
                    <SkillCard
                      skill={skill}
                      key={skill.id}
                      installed={installed}
                      isSelected={isSelected}
                      onSelect={onSelectSkill}
                      activeSubTab={activeSubTab}
                      rank={startIndex + index + 1}
                      onToggleSelect={toggleSelectSkill}
                      onShowDetails={setSelectedSkillForDetails}
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

      {/* View All Skills Modal for Official Creator */}
      <CreatorSkillsModal
        onSelectSkill={onSelectSkill}
        selectedSkills={selectedSkills}
        isSkillInstalled={isSkillInstalled}
        onToggleSelectSkill={toggleSelectSkill}
        selectedOwnerForSkills={selectedOwnerForSkills}
        onClose={() => setSelectedOwnerForSkills(null)}
      />

      {/* View Details Modal */}
      <SkillDetailsModal
        onInstall={onSelectSkill}
        skill={selectedSkillForDetails}
        isSkillInstalled={isSkillInstalled}
        onClose={() => setSelectedSkillForDetails(null)}
      />
    </div>
  );
}

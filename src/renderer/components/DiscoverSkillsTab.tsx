import {Button, Card, Chip, Description, Input, Spinner, Typography} from '@heroui/react';
import {Download} from '@solar-icons/react-perf/BoldDuotone';
import {Magnifier} from '@solar-icons/react-perf/Linear';

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
        <Input
          className="flex-1"
          value={searchQuery}
          onKeyDown={e => e.key === 'Enter' && onSearch()}
          onChange={e => onSearchQueryChange(e.target.value)}
          placeholder="Search skills (e.g. typescript, nextjs, convex)..."
        />
        <Button onPress={onSearch} variant="secondary" className="px-6 bg-LynxPurple text-white">
          <Magnifier className="size-4 mr-2 text-white" />
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
        <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-110 pr-2">
          {searchResults.map(skill => {
            const installed = isSkillInstalled(skill.name);
            return (
              <Card key={skill.id} className="bg-white/5 border border-white/10 hover:border-white/20 transition">
                <Card.Header className="flex justify-between items-start">
                  <div>
                    <Typography className="font-bold text-base">{skill.name}</Typography>
                    <Description className="text-xs text-semi-muted mt-0.5">{skill.source}</Description>
                  </div>
                  {installed && <Chip className="bg-success-soft text-success text-[10px] h-5">Installed</Chip>}
                </Card.Header>
                <Card.Content className="py-2">
                  <Typography className="text-xs text-semi-muted">
                    {skill.installs > 0 ? `${skill.installs.toLocaleString()} downloads` : 'New skill'}
                  </Typography>
                </Card.Content>
                <Card.Footer className="flex justify-end gap-2 border-t border-white/5 pt-3 mt-2">
                  <Button
                    size="sm"
                    onPress={() => onSelectSkill(skill)}
                    className="bg-LynxPurple text-white px-4 h-8 text-xs font-semibold">
                    <Download className="size-4 mr-1.5 text-white" />
                    {installed ? 'Configure / Re-install' : 'Install'}
                  </Button>
                </Card.Footer>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

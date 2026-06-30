import {Button, Card, Chip, Description, Input, ScrollShadow, Spinner, Typography} from '@heroui/react';
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
          variant="secondary"
          value={searchQuery}
          onKeyDown={e => e.key === 'Enter' && onSearch()}
          onChange={e => onSearchQueryChange(e.target.value)}
          placeholder="Search skills (e.g. typescript, nextjs, convex)..."
        />
        <Button onPress={onSearch} variant="secondary">
          <Magnifier />
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
        <ScrollShadow className="grid grid-cols-2 gap-4 overflow-y-auto">
          {searchResults.map(skill => {
            const installed = isSkillInstalled(skill.name);
            return (
              <Card
                key={skill.id}
                variant="secondary"
                className="border border-border hover:border-foreground/10 transition">
                <Card.Header className="flex justify-between items-start">
                  <div>
                    <Typography className="font-bold text-base">{skill.name}</Typography>
                    <Description className="text-xs text-semi-muted mt-0.5">{skill.source}</Description>
                  </div>
                  {installed && <Chip className="bg-success-soft text-success text-[10px] h-5">Installed</Chip>}
                </Card.Header>
                <Card.Content>
                  <Typography className="text-xs text-semi-muted">
                    {skill.installs > 0 ? `${skill.installs.toLocaleString()} downloads` : 'New skill'}
                  </Typography>
                </Card.Content>
                <Card.Footer className="flex justify-end gap-2 border-t border-border-secondary/50 pt-3">
                  <Button size="sm" onPress={() => onSelectSkill(skill)}>
                    <Download />
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

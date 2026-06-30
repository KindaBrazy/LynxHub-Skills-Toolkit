import {Description, Modal, Tabs, Typography} from '@heroui/react';
import TabModal from '@lynx/components/TabModal';
import {CloudStorage, Compass, Inbox} from '@solar-icons/react-perf/BoldDuotone';
import {useCallback, useEffect, useState} from 'react';

import DiscoverSkillsTab from './components/DiscoverSkillsTab';
import InstalledSkillsTab from './components/InstalledSkillsTab';
import SkillInstallerModal from './components/SkillInstallerModal';
import {InstalledSkill, RegistrySkill} from './types';

const ipc = (window as any).electron.ipcRenderer;

export default function SkillsManagerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('installed');

  // Installed Skills States
  const [installedSkills, setInstalledSkills] = useState<InstalledSkill[]>([]);
  const [isLoadingInstalled, setIsLoadingInstalled] = useState(false);

  // Discover Skills States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<RegistrySkill[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Selected Skill for Installer Modal
  const [selectedSkill, setSelectedSkill] = useState<RegistrySkill | null>(null);

  // Event listener to open modal from window event
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      loadInstalledSkills();
    };
    window.addEventListener('open-skills-manager', handleOpen);
    return () => window.removeEventListener('open-skills-manager', handleOpen);
  }, []);

  const loadInstalledSkills = useCallback(async () => {
    setIsLoadingInstalled(true);
    try {
      // Fetch both project and global skills
      const [projectSkills, globalSkills] = await Promise.all([
        ipc.invoke('skills-manager:list', false),
        ipc.invoke('skills-manager:list', true),
      ]);

      const formattedProject: InstalledSkill[] = (projectSkills || []).map((s: any) => ({
        ...s,
        scope: 'project',
      }));

      const formattedGlobal: InstalledSkill[] = (globalSkills || []).map((s: any) => ({
        ...s,
        scope: 'global',
      }));

      // Combine and filter out duplicates (same name and scope)
      const combined = [...formattedProject, ...formattedGlobal];
      setInstalledSkills(combined);
    } catch (err) {
      console.error('Failed to load installed skills:', err);
    } finally {
      setIsLoadingInstalled(false);
    }
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    setIsLoadingSearch(true);
    setHasSearched(true);
    try {
      const results = await ipc.invoke('skills-manager:search', searchQuery);
      setSearchResults(results || []);
    } catch (err) {
      console.error('Failed to search skills:', err);
      setSearchResults([]);
    } finally {
      setIsLoadingSearch(false);
    }
  }, [searchQuery]);

  const isSkillInstalled = useCallback(
    (name: string) => {
      return installedSkills.some(s => s.name.toLowerCase() === name.toLowerCase());
    },
    [installedSkills],
  );

  return (
    <>
      <TabModal size="cover" isOpen={isOpen} dialogClassName="pb-0" onOpenChange={setIsOpen}>
        <Modal.Body className="flex flex-col px-0 h-full max-h-full p-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <CloudStorage aria-hidden="true" className="size-8 text-LynxPurple" />
              <div>
                <Typography className="text-xl font-bold tracking-wide">Skills Manager</Typography>
                <Description className="text-xs text-semi-muted mt-0.5">
                  Manage and discover reusable instruction packages for your AI coding agents.
                </Description>
              </div>
            </div>
            <Modal.CloseTrigger />
          </div>

          {/* Navigation Tabs */}
          <Tabs
            selectedKey={activeTab}
            aria-label="Skills Manager navigation"
            onSelectionChange={key => setActiveTab(String(key))}
            className="flex-1 flex flex-col min-h-0 pb-4 overflow-hidden">
            <Tabs.ListContainer>
              <Tabs.List>
                <Tabs.Tab id="installed" className="flex items-center gap-2">
                  <Inbox className="size-3.5" />
                  Installed
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="discover" className="flex items-center gap-2">
                  <Compass className="size-4" />
                  Discover
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>

            {/* Installed Skills Panel */}
            <Tabs.Panel id="installed" className="flex-1 flex flex-col overflow-hidden min-h-0">
              <InstalledSkillsTab
                onSwitchTab={setActiveTab}
                installedSkills={installedSkills}
                isLoadingInstalled={isLoadingInstalled}
                onRefreshInstalled={loadInstalledSkills}
              />
            </Tabs.Panel>

            {/* Discover Skills Panel */}
            <Tabs.Panel id="discover" className="flex-1 flex flex-col overflow-hidden min-h-0">
              <DiscoverSkillsTab
                onSearch={handleSearch}
                searchQuery={searchQuery}
                hasSearched={hasSearched}
                searchResults={searchResults}
                onSelectSkill={setSelectedSkill}
                isLoadingSearch={isLoadingSearch}
                isSkillInstalled={isSkillInstalled}
                onSearchQueryChange={setSearchQuery}
              />
            </Tabs.Panel>
          </Tabs>
        </Modal.Body>
      </TabModal>

      {/* Installer Options Modal */}
      <SkillInstallerModal
        selectedSkill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
        onInstallSuccess={loadInstalledSkills}
      />
    </>
  );
}

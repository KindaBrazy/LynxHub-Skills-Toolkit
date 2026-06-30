import {
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Chip,
  Description,
  Input,
  Label,
  Modal,
  Separator,
  Spinner,
  Table,
  Tabs,
  Typography,
} from '@heroui/react';
import TabModal from '@lynx/components/TabModal';
import {
  CheckCircle,
  CloudStorage,
  Download,
  InfoCircle,
  TrashBinMinimalistic,
} from '@solar-icons/react-perf/BoldDuotone';
import {Magnifier, Refresh} from '@solar-icons/react-perf/Linear';
import {useCallback, useEffect, useState} from 'react';

const ipc = (window as any).electron.ipcRenderer;

// List of common AI agents supported by vercel skills
const SUPPORTED_AGENTS = [
  'Antigravity',
  'Claude Code',
  'Cursor',
  'GitHub Copilot',
  'Cline',
  'Codex',
  'OpenCode',
  'Gemini CLI',
  'Windsurf',
  'Trae',
];

interface InstalledSkill {
  name: string;
  path: string;
  scope: 'project' | 'global';
  agents: string[];
}

interface RegistrySkill {
  id: string;
  name: string;
  installs: number;
  source: string;
}

export default function SkillsManagerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('installed');

  // Installed Skills States
  const [installedSkills, setInstalledSkills] = useState<InstalledSkill[]>([]);
  const [isLoadingInstalled, setIsLoadingInstalled] = useState(false);
  const [updatingSkills, setUpdatingSkills] = useState<Record<string, boolean>>({});
  const [deletingSkills, setDeletingSkills] = useState<Record<string, boolean>>({});
  const [confirmDelete, setConfirmDelete] = useState<Record<string, boolean>>({});

  // Discover Skills States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<RegistrySkill[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Installer Modal States
  const [selectedSkill, setSelectedSkill] = useState<RegistrySkill | null>(null);
  const [installScope, setInstallScope] = useState<'project' | 'global'>('project');
  const [installMethod, setInstallMethod] = useState<'symlink' | 'copy'>('symlink');
  const [selectedAgents, setSelectedAgents] = useState<string[]>(['Antigravity']);
  const [allAgents, setAllAgents] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installResult, setInstallResult] = useState<{success: boolean; message: string} | null>(null);

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

  const handleUpdate = useCallback(
    async (name: string, isGlobal: boolean) => {
      setUpdatingSkills(prev => ({...prev, [name]: true}));
      try {
        const res = await ipc.invoke('skills-manager:update', name, isGlobal);
        if (res.success) {
          await loadInstalledSkills();
        } else {
          alert(`Failed to update skill: ${res.error}`);
        }
      } catch (err) {
        console.error('Update error:', err);
      } finally {
        setUpdatingSkills(prev => ({...prev, [name]: false}));
      }
    },
    [loadInstalledSkills],
  );

  const handleDelete = useCallback(
    async (name: string, isGlobal: boolean) => {
      if (!confirmDelete[name]) {
        setConfirmDelete(prev => ({...prev, [name]: true}));
        // Reset after 3 seconds if not confirmed
        setTimeout(() => {
          setConfirmDelete(prev => ({...prev, [name]: false}));
        }, 3000);
        return;
      }

      setDeletingSkills(prev => ({...prev, [name]: true}));
      try {
        const res = await ipc.invoke('skills-manager:remove', name, isGlobal);
        if (res.success) {
          await loadInstalledSkills();
        } else {
          alert(`Failed to remove skill: ${res.error}`);
        }
      } catch (err) {
        console.error('Remove error:', err);
      } finally {
        setDeletingSkills(prev => ({...prev, [name]: false}));
        setConfirmDelete(prev => ({...prev, [name]: false}));
      }
    },
    [confirmDelete, loadInstalledSkills],
  );

  const handleStartInstall = useCallback(async () => {
    if (!selectedSkill) return;
    setIsInstalling(true);
    setInstallResult(null);

    const source = selectedSkill.source
      ? `${selectedSkill.source}/${selectedSkill.name}`
      : selectedSkill.id || selectedSkill.name;

    const agent = allAgents ? '*' : selectedAgents.join(' ');
    const isGlobal = installScope === 'global';
    const isCopy = installMethod === 'copy';

    try {
      const res = await ipc.invoke('skills-manager:add', source, isGlobal, agent, isCopy);
      if (res.success) {
        setInstallResult({
          success: true,
          message: `Successfully installed ${selectedSkill.name}!`,
        });
        await loadInstalledSkills();
      } else {
        setInstallResult({
          success: false,
          message: res.error || 'Failed to install skill.',
        });
      }
    } catch (err: any) {
      setInstallResult({
        success: false,
        message: err.message || String(err),
      });
    } finally {
      setIsInstalling(false);
    }
  }, [selectedSkill, installScope, installMethod, selectedAgents, allAgents, loadInstalledSkills]);

  const isSkillInstalled = useCallback(
    (name: string) => {
      return installedSkills.some(s => s.name.toLowerCase() === name.toLowerCase());
    },
    [installedSkills],
  );

  return (
    <>
      <TabModal size="cover" isOpen={isOpen} onOpenChange={setIsOpen}>
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <CloudStorage className="size-8 text-LynxPurple" />
              <div>
                <Typography className="text-xl font-bold tracking-wide">Skills Manager</Typography>
                <Description className="text-xs text-semi-muted mt-0.5">
                  Manage and discover reusable instruction packages for your AI coding agents.
                </Description>
              </div>
            </div>
            <Modal.CloseTrigger />
          </div>

          <Separator className="mb-6 opacity-20" />

          {/* Navigation Tabs */}
          <Tabs className="mb-6" selectedKey={activeTab} onSelectionChange={key => setActiveTab(String(key))}>
            <Tabs.ListContainer className="w-fit">
              <Tabs.List>
                <Tabs.Tab id="installed">
                  Installed
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="discover">
                  Discover
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>

            {/* Installed Skills Panel */}
            <Tabs.Panel id="installed" className="flex-1 flex flex-col min-h-0">
              {isLoadingInstalled ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <Spinner size="lg" />
                  <Description className="text-sm text-semi-muted">Loading installed skills...</Description>
                </div>
              ) : installedSkills.length === 0 ? (
                <div
                  className={
                    'flex flex-col items-center justify-center py-20 border' +
                    ' border-dashed border-white/10 rounded-2xl bg-white/5'
                  }>
                  <InfoCircle className="size-10 text-semi-muted mb-3" />
                  <Typography className="text-sm font-semibold">No skills installed yet</Typography>
                  <Description className="text-xs text-semi-muted mt-1">
                    Head over to the 'Discover Skills' tab to install capabilities for your agents.
                  </Description>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-125">
                  <Table className="w-full">
                    <Table.ScrollContainer>
                      <Table.Content>
                        <Table.Header>
                          <Table.Column isRowHeader>Name</Table.Column>
                          <Table.Column>Scope</Table.Column>
                          <Table.Column>Target Agents</Table.Column>
                          <Table.Column>Location</Table.Column>
                          <Table.Column className="w-48 text-right">Actions</Table.Column>
                        </Table.Header>
                        <Table.Body>
                          {installedSkills.map(skill => (
                            <Table.Row key={`${skill.name}-${skill.scope}`} className="hover:bg-white/5 transition">
                              <Table.Cell className="font-semibold text-sm">{skill.name}</Table.Cell>
                              <Table.Cell>
                                <Chip
                                  className={
                                    skill.scope === 'project'
                                      ? 'bg-LynxBlue/20 text-LynxBlue text-xs'
                                      : 'bg-LynxPurple/20 text-LynxPurple text-xs'
                                  }
                                  variant="secondary">
                                  {skill.scope === 'project' ? 'Project' : 'Global'}
                                </Chip>
                              </Table.Cell>
                              <Table.Cell>
                                <div className="flex flex-wrap gap-1">
                                  {skill.agents && skill.agents.length > 0 ? (
                                    skill.agents.map(agent => (
                                      <Chip key={agent} className="bg-white/10 text-white/90 text-[10px] h-5 py-0.5">
                                        {agent}
                                      </Chip>
                                    ))
                                  ) : (
                                    <span className="text-xs text-semi-muted">None</span>
                                  )}
                                </div>
                              </Table.Cell>
                              <Table.Cell className="font-JetBrainsMono text-xs text-semi-muted max-w-50 truncate">
                                {skill.path}
                              </Table.Cell>
                              <Table.Cell className="text-right">
                                <div className="inline-flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 px-3 text-xs"
                                    onPress={() => handleUpdate(skill.name, skill.scope === 'global')}
                                    isDisabled={updatingSkills[skill.name] || deletingSkills[skill.name]}>
                                    {updatingSkills[skill.name] ? (
                                      <Spinner size="sm" />
                                    ) : (
                                      <Refresh className="size-4 mr-1.5" />
                                    )}
                                    Update
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onPress={() => handleDelete(skill.name, skill.scope === 'global')}
                                    isDisabled={updatingSkills[skill.name] || deletingSkills[skill.name]}
                                    className="h-8 px-3 text-xs border-danger/20 hover:bg-danger/20 hover:text-white">
                                    {deletingSkills[skill.name] ? (
                                      <Spinner size="sm" />
                                    ) : (
                                      <TrashBinMinimalistic className="size-4 mr-1.5" />
                                    )}
                                    {confirmDelete[skill.name] ? 'Confirm?' : 'Remove'}
                                  </Button>
                                </div>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table.Content>
                    </Table.ScrollContainer>
                  </Table>
                </div>
              )}
            </Tabs.Panel>

            {/* Discover Skills Panel */}
            <Tabs.Panel id="discover" className="flex-1 flex flex-col min-h-0">
              {/* Search Bar */}
              <div className="flex gap-2 mb-6">
                <Input
                  className="flex-1"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Search skills (e.g. typescript, nextjs, convex)..."
                />
                <Button variant="secondary" onPress={handleSearch} className="px-6 bg-LynxPurple text-white">
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
                      <Card
                        key={skill.id}
                        className="bg-white/5 border border-white/10 hover:border-white/20 transition">
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
                            onPress={() => {
                              setSelectedSkill(skill);
                              setInstallResult(null);
                            }}
                            size="sm"
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
            </Tabs.Panel>
          </Tabs>
        </div>
      </TabModal>

      {/* Installer Options Modal */}
      <Modal isOpen={!!selectedSkill} onOpenChange={open => !open && setSelectedSkill(null)}>
        <Modal.Backdrop>
          <Modal.Container size="md">
            <Modal.Dialog>
              <div className="flex flex-col gap-4 font-Nunito">
                <div className="flex items-center gap-2">
                  <CloudStorage className="size-6 text-LynxPurple" />
                  <Typography className="text-lg font-bold">Install {selectedSkill?.name}</Typography>
                </div>
                <Description className="text-xs text-semi-muted">
                  Configure target agents and scope for this skill.
                </Description>

                <Separator className="opacity-10" />

                {/* Scope config */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-semi-muted">Installation Scope</Label>
                  <Tabs
                    className="w-full"
                    selectedKey={installScope}
                    onSelectionChange={key => setInstallScope(key as any)}>
                    <Tabs.ListContainer>
                      <Tabs.List className="w-full bg-white/5 p-1 rounded-lg">
                        <Tabs.Tab id="project">Project-scoped</Tabs.Tab>
                        <Tabs.Tab id="global">Global (User-level)</Tabs.Tab>
                      </Tabs.List>
                    </Tabs.ListContainer>
                  </Tabs>
                </div>

                {/* Install Method */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-semi-muted">Installation Method</Label>
                  <Tabs
                    className="w-full"
                    selectedKey={installMethod}
                    onSelectionChange={key => setInstallMethod(key as any)}>
                    <Tabs.ListContainer>
                      <Tabs.List className="w-full bg-white/5 p-1 rounded-lg">
                        <Tabs.Tab id="symlink">Symlink (Recommended)</Tabs.Tab>
                        <Tabs.Tab id="copy">Copy Files</Tabs.Tab>
                      </Tabs.List>
                    </Tabs.ListContainer>
                  </Tabs>
                </div>

                {/* Target Agents */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs text-semi-muted">Target AI Agents</Label>
                    <Checkbox isSelected={allAgents} onChange={setAllAgents}>
                      <span className="text-[10px] text-semi-muted">All Agents</span>
                    </Checkbox>
                  </div>

                  {!allAgents && (
                    <CheckboxGroup
                      value={selectedAgents}
                      onChange={setSelectedAgents}
                      className="grid grid-cols-2 gap-2 mt-1">
                      {SUPPORTED_AGENTS.map(agent => (
                        <Checkbox key={agent} value={agent}>
                          <span className="text-xs">{agent}</span>
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  )}
                </div>

                <Separator className="opacity-10" />

                {/* Installation Result / Logger */}
                {isInstalling && (
                  <div className="flex items-center gap-2 py-2">
                    <Spinner size="sm" />
                    <span className="text-xs text-semi-muted">Installing skill package via CLI...</span>
                  </div>
                )}

                {installResult && (
                  <div
                    className={`flex items-start gap-2 p-3 rounded-lg text-xs ${
                      installResult.success ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                    }`}>
                    {installResult.success ? (
                      <CheckCircle className="size-4 shrink-0 mt-0.5 text-success" />
                    ) : (
                      <InfoCircle className="size-4 shrink-0 mt-0.5 text-danger" />
                    )}
                    <span className="break-all">{installResult.message}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 justify-end mt-2">
                  <Button size="sm" variant="ghost" isDisabled={isInstalling} onPress={() => setSelectedSkill(null)}>
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onPress={handleStartInstall}
                    className="bg-LynxPurple text-white px-5"
                    isDisabled={isInstalling || (!allAgents && selectedAgents.length === 0)}>
                    Install Skill
                  </Button>
                </div>
              </div>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}

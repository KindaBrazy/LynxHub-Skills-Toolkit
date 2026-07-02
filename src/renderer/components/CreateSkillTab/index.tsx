import {
  Button,
  Card,
  Checkbox,
  Description,
  Form,
  Input,
  Label,
  ListBox,
  ScrollShadow,
  Select,
  Tabs,
  TextArea,
  TextField,
  Typography,
} from '@heroui/react';
import LynxSwitch from '@lynx/components/LynxSwitch';
import {AltArrowDown, AltArrowUp, CheckCircle, Folder, TrashBinMinimalistic} from '@solar-icons/react-perf/BoldDuotone';
import {PenSquare, Plus, X} from 'lucide-react';
import {useCallback, useEffect, useMemo, useState} from 'react';

import {AGENT_PATHS} from './agentPaths';

const ipc = (window as any).electron.ipcRenderer;

interface CreateSkillTabProps {
  onCreated: () => void;
}

export default function CreateSkillTab({onCreated}: CreateSkillTabProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [scope, setScope] = useState<'project' | 'global'>('project');

  // Project Scope States
  const [projectDirs, setProjectDirs] = useState<string[]>([]);
  const [selectedProjectCwd, setSelectedProjectCwd] = useState('');

  // Agents Setup
  const [agents, setAgents] = useState<{name: string; displayName: string; project: string; global: string}[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [agentFilter, setAgentFilter] = useState('');

  // Metadata & Options
  const [isInternal, setIsInternal] = useState(false);
  const [allowedTools, setAllowedTools] = useState<string[]>([]);
  const [toolInput, setToolInput] = useState('');

  // Instructions Content
  const [instructionsMode, setInstructionsMode] = useState<'steps' | 'markdown'>('steps');
  const [whenToUse, setWhenToUse] = useState('');
  const [steps, setSteps] = useState<string[]>(['First, do this', 'Then, do that']);
  const [customMarkdown, setCustomMarkdown] = useState('');

  // Status & Flags
  const [isCreating, setIsCreating] = useState(false);
  const [creationSuccess, setCreationSuccess] = useState(false);
  const [creationError, setCreationError] = useState('');
  const [createdPaths, setCreatedPaths] = useState<string[]>([]);

  // Overwrite Handler Modal State
  const [isOverwriteModalOpen, setIsOverwriteModalOpen] = useState(false);

  // Load project directories and supported agents
  const loadProjectDirs = useCallback(async () => {
    try {
      const dirs = await ipc.invoke('skills-manager:get-project-dirs');
      setProjectDirs(dirs || []);
      if (dirs && dirs.length > 0 && !selectedProjectCwd) {
        setSelectedProjectCwd(dirs[0]);
      }
    } catch (err) {
      console.error('Failed to load project directories:', err);
    }
  }, [selectedProjectCwd]);

  useEffect(() => {
    loadProjectDirs();
  }, [loadProjectDirs]);

  useEffect(() => {
    async function loadAgents() {
      try {
        const cliAgents = await ipc.invoke('skills-manager:get-agents');
        if (cliAgents && cliAgents.length > 0) {
          const mapped = cliAgents.map((a: any) => {
            const info = AGENT_PATHS[a.name] || {
              project: '.agents/skills',
              global: `~/.agents/skills`,
              displayName: a.displayName || a.name,
            };
            return {
              name: a.name,
              displayName: info.displayName,
              project: info.project,
              global: info.global,
            };
          });
          setAgents(mapped);
        } else {
          // Fallback to static list
          const standard = Object.entries(AGENT_PATHS).map(([key, info]) => ({
            name: key,
            displayName: info.displayName,
            project: info.project,
            global: info.global,
          }));
          setAgents(standard);
        }
      } catch (err) {
        console.error('Failed to load agents:', err);
        // Fallback to static list
        const standard = Object.entries(AGENT_PATHS).map(([key, info]) => ({
          name: key,
          displayName: info.displayName,
          project: info.project,
          global: info.global,
        }));
        setAgents(standard);
      }
    }
    loadAgents();
  }, []);

  // Filter agents based on search query
  const filteredAgents = useMemo(() => {
    if (!agentFilter.trim()) return agents;
    const query = agentFilter.toLowerCase();
    return agents.filter(a => a.name.toLowerCase().includes(query) || a.displayName.toLowerCase().includes(query));
  }, [agents, agentFilter]);

  // Validation
  const isNameInvalid = useMemo(() => {
    if (!name) return false;
    // Lowercase alphanumeric + hyphens only
    return !/^[a-z0-9-]+$/.test(name);
  }, [name]);

  const isFormValid = useMemo(() => {
    if (!name.trim() || isNameInvalid) return false;
    if (!description.trim()) return false;
    if (selectedAgents.length === 0) return false;
    if (scope === 'project' && !selectedProjectCwd) return false;
    return true;
  }, [name, isNameInvalid, description, selectedAgents, scope, selectedProjectCwd]);

  // Handle Allowed Tools Add/Remove
  const handleAddTool = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = toolInput.trim();
    if (trimmed && !allowedTools.includes(trimmed)) {
      setAllowedTools([...allowedTools, trimmed]);
      setToolInput('');
    }
  };

  const handleRemoveTool = (tool: string) => {
    setAllowedTools(allowedTools.filter(t => t !== tool));
  };

  // Compile final markdown content
  const generatedMarkdown = useMemo(() => {
    let yaml = '---\n';
    yaml += `name: ${name.trim().toLowerCase() || 'my-skill'}\n`;
    const descStr = description.trim().replace(/"/g, '\\"') || 'Brief explanation of what this skill does';
    yaml += `description: "${descStr}"\n`;

    let metadataYaml = '';
    if (isInternal) {
      metadataYaml += '  internal: true\n';
    }
    if (metadataYaml) {
      yaml += 'metadata:\n' + metadataYaml;
    }

    if (allowedTools.length > 0) {
      yaml += 'allowed-tools:\n';
      allowedTools.forEach(tool => {
        yaml += `  - ${tool.trim()}\n`;
      });
    }

    yaml += '---\n\n';

    const displayName = name
      ? name
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : 'My Skill';

    yaml += `# ${displayName}\n\n`;

    if (instructionsMode === 'steps') {
      yaml += '## When to Use\n\n';
      yaml += `${whenToUse.trim() || 'Describe the scenarios where this skill should be used.'}\n\n`;

      yaml += '## Steps\n\n';
      if (steps.length > 0) {
        steps.forEach((step, idx) => {
          yaml += `${idx + 1}. ${step.trim() || 'Instruction step'}\n`;
        });
      } else {
        yaml += '1. First, do this\n2. Then, do that\n';
      }
      yaml += '\n';
    } else {
      const defaultInstruction = '# Instructions\n\nWrite your detailed custom markdown instructions here.';
      yaml += `${customMarkdown.trim() || defaultInstruction}\n`;
    }

    return yaml;
  }, [name, description, isInternal, allowedTools, instructionsMode, whenToUse, steps, customMarkdown]);

  // Browse project directory
  const handleBrowseProjectFolder = async () => {
    try {
      const dir = await ipc.invoke('skills-manager:select-project-dir');
      if (dir) {
        const updated = await ipc.invoke('skills-manager:add-project-dir', dir);
        setProjectDirs(updated || []);
        setSelectedProjectCwd(dir);
      }
    } catch (err) {
      console.error('Failed to select project directory:', err);
    }
  };

  // Submit / Save logic
  const handleCreateSkill = async (overwrite: boolean = false) => {
    if (!isFormValid) return;
    setIsCreating(true);
    setCreationError('');
    setCreationSuccess(false);

    try {
      // Find paths mapped to chosen agents
      const agentPaths = selectedAgents.map(agentName => {
        const found = agents.find(a => a.name === agentName);
        return {
          agent: agentName,
          path: found ? (scope === 'project' ? found.project : found.global) : '.agents/skills',
        };
      });

      const result = await ipc.invoke(
        'skills-manager:create-skill',
        name.trim().toLowerCase(),
        scope,
        scope === 'project' ? selectedProjectCwd : undefined,
        agentPaths,
        generatedMarkdown,
        overwrite,
      );

      if (result.success) {
        setCreationSuccess(true);
        setCreatedPaths(result.paths || []);
        setIsOverwriteModalOpen(false);
      } else if (result.exists) {
        setIsOverwriteModalOpen(true);
      } else {
        setCreationError(result.error || 'Failed to create skill file.');
      }
    } catch (err: any) {
      console.error('Failed to create skill:', err);
      setCreationError(err.message || String(err));
    } finally {
      setIsCreating(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setSelectedAgents([]);
    setIsInternal(false);
    setAllowedTools([]);
    setToolInput('');
    setWhenToUse('');
    setSteps(['First, do this', 'Then, do that']);
    setCustomMarkdown('');
    setCreationSuccess(false);
    setCreationError('');
    setCreatedPaths([]);
  };

  return (
    <div className="flex-1 flex gap-6 overflow-hidden h-full min-h-0 pt-2">
      {/* Left Panel: Form */}
      <div className="flex-1 flex flex-col gap-5 overflow-y-auto px-1 scrollbar-thin">
        {creationSuccess ? (
          <Card
            className={
              'p-6 bg-surface-secondary border border-emerald-500/20 ' +
              'text-center flex flex-col items-center justify-center ' +
              'gap-4 my-auto max-w-xl mx-auto rounded-3xl'
            }>
            <CheckCircle className="size-16 text-emerald-500" />
            <div>
              <Typography className="text-xl font-bold text-emerald-400">Skill Created Successfully!</Typography>
              <Description className="text-xs text-semi-muted mt-1 leading-relaxed">
                Your custom skill{' '}
                <code className="text-accent bg-foreground/5 px-1.5 py-0.5 rounded font-JetBrainsMono">
                  {name.toLowerCase()}
                </code>{' '}
                has been created and wired into the agent directories.
              </Description>
            </div>

            <div
              className={
                'w-full text-left bg-black/20 p-3.5 border ' + 'border-border/40 rounded-2xl flex flex-col gap-1.5 mt-2'
              }>
              <span className="text-[10px] font-bold uppercase tracking-wider text-semi-muted">Created Locations:</span>
              <div
                className={
                  'flex flex-col gap-1 text-[11px] font-JetBrainsMono ' + 'text-foreground/80 break-all select-all'
                }>
                {createdPaths.map(p => (
                  <div key={p} className="flex gap-1.5 items-start">
                    <Folder className="size-3.5 shrink-0 text-LynxBlue/80 mt-0.5" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button size="sm" variant="ghost" onPress={resetForm}>
                Create Another
              </Button>
              <Button size="sm" onPress={onCreated} className="bg-LynxPurple text-white">
                View Installed Skills
              </Button>
            </div>
          </Card>
        ) : (
          <Form
            onSubmit={e => {
              e.preventDefault();
              handleCreateSkill();
            }}
            className="flex flex-col gap-5">
            {creationError && (
              <Card className="p-4 bg-danger/10 border border-danger/20 rounded-2xl flex flex-row gap-2.5 items-center">
                <span className="text-danger text-sm font-semibold">{creationError}</span>
              </Card>
            )}

            {/* Scope Selection */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-semi-muted">Installation Scope</Label>
              <Tabs selectedKey={scope} onSelectionChange={key => setScope(key as any)}>
                <Tabs.ListContainer>
                  <Tabs.List>
                    <Tabs.Tab id="project">Project-scoped</Tabs.Tab>
                    <Tabs.Tab id="global">Global (User-level)</Tabs.Tab>
                  </Tabs.List>
                </Tabs.ListContainer>
              </Tabs>
            </div>

            {/* Project Selection (if project scoped) */}
            {scope === 'project' && (
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold text-semi-muted">Target Project Destination</Label>
                <div className="flex gap-2">
                  <Select
                    className="flex-1"
                    variant="secondary"
                    value={selectedProjectCwd}
                    placeholder="Select project folder..."
                    onChange={val => setSelectedProjectCwd(val as string)}>
                    <Select.Trigger>
                      <Select.Value className="font-JetBrainsMono text-sm">
                        {selectedProjectCwd || 'Select a project folder...'}
                      </Select.Value>
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {projectDirs.map(dir => (
                          <ListBox.Item id={dir} key={dir} textValue={dir} className="font-JetBrainsMono text-xs">
                            {dir}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <Button
                    variant="secondary"
                    onPress={handleBrowseProjectFolder}
                    className="flex items-center gap-1.5 shrink-0 px-4">
                    <Folder className="size-4" /> Browse
                  </Button>
                </div>
                {projectDirs.length === 0 && (
                  <p className="text-[10px] text-danger mt-0.5">
                    No project folders registered. Click "Browse" to register a workspace folder.
                  </p>
                )}
              </div>
            )}

            {/* Metadata Section */}
            <div className="flex flex-col gap-y-4">
              <TextField isInvalid={isNameInvalid} isRequired>
                <Label className="text-xs font-semibold text-semi-muted">Skill Name (ID)</Label>
                <Input
                  value={name}
                  variant="secondary"
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. custom-git-summarizer"
                />
                <Description className="text-[10px]">
                  Unique, lowercase with hyphens. Avoid spaces or special characters.
                </Description>
                {isNameInvalid && (
                  <p className="text-[10px] text-danger">
                    Invalid name. Only lowercase letters, numbers, and hyphens are allowed.
                  </p>
                )}
              </TextField>

              <TextField isRequired>
                <Label className="text-xs font-semibold text-semi-muted">Short Description</Label>
                <Input
                  variant="secondary"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="e.g. Summarizes git branch differences and formats logs"
                />
                <Description className="text-[10px]">
                  Brief summary explaining when the agent should activate this skill.
                </Description>
              </TextField>
            </div>

            {/* Internal Flag Switch */}
            <LynxSwitch
              description={
                'Mark this skill as internal. It will only be visible in the agent if ' +
                '`INSTALL_INTERNAL_SKILLS=1` is set.'
              }
              variant="secondary"
              enabled={isInternal}
              title="Internal Skill"
              onEnabledChange={setIsInternal}
            />

            {/* Allowed Tools Input */}
            <div className="flex flex-col gap-2">
              <Label className="text-xs font-semibold text-semi-muted">Allowed Tools (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTool();
                    }
                  }}
                  value={toolInput}
                  variant="secondary"
                  className="flex-1 font-JetBrainsMono"
                  placeholder="e.g. run_command, read_file"
                  onChange={e => setToolInput(e.target.value)}
                />
                <Button variant="secondary" onPress={() => handleAddTool()} className="shrink-0 gap-1 px-4">
                  <Plus className="size-4" /> Add Tool
                </Button>
              </div>
              <Description className="text-[10px] -mt-1">
                Restricts the agent to execution of these specific tools when the skill is active. Type and hit Enter to
                add.
              </Description>

              {allowedTools.length > 0 && (
                <div className="flex flex-wrap gap-1.5 p-2 bg-black/10 border border-border/30 rounded-xl mt-1">
                  {allowedTools.map(tool => (
                    <div
                      className={
                        'flex items-center gap-1 bg-LynxBlue/15 text-LynxBlue ' +
                        'border border-LynxBlue/30 text-xs px-2.5 py-1 ' +
                        'rounded-full font-JetBrainsMono'
                      }
                      key={tool}>
                      <span>{tool}</span>
                      <button
                        type="button"
                        aria-label={`Remove tool ${tool}`}
                        onClick={() => handleRemoveTool(tool)}
                        className="hover:text-white transition-colors cursor-pointer ml-0.5">
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Target Agents Selector */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-semibold text-semi-muted">Target Coding Agents</Label>
                <div className="flex gap-3 text-[10px] font-semibold">
                  <button
                    type="button"
                    className="text-LynxBlue hover:underline cursor-pointer"
                    onClick={() => setSelectedAgents(agents.map(a => a.name))}>
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedAgents([])}
                    className="text-semi-muted hover:underline cursor-pointer">
                    Clear Selection
                  </button>
                </div>
              </div>

              {/* Agent Filter and Scrollable checkbox area */}
              <Card className="flex flex-col gap-2.5 p-3.5 bg-surface-secondary border border-border/40 rounded-2xl">
                <Input
                  variant="secondary"
                  value={agentFilter}
                  onChange={e => setAgentFilter(e.target.value)}
                  placeholder="Filter agents (e.g., claude, antigravity)..."
                  fullWidth
                />

                <ScrollShadow size={15} className="max-h-35 flex flex-col gap-2 pr-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {filteredAgents.map(a => {
                      const isSelected = selectedAgents.includes(a.name);
                      const targetPath = scope === 'project' ? a.project : a.global;

                      return (
                        <div
                          onClick={() => {
                            setSelectedAgents(prev =>
                              prev.includes(a.name) ? prev.filter(n => n !== a.name) : [...prev, a.name],
                            );
                          }}
                          className={
                            'flex items-start gap-2.5 p-2 rounded-xl border ' +
                            `transition-all cursor-pointer select-none ${
                              isSelected
                                ? 'bg-LynxPurple/10 border-LynxPurple/30'
                                : 'bg-black/10 border-border/30 hover:border-border/60'
                            }`
                          }
                          key={a.name}>
                          <Checkbox
                            onChange={() => {}} // Handle state via card click
                            isSelected={isSelected}
                            aria-label={`Select ${a.displayName}`}
                            className="mt-0.5 shrink-0 pointer-events-none"
                          />
                          <div className="flex flex-col gap-0.5 overflow-hidden">
                            <span className="font-bold text-foreground/90 leading-tight">{a.displayName}</span>
                            <span title={targetPath} className="text-[9px] text-semi-muted font-JetBrainsMono truncate">
                              {targetPath}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    {filteredAgents.length === 0 && (
                      <span className="text-center text-semi-muted text-xs py-4 col-span-2">
                        No agents match your filter.
                      </span>
                    )}
                  </div>
                </ScrollShadow>
              </Card>
            </div>

            {/* Instruction Contents Tab Options */}
            <div className="flex flex-col gap-2">
              <Label className="text-xs font-semibold text-semi-muted">Skill Instructions Format</Label>
              <Tabs selectedKey={instructionsMode} onSelectionChange={key => setInstructionsMode(key as any)}>
                <Tabs.ListContainer>
                  <Tabs.List>
                    <Tabs.Tab id="steps">Step-by-Step Builder</Tabs.Tab>
                    <Tabs.Tab id="markdown">Raw Markdown</Tabs.Tab>
                  </Tabs.List>
                </Tabs.ListContainer>
              </Tabs>

              {instructionsMode === 'steps' ? (
                <div className="flex flex-col gap-4 p-4 bg-surface-secondary border border-border/40 rounded-2xl mt-1">
                  {/* When to Use */}
                  <TextField>
                    <Label className="text-xs font-semibold text-foreground/95">When to Use Scenarios</Label>
                    <TextArea
                      placeholder={
                        'Describe precisely when this skill should trigger ' +
                        "(e.g. 'Use this skill when asked to write release " +
                        "notes or summarize commits.')"
                      }
                      rows={3}
                      value={whenToUse}
                      variant="secondary"
                      onChange={e => setWhenToUse(e.target.value)}
                    />
                  </TextField>

                  {/* Steps list */}
                  <div className="flex flex-col gap-3">
                    <Label className="text-xs font-semibold text-foreground/95">Instructions Steps</Label>
                    <div className="flex flex-col gap-2">
                      {steps.map((step, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <span className="text-xs font-bold text-semi-muted w-5 shrink-0 text-right">{idx + 1}.</span>
                          <Input
                            onChange={e => {
                              const updated = [...steps];
                              updated[idx] = e.target.value;
                              setSteps(updated);
                            }}
                            value={step}
                            className="flex-1"
                            variant="secondary"
                            placeholder={`Step ${idx + 1} instructions`}
                          />
                          <div className="flex gap-1 shrink-0">
                            <Button
                              className={
                                'h-7 w-7 min-w-7 hover:bg-white/10 rounded-lg ' + 'flex items-center justify-center p-0'
                              }
                              onPress={() => {
                                const updated = [...steps];
                                const temp = updated[idx];
                                updated[idx] = updated[idx - 1];
                                updated[idx - 1] = temp;
                                setSteps(updated);
                              }}
                              size="sm"
                              variant="ghost"
                              isDisabled={idx === 0}
                              isIconOnly>
                              <AltArrowUp className="size-4 text-semi-muted hover:text-white" />
                            </Button>
                            <Button
                              className={
                                'h-7 w-7 min-w-7 hover:bg-white/10 rounded-lg ' + 'flex items-center justify-center p-0'
                              }
                              onPress={() => {
                                const updated = [...steps];
                                const temp = updated[idx];
                                updated[idx] = updated[idx + 1];
                                updated[idx + 1] = temp;
                                setSteps(updated);
                              }}
                              size="sm"
                              variant="ghost"
                              isDisabled={idx === steps.length - 1}
                              isIconOnly>
                              <AltArrowDown className="size-4 text-semi-muted hover:text-white" />
                            </Button>
                            <Button
                              className={
                                'h-7 w-7 min-w-7 hover:bg-danger/20 hover:text-danger ' +
                                'rounded-lg flex items-center justify-center p-0 border ' +
                                'border-transparent hover:border-danger/20'
                              }
                              size="sm"
                              variant="danger"
                              isDisabled={steps.length <= 1}
                              onPress={() => setSteps(steps.filter((_, i) => i !== idx))}
                              isIconOnly>
                              <TrashBinMinimalistic className="size-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onPress={() => setSteps([...steps, ''])}
                      className="w-fit self-start gap-1 h-8 mt-1 border border-border/50 hover:bg-white/5">
                      <Plus className="size-3.5" /> Add Step
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1 p-1 bg-surface-secondary border border-border/40 rounded-2xl mt-1">
                  <TextField className="full-width">
                    <Label className="text-xs font-semibold text-foreground/95 px-3 pt-2">Custom Markdown Body</Label>
                    <TextArea
                      placeholder={
                        '# Instructions\n\nUse standard markdown tags here.\n' +
                        'For example, list out bulleted lists or subheadings.'
                      }
                      rows={12}
                      variant="secondary"
                      value={customMarkdown}
                      onChange={e => setCustomMarkdown(e.target.value)}
                      className="font-JetBrainsMono text-xs leading-relaxed px-1"
                    />
                  </TextField>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="flex justify-end gap-3 mt-4">
              <Button size="sm" type="button" variant="ghost" className="px-5" onPress={resetForm}>
                Reset
              </Button>
              <Button
                size="sm"
                type="submit"
                isDisabled={!isFormValid || isCreating}
                className="bg-LynxPurple text-white px-7 font-bold">
                {isCreating ? 'Creating...' : 'Create Skill'}
              </Button>
            </div>
          </Form>
        )}
      </div>

      {/* Right Panel: Live Markdown Preview */}
      <div className="w-[40%] hidden lg:flex flex-col gap-3 min-w-[320px] max-w-120">
        <div className="flex items-center gap-2 px-1">
          <PenSquare className="size-4 text-semi-muted" />
          <span className="text-xs font-bold text-semi-muted">Live Preview (SKILL.md)</span>
        </div>

        <Card
          className={
            'flex-1 flex flex-col p-4 bg-surface-secondary ' + 'border border-border/40 rounded-3xl overflow-hidden'
          }>
          <div className="text-[10px] font-bold font-JetBrainsMono text-semi-muted border-b border-border/20 pb-2 mb-3">
            PATH: {scope === 'project' ? './' : '~/'}
            {selectedAgents.length > 0 ? (
              <span className="text-LynxBlue font-bold">
                {scope === 'project'
                  ? agents.find(a => a.name === selectedAgents[0])?.project || '.agents/skills'
                  : agents.find(a => a.name === selectedAgents[0])?.global || '~/.agents/skills'}
                /{name.toLowerCase() || 'my-skill'}/SKILL.md
              </span>
            ) : (
              <span>[Select Agent]/[Skill-Name]/SKILL.md</span>
            )}
            {selectedAgents.length > 1 && ` (+${selectedAgents.length - 1} other agents)`}
          </div>

          <ScrollShadow
            className={
              'flex-1 pr-1 font-JetBrainsMono text-[11px] ' +
              'leading-relaxed text-foreground/80 overflow-y-auto ' +
              'whitespace-pre-wrap select-text ' +
              'selection:bg-LynxPurple/30 select-none'
            }>
            {generatedMarkdown}
          </ScrollShadow>
        </Card>
      </div>

      {/* Overwrite Confirmation Dialog */}
      {isOverwriteModalOpen && (
        <div
          className={
            'fixed inset-0 z-50 flex items-center justify-center ' +
            'bg-black/60 backdrop-blur-sm p-4 animate-in fade-in ' +
            'duration-200'
          }>
          <Card
            className={
              'max-w-md w-full p-5 bg-surface-secondary border ' +
              'border-border/50 rounded-3xl flex flex-col gap-4 shadow-2xl'
            }>
            <Card.Header className="pb-0 px-1">
              <Card.Title className="text-base font-bold text-foreground/90">Skill Already Exists</Card.Title>
              <Card.Description className="text-xs text-semi-muted mt-1 leading-normal">
                A custom skill directory with the name{' '}
                <code className="text-accent bg-foreground/5 px-1 rounded font-JetBrainsMono">
                  {name.toLowerCase()}
                </code>{' '}
                already exists in one of the selected agent destinations.
              </Card.Description>
            </Card.Header>
            <Card.Content className="py-2 text-xs text-semi-muted">
              Are you sure you want to overwrite it? This action will replace the existing{' '}
              <code className="font-JetBrainsMono">SKILL.md</code> file in those directories.
            </Card.Content>
            <Card.Footer className="flex justify-end gap-3 pt-2">
              <Button size="sm" variant="ghost" onPress={() => setIsOverwriteModalOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" variant="danger" className="px-5 font-semibold" onPress={() => handleCreateSkill(true)}>
                Overwrite
              </Button>
            </Card.Footer>
          </Card>
        </div>
      )}
    </div>
  );
}

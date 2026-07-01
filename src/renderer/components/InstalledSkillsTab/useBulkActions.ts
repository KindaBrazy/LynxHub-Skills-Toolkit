import type {Selection} from '@heroui/react';
import {bottomToast} from '@lynx/layouts/ToastProviders';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {InstalledSkill} from '../../types';

const ipc = (window as any).electron.ipcRenderer;

export function useBulkActions(installedSkills: InstalledSkill[], onRefreshInstalled: () => Promise<void>) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set<any>());
  const [confirmBulkDelete, setConfirmBulkDelete] = useState(false);
  const [bulkLoadingStatus, setBulkLoadingStatus] = useState<string | null>(null);

  const confirmBulkDeleteTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up confirmation timer on unmount
  useEffect(() => {
    return () => {
      if (confirmBulkDeleteTimeoutRef.current) {
        clearTimeout(confirmBulkDeleteTimeoutRef.current);
      }
    };
  }, []);

  // Clear selected keys that are no longer present in installedSkills
  useEffect(() => {
    setSelectedKeys(prev => {
      if (prev === 'all') return prev;
      const validKeys = new Set(installedSkills.map(s => `${s.name}-${s.scope}`));
      const next = new Set<any>();
      const prevSet = prev as Set<any>;
      for (const k of prevSet) {
        if (validKeys.has(String(k))) {
          next.add(k);
        }
      }
      if (next.size !== prevSet.size) {
        return next;
      }
      return prev;
    });
  }, [installedSkills]);

  const selectedSkillsList = useMemo(() => {
    if (selectedKeys === 'all') {
      return installedSkills;
    }
    const keysSet = selectedKeys as Set<any>;
    return installedSkills.filter(skill => {
      const key = `${skill.name}-${skill.scope}`;
      return keysSet.has(key);
    });
  }, [selectedKeys, installedSkills]);

  const toggleSelectSkill = useCallback((skillKey: string) => {
    setSelectedKeys(prev => {
      const next = new Set<any>(prev === 'all' ? [] : Array.from(prev as Set<any>));
      if (next.has(skillKey)) {
        next.delete(skillKey);
      } else {
        next.add(skillKey);
      }
      return next;
    });
  }, []);

  const handleBulkUpdate = useCallback(
    async (skillsToUpdate: InstalledSkill[]) => {
      if (skillsToUpdate.length === 0) return;

      setSelectedKeys(new Set());
      setBulkLoadingStatus(`Preparing to update ${skillsToUpdate.length} skill(s)...`);

      let successCount = 0;
      let failCount = 0;

      for (let i = 0; i < skillsToUpdate.length; i++) {
        const skill = skillsToUpdate[i];
        setBulkLoadingStatus(`Updating skill ${i + 1} of ${skillsToUpdate.length}: "${skill.name}"...`);
        try {
          const res = await ipc.invoke('skills-manager:update', skill.name, skill.scope === 'global', skill.path);
          if (res.success) {
            successCount++;
          } else {
            failCount++;
            console.error(`Failed to update ${skill.name}:`, res.error);
          }
        } catch (err) {
          failCount++;
          console.error(`Error updating ${skill.name}:`, err);
        }
      }

      setBulkLoadingStatus(null);
      await onRefreshInstalled();

      if (failCount === 0) {
        bottomToast.success(`Successfully updated all ${successCount} skill(s)!`);
      } else {
        bottomToast.warning(`Updated ${successCount} skill(s), ${failCount} failed.`);
      }
    },
    [onRefreshInstalled],
  );

  const handleBulkRemove = useCallback(
    async (skillsToRemove: InstalledSkill[]) => {
      if (skillsToRemove.length === 0) return;

      setSelectedKeys(new Set());
      setConfirmBulkDelete(false);
      setBulkLoadingStatus(`Preparing to remove ${skillsToRemove.length} skill(s)...`);

      let successCount = 0;
      let failCount = 0;

      for (let i = 0; i < skillsToRemove.length; i++) {
        const skill = skillsToRemove[i];
        setBulkLoadingStatus(`Removing skill ${i + 1} of ${skillsToRemove.length}: "${skill.name}"...`);
        try {
          const res = await ipc.invoke('skills-manager:remove', skill.name, skill.scope === 'global', skill.path);
          if (res.success) {
            successCount++;
          } else {
            failCount++;
            console.error(`Failed to remove ${skill.name}:`, res.error);
          }
        } catch (err) {
          failCount++;
          console.error(`Error removing ${skill.name}:`, err);
        }
      }

      setBulkLoadingStatus(null);
      await onRefreshInstalled();

      if (failCount === 0) {
        bottomToast.success(`Successfully removed all ${successCount} skill(s).`);
      } else {
        bottomToast.warning(`Removed ${successCount} skill(s), ${failCount} failed.`);
      }
    },
    [onRefreshInstalled],
  );

  const onPressBulkRemove = useCallback(() => {
    if (!confirmBulkDelete) {
      setConfirmBulkDelete(true);
      if (confirmBulkDeleteTimeoutRef.current) {
        clearTimeout(confirmBulkDeleteTimeoutRef.current);
      }
      confirmBulkDeleteTimeoutRef.current = setTimeout(() => {
        setConfirmBulkDelete(false);
      }, 3000);
    } else {
      if (confirmBulkDeleteTimeoutRef.current) {
        clearTimeout(confirmBulkDeleteTimeoutRef.current);
      }
      handleBulkRemove(selectedSkillsList);
    }
  }, [confirmBulkDelete, selectedSkillsList, handleBulkRemove]);

  const handleBulkActionOption = useCallback(
    (key: React.Key) => {
      const option = String(key);
      if (option === 'all') {
        handleBulkUpdate(installedSkills);
      } else if (option === 'project') {
        const filtered = installedSkills.filter(s => s.scope === 'project');
        handleBulkUpdate(filtered);
      } else if (option === 'global') {
        const filtered = installedSkills.filter(s => s.scope === 'global');
        handleBulkUpdate(filtered);
      } else if (option.startsWith('agent-')) {
        const agentName = option.substring('agent-'.length);
        const filtered = installedSkills.filter(s => s.agents && s.agents.includes(agentName));
        handleBulkUpdate(filtered);
      }
    },
    [installedSkills, handleBulkUpdate],
  );

  return {
    selectedKeys,
    setSelectedKeys,
    selectedSkillsList,
    confirmBulkDelete,
    setConfirmBulkDelete,
    bulkLoadingStatus,
    handleBulkUpdate,
    handleBulkRemove,
    onPressBulkRemove,
    handleBulkActionOption,
    toggleSelectSkill,
  };
}

'use client';

import { WorkspaceSettingsDialog } from '@/features/workspace/components/workspace-settings/workspace-settings-dialog';
import { Workspace } from '@/features/workspace/types/workspace-switcher.type';
import { useState } from 'react';
import { WorkspaceSwitcher } from '../switcher/workspace-switcher';

const mockWorkspaces: Workspace[] = [
  {
    id: 'workspace-1',
    name: 'Node Mind',
    slug: 'node-mind',
    plan: 'Free Plan',
    memberCount: 1,
  },
  {
    id: 'workspace-2',
    name: 'Dev Workspace',
    slug: 'dev-workspace',
    plan: 'Pro Plan',
    memberCount: 3,
  },
  {
    id: 'workspace-3',
    name: 'Personal Notes',
    slug: 'personal-notes',
    plan: 'Free Plan',
    memberCount: 1,
  },
];

export function WorkspaceSwitcherContainer() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleWorkspaceChange = (workspace: Workspace) => {
    console.log('change workspace:', workspace);
  };

  const handleCreateWorkspace = () => {
    console.log('create workspace');
  };

  const handleOpenSettings = () => {
    setSettingsOpen(true);
  };

  const handleManageMembers = () => {
    console.log('manage members');
  };

  const handleLogout = () => {
    console.log('logout');
  };

  return (
    <>
      <WorkspaceSwitcher
        workspaces={mockWorkspaces}
        currentUserEmail="tuankiet.78vn@gmail.com"
        onWorkspaceChange={handleWorkspaceChange}
        onCreateWorkspace={handleCreateWorkspace}
        onOpenSettings={handleOpenSettings}
        onManageMembers={handleManageMembers}
        onLogout={handleLogout}
      />
      <WorkspaceSettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </>
  );
}

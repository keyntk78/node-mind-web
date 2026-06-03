'use client';

import { Plus } from 'lucide-react';

import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/shared/components/ui/dropdown-menu';

import { Workspace } from '@/features/workspace/types/workspace-switcher.type';
import { useTranslations } from 'next-intl';
import { WorkspaceSwitcherItem } from './workspace-switcher-item';

type WorkspaceSwitcherListProps = {
  workspaces: Workspace[];
  activeWorkspace: Workspace;
  currentUserEmail: string;
  onWorkspaceChange: (workspace: Workspace) => void;
  onCreateWorkspace?: () => void;
};

export function WorkspaceSwitcherList({
  workspaces,
  activeWorkspace,
  currentUserEmail,
  onWorkspaceChange,
  onCreateWorkspace,
}: WorkspaceSwitcherListProps) {
  const t = useTranslations('common');

  return (
    <div className="p-2">
      <DropdownMenuLabel className="flex items-center justify-between px-2 text-xs text-muted-foreground">
        <span>{currentUserEmail}</span>
      </DropdownMenuLabel>

      {workspaces.map((workspace) => (
        <WorkspaceSwitcherItem
          key={workspace.id}
          workspace={workspace}
          isActive={workspace.id === activeWorkspace.id}
          onSelect={onWorkspaceChange}
        />
      ))}

      <DropdownMenuItem
        onClick={onCreateWorkspace}
        className="gap-3 rounded-md px-2 py-2 text-primary cursor-pointer hover:bg-secondary data-[state=open]:bg-secondary"
      >
        <div className="flex size-6 items-center justify-center rounded-md border">
          <Plus className="size-4" />
        </div>

        <span>{t('newWorkspace')}</span>
      </DropdownMenuItem>
    </div>
  );
}

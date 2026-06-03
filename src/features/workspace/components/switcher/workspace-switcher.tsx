'use client';

import { ChevronDown, LogOut } from 'lucide-react';
import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar';

import {
  Workspace,
  WorkspaceSwitcherProps,
} from '@/features/workspace/types/workspace-switcher.type';
import { useTranslations } from 'next-intl';
import { WorkspaceAvatar } from '../ui/workspace-avatar';
import { WorkspaceSwitcherHeader } from './workspace-switcher-header';
import { WorkspaceSwitcherList } from './workspace-switcher-list';

export function WorkspaceSwitcher({
  workspaces,
  currentUserEmail,
  onWorkspaceChange,
  onCreateWorkspace,
  onOpenSettings,
  onManageMembers,
  onLogout,
}: WorkspaceSwitcherProps) {
  const [activeWorkspace, setActiveWorkspace] = React.useState(workspaces[0]);
  const t = useTranslations('common');
  if (!activeWorkspace) return null;

  const handleChangeWorkspace = (workspace: Workspace) => {
    setActiveWorkspace(workspace);
    onWorkspaceChange?.(workspace);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<SidebarMenuButton className="h-10 px-2 cursor-pointer" />}
          >
            <>
              <WorkspaceAvatar workspace={activeWorkspace} />

              <span className="truncate font-medium">
                {activeWorkspace.name}
              </span>

              <ChevronDown className="ml-auto size-4 opacity-60" />
            </>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            side="bottom"
            sideOffset={8}
            className="w-80 rounded-xl p-0"
          >
            <WorkspaceSwitcherHeader
              workspace={activeWorkspace}
              onOpenSettings={onOpenSettings}
              onManageMembers={onManageMembers}
            />

            <DropdownMenuSeparator />

            <WorkspaceSwitcherList
              workspaces={workspaces}
              activeWorkspace={activeWorkspace}
              currentUserEmail={currentUserEmail}
              onWorkspaceChange={handleChangeWorkspace}
              onCreateWorkspace={onCreateWorkspace}
            />

            <DropdownMenuSeparator />

            <div className="p-2">
              <DropdownMenuItem
                onClick={onLogout}
                className="gap-3 rounded-md px-2 py-2 text-muted-foreground cursor-pointer"
              >
                <LogOut className="size-4" />
                {t('logout')}
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

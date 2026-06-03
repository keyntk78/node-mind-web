import { Check } from 'lucide-react';

import { DropdownMenuItem } from '@/shared/components/ui/dropdown-menu';

import { Workspace } from '@/features/workspace/types/workspace-switcher.type';
import { WorkspaceAvatar } from '../ui/workspace-avatar';

type WorkspaceSwitcherItemProps = {
  workspace: Workspace;
  isActive: boolean;
  onSelect: (workspace: Workspace) => void;
};

export function WorkspaceSwitcherItem({
  workspace,
  isActive,
  onSelect,
}: WorkspaceSwitcherItemProps) {
  return (
    <DropdownMenuItem
      onClick={() => onSelect(workspace)}
      className="gap-3 rounded-md px-2 py-2 cursor-pointer *:bg-transparent data-[state=open]:bg-transparent"
    >
      <WorkspaceAvatar workspace={workspace} />

      <span className="min-w-0 flex-1 truncate">{workspace.name}</span>

      {isActive && <Check className="size-4" />}
    </DropdownMenuItem>
  );
}

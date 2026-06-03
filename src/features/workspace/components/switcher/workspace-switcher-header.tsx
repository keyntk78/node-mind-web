import { Settings, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Workspace } from '@/features/workspace/types/workspace-switcher.type';
import { WorkspaceAvatar } from '../ui/workspace-avatar';

type WorkspaceSwitcherHeaderProps = {
  workspace: Workspace;
  onOpenSettings?: () => void;
  onManageMembers?: () => void;
};

export function WorkspaceSwitcherHeader({
  workspace,
  onOpenSettings,
  onManageMembers,
}: WorkspaceSwitcherHeaderProps) {
  const t = useTranslations('common');

  return (
    <div className="p-4">
      <div className="flex items-start gap-3">
        <WorkspaceAvatar workspace={workspace} size="lg" />

        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold">{workspace.name}</div>

          <div className="text-sm text-muted-foreground">
            {workspace.plan ?? 'Free Plan'} · {workspace.memberCount ?? 1}{' '}
            {t('member')}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={onOpenSettings}
          className="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm hover:bg-accent cursor-pointer"
        >
          <Settings className="size-4" />
          {t('settings')}
        </button>

        <button
          type="button"
          onClick={onManageMembers}
          className="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm hover:bg-accent cursor-pointer"
        >
          <Users className="size-4" />
          {t('manageMembers')}
        </button>
      </div>
    </div>
  );
}

import { Workspace } from '@/features/workspace/types/workspace-switcher.type';
import { cn } from '@/shared/lib/utils';

type WorkspaceAvatarProps = {
  workspace: Workspace;
  size?: 'md' | 'lg';
};

export function WorkspaceAvatar({
  workspace,
  size = 'md',
}: WorkspaceAvatarProps) {
  const sizeClass = size === 'lg' ? 'size-11' : 'size-6';

  if (workspace.avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={workspace.avatarUrl}
        alt={workspace.name}
        className={cn(sizeClass, 'shrink-0 rounded-md object-cover')}
      />
    );
  }

  return (
    <div
      className={cn(
        sizeClass,
        'flex shrink-0 items-center justify-center rounded-md bg-muted font-medium',
      )}
    >
      {workspace.name.charAt(0).toUpperCase()}
    </div>
  );
}

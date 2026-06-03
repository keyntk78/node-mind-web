export type Workspace = {
  id: string;
  name: string;
  slug: string;
  avatarUrl?: string | null;
  plan?: string;
  memberCount?: number;
};

export type WorkspaceSwitcherProps = {
  workspaces: Workspace[];
  currentUserEmail: string;
  onWorkspaceChange?: (workspace: Workspace) => void;
  onCreateWorkspace?: () => void;
  onOpenSettings?: () => void;
  onManageMembers?: () => void;
  onLogout?: () => void;
};

export type PageTreeItem = {
  id: string;
  title: string;
  icon?: string | null;
  hasChildren: boolean;
  orderIndex: number;
  updatedAt: string;
};

export type PageChildrenMeta = {
  limit: number;
  hasMore: boolean;
  nextCursor?: string | null;
};

export type PageChildrenParams = {
  workspaceId: string;
  parentId: string;
  limit?: number;
  cursor?: string;
};

export type PageChildrenResponse = {
  message: string;
  data: PageTreeItem[];
  meta: PageChildrenMeta;
};

export type CreatePagePayload = {
  workspaceId: string;
  parentId: string | null;
  title: string;
  icon?: string | null;
};

export type CreatedPage = {
  id: string;
  workspaceId: string;
  parentId?: string | null;
  title: string;
  icon?: string | null;
  hasChildren?: boolean;
  orderIndex?: number;
  updatedAt?: string;
};

export type CreatePageResponse = {
  message: string;
  data: CreatedPage;
};

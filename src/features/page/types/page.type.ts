import type { PartialBlock } from '@blocknote/core';

export type Page = {
  id: string;
  workspaceId: string;
  parentId: string | null;
  title: string;
  icon: string | null;
  coverUrl: string | null;
  orderIndex: number;
  isArchived: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  blocks: (PartialBlock & { id: string })[];
};

export type UpdatePagePayload = {
  title?: string;
  icon?: string | null;
  coverUrl?: string | null;
};

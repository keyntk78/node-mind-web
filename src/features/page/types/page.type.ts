import type { Block } from '@/features/page/types/block.type';

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
  blocks: Block[];
};

export type UpdatePagePayload = {
  title?: string;
  icon?: string | null;
  coverUrl?: string | null;
};

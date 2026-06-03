import type { Block as BlockNoteBlock, PartialBlock } from '@blocknote/core';

export type BlockContent = BlockNoteBlock | (PartialBlock & { id: string });

export type Block = {
  id: string;
  pageId: string;
  type: string;
  content: BlockContent;
  orderIndex: number;
  createdAt?: string;
  updatedAt: string;
};

export type CreateBlockPayload = {
  pageId: string;
  type: string;
  content: BlockContent;
  orderIndex?: number;
};

export type UpdateBlockPayload = {
  content: BlockContent;
};

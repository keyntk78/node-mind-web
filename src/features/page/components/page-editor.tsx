'use client';

import {
  deleteBlock,
  reorderBlocks,
  updateBlock,
} from '@/features/page/api/block.api';
import { useCreateBlock } from '@/features/page/hooks/use-create-block';
import type { Block, PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/shadcn';
import '@blocknote/shadcn/style.css';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef } from 'react';

type PersistedEditorBlock = PartialBlock & {
  id: string;
};

type PersistedBlock = {
  id: string; // DB block id
  pageId: string;
  type: string;
  content: PersistedEditorBlock; // BlockNote block json
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
};

type EditorBlockContent = Block | PersistedEditorBlock;

type PageEditorProps = {
  pageId: string;
  initialBlocks?: PersistedBlock[];
};

export function PageEditor({ pageId, initialBlocks = [] }: PageEditorProps) {
  const queryClient = useQueryClient();

  const editorInitialBlocks = useMemo(() => {
    return [...initialBlocks]
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map((block) => block.content);
  }, [initialBlocks]);

  const editor = useCreateBlockNote({
    initialContent: editorInitialBlocks.length
      ? editorInitialBlocks
      : undefined,
  });

  const createBlockMutation = useCreateBlock();

  const savedBlockIdsRef = useRef<Set<string>>(
    new Set(editorInitialBlocks.map((block) => block.id)),
  );

  const deletedBlockIdsRef = useRef<Set<string>>(new Set());

  const persistedBlockIdsRef = useRef<Map<string, string>>(
    new Map(initialBlocks.map((block) => [block.content.id, block.id])),
  );

  const orderIndexesRef = useRef<Map<string, number>>(
    new Map(editorInitialBlocks.map((block, index) => [block.id, index])),
  );

  const latestBlocksRef = useRef<EditorBlockContent[]>(editorInitialBlocks);

  const pendingUpdateBlocksRef = useRef<
    Map<string, { content: EditorBlockContent }>
  >(new Map());

  const updateTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const reorderTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const updateTimers = updateTimersRef.current;

    return () => {
      updateTimers.forEach((timer) => clearTimeout(timer));
      updateTimers.clear();

      if (reorderTimerRef.current) {
        clearTimeout(reorderTimerRef.current);
      }
    };
  }, []);

  const debounceReorderBlocks = (blocks: EditorBlockContent[]) => {
    latestBlocksRef.current = blocks;

    const reorderedBlocks = blocks.map((block, index) => {
      const persistedBlockId = persistedBlockIdsRef.current.get(block.id);

      if (!persistedBlockId) {
        return null;
      }

      return {
        id: persistedBlockId,
        orderIndex: index,
      };
    });

    if (reorderedBlocks.some((block) => !block)) {
      return;
    }

    if (reorderTimerRef.current) {
      clearTimeout(reorderTimerRef.current);
    }

    reorderTimerRef.current = setTimeout(() => {
      void reorderBlocks(pageId, {
        blocks: reorderedBlocks.filter((block) => block !== null),
      }).then(() => {
        queryClient.invalidateQueries({
          queryKey: ['page', pageId],
        });
      });

      reorderTimerRef.current = null;
    }, 600);
  };

  const debounceUpdateBlock = (
    editorBlockId: string,
    content: EditorBlockContent,
  ) => {
    const persistedBlockId = persistedBlockIdsRef.current.get(editorBlockId);

    if (!persistedBlockId) {
      pendingUpdateBlocksRef.current.set(editorBlockId, { content });
      return;
    }

    const existingTimer = updateTimersRef.current.get(editorBlockId);

    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const timer = setTimeout(() => {
      void updateBlock(persistedBlockId, {
        content,
      }).then(() => {
        queryClient.invalidateQueries({
          queryKey: ['page', pageId],
        });
      });

      updateTimersRef.current.delete(editorBlockId);
    }, 600);

    updateTimersRef.current.set(editorBlockId, timer);
  };

  return (
    <div className="w-full">
      <BlockNoteView
        editor={editor}
        theme="light"
        className="min-h-125 w-full rounded-none border-none bg-transparent px-0 shadow-none"
        shadCNComponents={{}}
        onChange={() => {
          const blocks = editor.document;
          const currentBlockIds = new Set(blocks.map((block) => block.id));
          let shouldReorder = false;

          savedBlockIdsRef.current.forEach((editorBlockId) => {
            if (currentBlockIds.has(editorBlockId)) {
              return;
            }

            const updateTimer = updateTimersRef.current.get(editorBlockId);

            if (updateTimer) {
              clearTimeout(updateTimer);
              updateTimersRef.current.delete(editorBlockId);
            }

            const persistedBlockId =
              persistedBlockIdsRef.current.get(editorBlockId);

            savedBlockIdsRef.current.delete(editorBlockId);
            deletedBlockIdsRef.current.add(editorBlockId);
            persistedBlockIdsRef.current.delete(editorBlockId);
            pendingUpdateBlocksRef.current.delete(editorBlockId);
            orderIndexesRef.current.delete(editorBlockId);
            shouldReorder = true;

            if (persistedBlockId) {
              void deleteBlock(persistedBlockId).then(() => {
                queryClient.invalidateQueries({
                  queryKey: ['page', pageId],
                });
              });
            }
          });

          blocks.forEach((block, index) => {
            const isNewBlock = !savedBlockIdsRef.current.has(block.id);
            const previousIndex = orderIndexesRef.current.get(block.id);

            if (previousIndex !== index) {
              shouldReorder = true;
            }

            orderIndexesRef.current.set(block.id, index);

            if (isNewBlock) {
              savedBlockIdsRef.current.add(block.id);

              createBlockMutation.mutate(
                {
                  pageId,
                  type: block.type,
                  content: block,
                  orderIndex: index,
                },
                {
                  onSuccess: (createdBlock) => {
                    if (deletedBlockIdsRef.current.has(block.id)) {
                      deletedBlockIdsRef.current.delete(block.id);
                      void deleteBlock(createdBlock.id).then(() => {
                        queryClient.invalidateQueries({
                          queryKey: ['page', pageId],
                        });
                      });
                      return;
                    }

                    persistedBlockIdsRef.current.set(block.id, createdBlock.id);

                    const pendingUpdate = pendingUpdateBlocksRef.current.get(
                      block.id,
                    );

                    if (pendingUpdate) {
                      pendingUpdateBlocksRef.current.delete(block.id);
                      debounceUpdateBlock(block.id, pendingUpdate.content);
                    }

                    debounceReorderBlocks(latestBlocksRef.current);
                  },
                },
              );

              return;
            }

            debounceUpdateBlock(block.id, block);
          });

          if (shouldReorder) {
            debounceReorderBlocks(blocks);
          }
        }}
      />
    </div>
  );
}

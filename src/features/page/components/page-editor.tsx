'use client';

import { updateBlock } from '@/features/page/api/block.api';
import { useCreateBlock } from '@/features/page/hooks/use-create-block';
import type { Block, PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/shadcn';
import '@blocknote/shadcn/style.css';
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

  const persistedBlockIdsRef = useRef<Map<string, string>>(
    new Map(initialBlocks.map((block) => [block.content.id, block.id])),
  );

  const pendingUpdateBlocksRef = useRef<
    Map<string, { content: EditorBlockContent }>
  >(new Map());

  const updateTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  useEffect(() => {
    const updateTimers = updateTimersRef.current;

    return () => {
      updateTimers.forEach((timer) => clearTimeout(timer));
      updateTimers.clear();
    };
  }, []);

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

          blocks.forEach((block, index) => {
            const isNewBlock = !savedBlockIdsRef.current.has(block.id);

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
                    persistedBlockIdsRef.current.set(block.id, createdBlock.id);

                    const pendingUpdate = pendingUpdateBlocksRef.current.get(
                      block.id,
                    );

                    if (pendingUpdate) {
                      pendingUpdateBlocksRef.current.delete(block.id);
                      debounceUpdateBlock(block.id, pendingUpdate.content);
                    }
                  },
                },
              );

              return;
            }

            debounceUpdateBlock(block.id, block);
          });
        }}
      />
    </div>
  );
}

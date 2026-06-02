import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import {
  createPage,
  getPageChildren,
} from '@/features/workspace/api/pages.api';

const PAGE_CHILDREN_LIMIT = 15;

type UsePageChildrenQueryParams = {
  workspaceId?: string;
  parentId: string;
  enabled?: boolean;
};

export const pageQueryKeys = {
  workspace: (workspaceId: string | undefined) =>
    ['pages', 'children', workspaceId] as const,
  children: (workspaceId: string | undefined, parentId: string) =>
    ['pages', 'children', workspaceId, parentId] as const,
};

export function usePageChildrenQuery({
  workspaceId,
  parentId,
  enabled = true,
}: UsePageChildrenQueryParams) {
  return useInfiniteQuery({
    queryKey: pageQueryKeys.children(workspaceId, parentId),
    queryFn: ({ pageParam }) =>
      getPageChildren({
        workspaceId: workspaceId ?? '',
        parentId,
        limit: PAGE_CHILDREN_LIMIT,
        cursor: pageParam,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore
        ? (lastPage.meta.nextCursor ?? undefined)
        : undefined,
    enabled: enabled && Boolean(workspaceId),
  });
}

export function useCreatePageMutation() {
  return useMutation({
    mutationFn: createPage,
  });
}

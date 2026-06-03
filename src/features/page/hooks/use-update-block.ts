import { updateBlock } from '@/features/page/api/block.api';
import type { UpdateBlockPayload } from '@/features/page/types/block.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateBlock(blockId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateBlockPayload) => updateBlock(blockId, payload),
    onSuccess: (block) => {
      queryClient.setQueryData(['block', blockId], block);
      queryClient.invalidateQueries({
        queryKey: ['page', block.pageId],
      });
    },
  });
}

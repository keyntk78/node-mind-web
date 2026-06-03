import { createBlock } from '@/features/page/api/block.api';
import type { CreateBlockPayload } from '@/features/page/types/block.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBlockPayload) => createBlock(payload),
    onSuccess: (block) => {
      queryClient.setQueryData(['block', block.id], block);
      queryClient.invalidateQueries({
        queryKey: ['page', block.pageId],
      });
    },
  });
}

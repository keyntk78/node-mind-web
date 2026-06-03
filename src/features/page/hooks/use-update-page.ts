import { updatePage } from '@/features/page/api/ page.api';
import { UpdatePagePayload } from '@/features/page/types/page.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdatePage(pageId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePagePayload) => updatePage(pageId, payload),
    onSuccess: (page) => {
      queryClient.setQueryData(['page', pageId], page);
    },
  });
}

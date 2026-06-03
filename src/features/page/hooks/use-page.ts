import { getPage } from '@/features/page/api/ page.api';
import { useQuery } from '@tanstack/react-query';

export function usePage(pageId: string) {
  return useQuery({
    queryKey: ['page', pageId],
    queryFn: () => getPage(pageId),
    enabled: !!pageId,
  });
}

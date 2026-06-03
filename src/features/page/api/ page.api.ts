import { Page, UpdatePagePayload } from '@/features/page/types/page.type';
import { api } from '@/shared/lib/axios';

type ApiResponse<T> = {
  message: string;
  data: T;
};

export async function getPage(pageId: string): Promise<Page> {
  const res = await api.get<ApiResponse<Page>>(`/v1/pages/${pageId}`);
  return res.data.data;
}

export async function updatePage(
  pageId: string,
  payload: UpdatePagePayload,
): Promise<Page> {
  const res = await api.patch<ApiResponse<Page>>(
    `/v1/pages/${pageId}`,
    payload,
  );
  return res.data.data;
}

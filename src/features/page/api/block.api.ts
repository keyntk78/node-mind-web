import type {
  Block,
  CreateBlockPayload,
  UpdateBlockPayload,
} from '@/features/page/types/block.type';
import { api } from '@/shared/lib/axios';

type ApiResponse<T> = {
  message: string;
  data: T;
};

export async function createBlock(payload: CreateBlockPayload): Promise<Block> {
  const { pageId, ...restPayload } = payload;
  const res = await api.post<ApiResponse<Block>>(
    `/v1/pages/${pageId}/blocks`,
    restPayload,
  );

  return res.data.data;
}

export async function updateBlock(
  blockId: string,
  payload: UpdateBlockPayload,
): Promise<Block> {
  console.log('update', payload);

  const res = await api.patch<ApiResponse<Block>>(
    `/v1/blocks/${blockId}`,
    payload,
  );

  return res.data.data;
}

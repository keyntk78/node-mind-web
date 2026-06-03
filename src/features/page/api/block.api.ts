import type {
  Block,
  CreateBlockPayload,
  DeleteBlockResult,
  ReorderBlocksPayload,
  ReorderBlocksResult,
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
  const res = await api.patch<ApiResponse<Block>>(
    `/v1/blocks/${blockId}`,
    payload,
  );

  return res.data.data;
}

export async function reorderBlocks(
  pageId: string,
  payload: ReorderBlocksPayload,
): Promise<ReorderBlocksResult> {
  const res = await api.patch<ApiResponse<ReorderBlocksResult>>(
    `/v1/pages/${pageId}/blocks/reorder`,
    payload,
  );

  return res.data.data;
}

export async function deleteBlock(blockId: string): Promise<DeleteBlockResult> {
  const res = await api.delete<ApiResponse<DeleteBlockResult>>(
    `/v1/blocks/${blockId}`,
  );

  return res.data.data;
}

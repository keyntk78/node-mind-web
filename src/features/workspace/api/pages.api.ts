import axios from 'axios';

import { api } from '@/shared/lib/axios';
import type {
  CreatePagePayload,
  CreatePageResponse,
  PageChildrenParams,
  PageChildrenResponse,
} from '@/features/workspace/types/page.type';

type ApiErrorResponse = {
  message?: string;
  error?: string;
  code?: string;
};

export async function getPageChildren({
  workspaceId,
  parentId,
  limit = 50,
  cursor,
}: PageChildrenParams) {
  try {
    const { data } = await api.get<PageChildrenResponse>('v1/pages/children', {
      params: {
        workspaceId,
        parentId,
        limit,
        cursor,
      },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.code ||
        error.message;

      throw new Error(message);
    }

    throw error;
  }
}

export async function createPage(payload: CreatePagePayload) {
  try {
    const { data } = await api.post<CreatePageResponse>('v1/pages', payload);

    return data;
  } catch (error) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data?.code ||
        error.message;

      throw new Error(message);
    }

    throw error;
  }
}

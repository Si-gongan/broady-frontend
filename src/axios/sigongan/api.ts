import { getImageMetaData } from '@/library/media/getImageMetaData';
import { SigonganServer } from './setting';
import {
  IPostRegisterReturnType,
  IPostReturnType,
  IRequestAdditionalReturnType,
  IRequestImageToAiReturnType,
  IUserInfoReturnType,
} from './types';

export type SendTarget = 'ai' | 'comment';

export const sigonganUserInfoApi = async (token: string) => {
  return await SigonganServer.get<IUserInfoReturnType>('/sigongan-user/info', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const getPostListApi = async ({
  page,
  limit,
  search,
  token,
}: {
  page?: number;
  limit?: number;
  search?: string;
  token: string;
}) => {
  const queryString = `/sigongan-user/post${page ? `?page=${page}` : ''}${limit ? `&limit=${limit}` : ''}${
    search ? `&search=${search}` : ''
  }`;

  return await SigonganServer.get<IPostReturnType>(queryString, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const registerPostApi = async (
  input: string,
  url: string,
  deletedPostId: string | undefined,
  target: SendTarget,
  token: string
) => {
  let form = new FormData();

  const { name, type } = getImageMetaData(url);

  form.append('file', { uri: url, name, type });
  form.append('text', input);
  form.append('target', target);

  if (deletedPostId !== undefined) {
    console.log('should delete post id: ', deletedPostId);

    form.append('deletePostId', deletedPostId);
  }

  return await SigonganServer.post<IPostRegisterReturnType>('/sigongan-user/post', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${token}`,
    },
  });
};

export const readPostApi = async (postId: string, token: string) => {
  return await SigonganServer.get(`/sigongan-user/post/read?postId=${postId}`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const deletePostApi = async (postId: string, token: string) => {
  return await SigonganServer.delete(`/sigongan-user/post?postId=${postId}`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const addAditionalRequestApi = async (target: SendTarget, postId: string, chat: string, token: string) => {
  return await SigonganServer.post<IRequestAdditionalReturnType>(
    `/sigongan-user/post/chat`,
    {
      target,
      postId,
      chat,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const changePinStatusApi = async (postId: string, isPinned: boolean, token: string) => {
  return await SigonganServer.post(
    `/sigongan-user/post/pin`,
    {
      isPinned,
      postId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPinnedPostListApi = async (limit: number, page: number, token: string) => {
  return await SigonganServer.get(
    `/sigongan-user/post/pin
  ?${page && `page=${page}`}${limit && `&limit=${limit}`}
  `,
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const reportCommentApi = async (postId: string, chatId: string, reason: string, token: string) => {
  return await SigonganServer.post(
    `/report/to-comment`,
    {
      chatId,
      postId,
      reason,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const summaryPostApi = async (postId: string, token: string) => {
  return await SigonganServer.get<{
    statusCode: number;
    result: {
      summary: string;
    };
  }>(`/sigongan-user/post/summary?postId=${postId}`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

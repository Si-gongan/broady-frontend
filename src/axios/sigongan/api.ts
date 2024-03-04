import { SigonganServer } from './setting';
import { IPostRegisterReturnType, IPostReturnType } from './types';

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
  return await SigonganServer.get<IPostReturnType>(
    `/sigongan-user/post?${page && `page=${page}`}${limit && `&limit=${limit}`}${search && `&search=${search}`}
  }`,
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const registerPostApi = async (input: string, url: string, deletedPostId: string | undefined, token: string) => {
  let form = new FormData();

  const filename = url.split('/').pop() || '';
  const match = /\.(\w+)$/.exec(filename ?? '');
  const type = match ? `image/${match[1]}` : 'image';

  form.append('file', { uri: url, name: filename, type });
  form.append('text', input);
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

export const addAditionalRequestApi = async (postId: string, chat: string, token: string) => {
  return await SigonganServer.post(
    `/sigongan-user/post/chat`,
    {
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

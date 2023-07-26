import { Server } from '../setting';
import { IRequestListReturnType } from './types';

import FormData from 'form-data';

export const GetRequestList = async (fcmToken: string) => {
  return await Server.get<IRequestListReturnType>('/post/user', {
    headers: {
      fcmToken,
      authorization: 0,
    },
  });
};

export const RegisterRequest = async (text: string, fileUri: string, fcmToken: string) => {
  const localUri = fileUri;
  const filename = localUri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename ?? '');
  const type = match ? `image/${match[1]}` : `image`;

  const formData = new FormData();
  formData.append('file', { uri: fileUri, name: filename, type });
  formData.append('text', text);

  return await Server.post('/post/user', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      fcmToken,
      authorization: 0,
    },
  });
};

export const AddQuestion = async (postId: string, text: string, fcmToken: string) => {
  return await Server.put(
    '/post/user',
    {
      postId,
      text,
    },
    {
      headers: {
        fcmToken,
        authorization: 0,
      },
    }
  );
};

export const AddThanks = async (postId: string, answerId: string, fcmToken: string) => {
  return await Server.post(
    '/post/appreciate',
    {
      postId,
      answerId,
    },
    {
      headers: {
        fcmToken,
        authorization: 0,
      },
    }
  );
};

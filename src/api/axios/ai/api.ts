import FormData from 'form-data';
import { AIServer, Server } from '../setting';
import { IGetChatListReturnType } from './types';

export const GetChatList = async (fcmToken: string) => {
  return await Server.get<IGetChatListReturnType>('/aichat', {
    headers: {
      fcmToken,
      authorization: 0,
    },
  });
};

export const PostTextQuestion = async (chatId: string | null, text: string, fcmToken: string) => {
  return await Server.post(
    '/aichat/text',
    {
      chatId,
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

export const PostImageQuestion = async (chatId: string | null, fileUri: string, fcmToken: string) => {
  const localUri = fileUri;
  const filename = localUri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename ?? '');
  const type = match ? `image/${match[1]}` : `image`;

  const formData = new FormData();
  formData.append('file', { uri: fileUri, name: filename, type });
  formData.append('chatId', chatId);

  return await Server.post('/aichat/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      fcmToken,
      authorization: 0,
    },
  });
};

export const GetRequestType = async (messages: string[]) => {
  return await AIServer.post('/requesttype', {
    messages,
  });
};

export const getCorrectText = async (text: string) => {
  const result = await AIServer.post('/correction', {
    text,
  });
  return result.data.correction;
};

export const GetRequestSummary = async (messages: string[]) => {
  return await AIServer.post('/request-desc', {
    messages,
  });
};

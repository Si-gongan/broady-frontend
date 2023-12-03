import FormData from 'form-data';
import { AIServer, Server } from '../setting';
import { IGetChatListReturnType } from './types';
import axios from 'axios';

export const GetChatList = async (fcmToken: string) => {
  return await axios.get(process.env.EXPO_PUBLIC_API_SERVER_URL + '/aichat', {headers: {
    fcmToken,
    authorization: 0,
  }})
  // const response = await Server.get<IGetChatListReturnType>('/aichat', {
  //   headers: {
  //     fcmToken,
  //     authorization: 0,
  //   },
  // })
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
  return await axios.post(process.env.EXPO_PUBLIC_AI_API_SERVER_URL + '/request-desc', {
    messages,
  });
};

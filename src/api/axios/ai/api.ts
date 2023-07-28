import { AIServer } from '../setting';
import { IMessageType, ImageChatReturnType } from './types';

export const PostQuestion = async (messages: IMessageType[], data: object | null) => {
  return await AIServer.post<ImageChatReturnType>('/imagechat', {
    messages,
    data,
  });
};

export const getCorrectText = async (text: string) => {
  const result = await AIServer.post('/correction', {
    text,
  });
  return result.data.correction;
};

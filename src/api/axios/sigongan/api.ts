import { Server } from '../setting';
import { IRequestListReturnType } from './types';

export const GetRequestList = async (fcmToken: string) => {
  return await Server.get<IRequestListReturnType>('/post/user', {
    headers: {
      fcmToken,
      authorization: 0,
    },
  });
};

import { Server } from './setting';

export const getRequestList = async (fcmToken: string, token: string) => {
  return await Server.get('/post', { headers: { fcmToken, Authorization: token } });
};

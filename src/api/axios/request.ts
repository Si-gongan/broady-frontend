import { Server } from './setting';

export const getRequestAll = async (fcmToken: string, token: string) => {
  return await Server.get('/post', { headers: { fcmToken, Authorization: token } });
};

export const getRequest = async (id: string, fcmToken: string, token: string) => {
  return await Server.get(`/post/${id}`, { headers: { fcmToken, Authorization: token } });
};

export const getWritingRequest = async (id: string, fcmToken: string, token: string) => {
  return await Server.get(`/post/proceed`, { headers: { fcmToken, Authorization: token } });
};

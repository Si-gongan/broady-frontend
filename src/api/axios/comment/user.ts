import { Server } from '../setting';
import { ReturnPointListType } from './types';

export const getPointList = async (fcmToken: string, token: string) => {
  const result = await Server.get<ReturnPointListType>('/user/point', { headers: { fcmToken, Authorization: token } });
  return result.data.result.pointHistories;
};

export const requestRefundPoint = async (point: number, accountNumber: string, fcmToken: string, token: string) => {
  const result = await Server.post(
    '/user/point',
    { point, accountNumber },
    { headers: { fcmToken, Authorization: token } }
  );
  return result.data;
};

export const reportPost = async (postId: string, fcmToken: string, token: string) => {
  const result = await Server.post(`/user/post/${postId}`, { postId }, { headers: { fcmToken, Authorization: token } });
  return result.data;
};

export const reportUser = async (userId: string, fcmToken: string, token: string) => {
  const result = await Server.post(`/user/report`, { userId }, { headers: { fcmToken, Authorization: token } });
  return result.data;
};

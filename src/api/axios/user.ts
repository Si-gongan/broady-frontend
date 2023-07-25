import { Server } from './setting';
import { ReturnPointListType } from './types';

export const getPointList = async (fcmToken: string, token: string) => {
  const result = await Server.get<ReturnPointListType>('/user/point', { headers: { fcmToken, Authorization: token } });
  return result.data.result.pointHistories;
};

export const requestRefundPoint = async (point: number, fcmToken: string, token: string) => {
  const result = await Server.post<ReturnPointListType>(
    '/user/point',
    { point },
    { headers: { fcmToken, Authorization: token } }
  );
  return result;
};

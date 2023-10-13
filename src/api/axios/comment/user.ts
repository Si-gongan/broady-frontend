import { CommentServer } from './setting';
import { ReportImageType, ReportListType, ReportRequestType, ReturnPointListType } from './types';

export const getPointList = async (fcmToken: string, token: string) => {
  const result = await CommentServer.get<ReturnPointListType>('/user/point', {
    headers: { fcmToken, Authorization: token },
  });
  return result.data.result.pointHistories;
};

export const requestRefundPoint = async (
  point: number,
  accountNumber: string,
  accountName: string,
  fcmToken: string,
  token: string
) => {
  const result = await CommentServer.post(
    '/user/point',
    { point, accountNumber, accountName },
    { headers: { fcmToken, Authorization: token } }
  );
  return result.data;
};

export const blockPost = async (postId: string, fcmToken: string, token: string) => {
  const result = await CommentServer.post(
    `/user/post/${postId}`,
    { postId },
    { headers: { fcmToken, Authorization: token } }
  );
  return result.data;
};

export const reportUser = async (userId: string, fcmToken: string, token: string) => {
  const result = await CommentServer.post(`/user/report`, { userId }, { headers: { fcmToken, Authorization: token } });
  return result.data;
};

export const getReportList = async (fcmToken: string, token: string) => {
  const result = await CommentServer.get<ReportListType>(`/user/report`, {
    headers: { fcmToken, Authorization: token },
  });
  return result.data.result.reports;
};

export const reportRequest = async (
  postId: string,
  type: string,
  reason: string,
  text: string,
  userId: string | null,
  fcmToken: string,
  token: string
) => {
  const result = await CommentServer.post<ReportRequestType>(
    `/report/post`,
    { postId, type, reason, text, userId },
    { headers: { fcmToken, Authorization: token } }
  );
  return result.data;
};

export const reportImage = async (postId: string, type: string, reason: string, fcmToken: string, token: string) => {
  const result = await CommentServer.post<ReportImageType>(
    `/report/message`,
    { postId, type, reason },
    { headers: { fcmToken, Authorization: token } }
  );
  return result.data;
};

export const deleteUser = async (fcmToken: string, token: string) => {
  const result = await CommentServer.delete(`/user`, { headers: { fcmToken, Authorization: token } });
  return result.data;
};

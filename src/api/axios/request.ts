import {
  RequestAllReturnType,
  RequestReturnType,
  ProceedRequestReturnType,
  CompletedRequestReturnType,
  startCommentReturnType,
  endCommentReturnType,
} from '.';
import { Server } from './setting';

export const getRequestAll = async (fcmToken: string, token: string) => {
  return await Server.get<RequestAllReturnType>('/post', { headers: { fcmToken, Authorization: token } });
};

export const getRequest = async (id: string, fcmToken: string, token: string) => {
  return await Server.get<RequestReturnType>(`/post/${id}`, {
    params: { id },
    headers: { fcmToken, Authorization: token },
  });
};

export const getProceedRequest = async (fcmToken: string, token: string) => {
  return await Server.get<ProceedRequestReturnType>(`/post/proceed`, { headers: { fcmToken, Authorization: token } });
};

export const getCompletedRequest = async (fcmToken: string, token: string) => {
  return await Server.get<CompletedRequestReturnType>(`/post/completed`, {
    headers: { fcmToken, Authorization: token },
  });
};

export const startComment = async (postId: string, fcmToken: string, token: string) => {
  return await Server.put<startCommentReturnType>(
    `/post/start`,
    { postId },
    { headers: { fcmToken, Authorization: token } }
  );
};

export const endComment = async (postId: string, text: string, fcmToken: string, token: string) => {
  return await Server.post<endCommentReturnType>(
    `/post/start`,
    { postId, text },
    { headers: { fcmToken, Authorization: token } }
  );
};

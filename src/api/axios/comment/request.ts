import {
  RequestAllReturnType,
  RequestReturnType,
  ProceedRequestReturnType,
  CompletedRequestReturnType,
  startCommentReturnType,
  endCommentReturnType,
} from '..';
import { Server } from '../setting';

export const getRequestAll = async (fcmToken: string, token: string) => {
  const result = await Server.get<RequestAllReturnType>('/post', { headers: { fcmToken, Authorization: token } });
  return result.data.result.posts;
};

export const getRequest = async (id: string, fcmToken: string, token: string) => {
  const result = await Server.get<RequestReturnType>(`/post/detail/${id}`, {
    params: { id },
    headers: { fcmToken, Authorization: token },
  });
  return result.data.result.post;
};

export const getProceedRequest = async (fcmToken: string, token: string) => {
  const result = await Server.get<ProceedRequestReturnType>(`/post/proceed`, {
    headers: { fcmToken, Authorization: token },
  });

  return result.data.result.proceedingPosts;
};

export const getCompletedRequest = async (fcmToken: string, token: string) => {
  const result = await Server.get<CompletedRequestReturnType>(`/post/completed`, {
    headers: { fcmToken, Authorization: token },
  });

  return result.data.result.completedPosts;
};

export const startComment = async (postId: string, fcmToken: string, token: string) => {
  const result = await Server.put<startCommentReturnType>(
    `/post/start`,
    { postId },
    { headers: { fcmToken, Authorization: token } }
  );
  return result.data;
};

export const endComment = async (postId: string, text: string, fcmToken: string, token: string) => {
  const result = await Server.post<RequestReturnType>(
    `/post/answer`,
    { postId, text },
    { headers: { fcmToken, Authorization: token } }
  );
  return result.data.result.post;
};

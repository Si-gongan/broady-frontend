import { CommentServer } from '../setting';
import type {
  RequestAllReturnType,
  RequestReturnType,
  ProceedRequestReturnType,
  CompletedRequestReturnType,
  startCommentReturnType,
  RequestCountType,
} from '../types';

export const getRequestCounts = async (fcmToken: string, token: string) => {
  const result = await CommentServer.get<RequestCountType>('/post/accumulate', {
    headers: { fcmToken, Authorization: token },
  });
  return result.data.result;
};

export const getRequestAll = async (fcmToken: string, token: string) => {
  const result = await CommentServer.get<RequestAllReturnType>('/post', {
    headers: { fcmToken, Authorization: token },
  });
  return result.data.result.posts;
};

export const getRequest = async (id: string, fcmToken: string, token: string) => {
  const result = await CommentServer.get<RequestReturnType>(`/post/detail/${id}`, {
    params: { id },
    headers: { fcmToken, Authorization: token },
  });
  return result.data.result.post;
};

export const getProceedRequest = async (fcmToken: string, token: string) => {
  const result = await CommentServer.get<ProceedRequestReturnType>(`/post/proceed`, {
    headers: { fcmToken, Authorization: token },
  });

  return result.data.result.proceedingPosts;
};

export const getCompletedRequest = async (fcmToken: string, token: string) => {
  const result = await CommentServer.get<CompletedRequestReturnType>(`/post/completed`, {
    headers: { fcmToken, Authorization: token },
  });

  return result.data.result.completedPosts;
};

export const getMyRequestAll = async (fcmToken: string, token: string) => {
  const result = await CommentServer.get<CompletedRequestReturnType>(`/post/all`, {
    headers: { fcmToken, Authorization: token },
  });

  return result.data.result.completedPosts;
};

export const startComment = async (postId: string, fcmToken: string, token: string) => {
  const result = await CommentServer.put<startCommentReturnType>(
    `/post/start`,
    { postId },
    { headers: { fcmToken, Authorization: token } }
  );
  return result.data;
};

export const endComment = async (postId: string, text: string, fcmToken: string, token: string) => {
  const result = await CommentServer.post<RequestReturnType>(
    `/post/answer`,
    { postId, text },
    { headers: { fcmToken, Authorization: token } }
  );
  return result.data.result.post;
};

export const stopComment = async (postId: string, fcmToken: string, token: string) => {
  const result = await CommentServer.put(`/post/stop`, { postId }, { headers: { fcmToken, Authorization: token } });
  return result.data;
};

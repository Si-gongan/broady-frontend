import { CommentServer } from './setting';

export const storeFcmToken = async (fcmToken: string, token: string) => {
  return await CommentServer.post(
    '/store/fcmtoken',
    {
      fcmToken,
    },
    {
      headers: { fcmToken, Authorization: token },
    }
  );
};

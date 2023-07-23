import { Server } from './setting';

export const Login = (id: string, password: string) => {
  const fcmToken = '';

  Server.post(
    '/user/login',
    { id, password },
    {
      headers: {
        fcmToken,
      },
    }
  );
};

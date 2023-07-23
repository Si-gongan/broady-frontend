import { useRecoilValue } from 'recoil';
import { Server } from './setting';
import { fcmTokenState } from '../../states';

export const Login = async (id: string, password: string, fcmToken: string) => {
  return await Server.post(
    '/user/login',
    { id, password },
    {
      headers: {
        fcmToken,
      },
    }
  );
};

export const Register = async (email: string, password: string, fcmToken: string) => {
  return await Server.post(
    '/user/signup',
    { email, password, fcmToken },
    {
      headers: {
        fcmToken,
      },
    }
  );
};

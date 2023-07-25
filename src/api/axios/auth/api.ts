import { Server } from '../setting';
import { ILoginReturnType } from './types';

export const Login = async (id: string, password: string, fcmToken: string) => {
  return await Server.post<ILoginReturnType>(
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

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

export const CheckNickname = async (nickname: string, fcmToken: string) => {
  return await Server.get(`/user/duplicate/nickname/${nickname}`, {
    headers: {
      fcmToken,
    },
  });
};

export const PutNickname = async (nickname: string, fcmToken: string, authToken: string) => {
  return await Server.put(
    `/user/nickname`,
    { nickname },
    {
      headers: {
        fcmToken,
        authorization: authToken,
      },
    }
  );
};

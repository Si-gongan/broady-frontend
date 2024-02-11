import { AuthServer } from './setting';
import type { ILoginReturnType } from './types';

export const Login = async (id: string, password: string, fcmToken: string) => {
  return await AuthServer.post<ILoginReturnType>(
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
  return await AuthServer.post(
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
  return await AuthServer.get(`/user/duplicate/nickname/${nickname}`, {
    headers: {
      fcmToken,
    },
  });
};

export const PutNickname = async (nickname: string, fcmToken: string, authToken: string) => {
  return await AuthServer.put(
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

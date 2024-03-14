import { ICommentUser, ISigonganUser } from '@/@types/user';
import { AuthServer } from './setting';
import { ICommentRegisterReturnType, ISigonganRegisterReturnType } from './types';

export const LoginToSigongan = async (email: string, password: string, fcmToken: string) => {
  return await AuthServer.post('/sigongan-user/signin', { email, password, fcmToken }, {});
};

export const LoginToComment = async (email: string, password: string, fcmToken: string) => {
  return await AuthServer.post<{
    statusCode: number;
  }>('/comment-user/signin', { email, password, fcmToken });
};

export const RegisterToSigongan = async (email: string, password: string, fcmToken: string) => {
  return await AuthServer.post<ISigonganRegisterReturnType>('/sigongan-user/signup', { email, password, fcmToken });
};

export const RegisterToComment = async (email: string, password: string, fcmToken: string) => {
  return await AuthServer.post<ICommentRegisterReturnType>('/comment-user/signup', { email, password, fcmToken });
};

export const CheckNickname = async (nickname: string, token: string) => {
  return await AuthServer.get<{
    statusCode: number;
    result: {
      isPossible: boolean;
    };
  }>(
    `/nickname/check?nickname=${nickname}
  `,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const SetNickname = async (nickname: string, token: string) => {
  return await AuthServer.put<{
    statusCode: number;
    result:
      | {
          sigonganUser: ISigonganUser;
        }
      | {
          commentUser: ICommentUser;
        };
  }>(
    '/nickname',
    { nickname },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
};

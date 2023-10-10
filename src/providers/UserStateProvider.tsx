import { createContext, useState, useMemo, useCallback, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

import { AUTH_TOKEN, USER_STATE, getData, storeData, removeData, NICKNAME } from '../components/common/async-storage';

import { useRecoilState } from 'recoil';
import { authTokenState, nicknameState } from '../states';
import { delay } from '../components/renewal';
import { CheckNickname, PutNickname } from '../api/axios';

/**
 * @description
 * unLogin: 로그인 되지 않은 상태
 * Sigongan: 시각장애인
 * Comment: 해설가
 *
 * 이름 고민 필요할듯
 */
type UserState = 'unLogin' | 'Sigongan' | 'Comment';

const UserStateContext = createContext<{
  userState: UserState;
  changeUserState: (userState: UserState) => void;
  loginToComment: (token: string, nickname: string | null) => Promise<void>;
  loginToSigongan: (nickname: string) => void;
  changeNickname: (type: UserState, nickname: string, fcmToken?: string, authToken?: string) => Promise<void>;
  logout: () => void;
} | null>(null);

export const UserStateProvider = ({ children }: { children: ReactNode }) => {
  const [userState, setUserState] = useState<UserState>('unLogin');

  const [, setAuthToken] = useRecoilState(authTokenState);
  const [, setNickname] = useRecoilState(nicknameState);

  useEffect(() => {
    (async () => {
      const prevUserState = await getData(USER_STATE);

      if (prevUserState === 'Comment') {
        const authToken = await getData(AUTH_TOKEN);
        const nickname = await getData(NICKNAME);

        setAuthToken(authToken ?? '');
        setNickname(nickname ?? '');
        setUserState('Comment');
      }

      if (prevUserState === 'Sigongan') {
        const nickname = await getData(NICKNAME);

        setNickname(nickname ?? '');
        setUserState('Sigongan');
      }
    })();
  }, []);

  const changeUserState = useCallback((userState: UserState) => {
    setUserState(userState);
  }, []);

  const loginToComment = useCallback(async (token: string, nickname: string | null) => {
    storeData(AUTH_TOKEN, token);
    setAuthToken(token);

    storeData(NICKNAME, nickname ?? '');
    setNickname(nickname ?? '');

    await delay(500);

    storeData(USER_STATE, 'Comment');
    setUserState('Comment');
  }, []);

  const loginToSigongan = useCallback((nickname: string) => {
    storeData(NICKNAME, nickname);
    setNickname(nickname);

    storeData(USER_STATE, 'Sigongan');
    setUserState('Sigongan');
  }, []);

  const changeNickname = useCallback(
    async (type: UserState, nickname: string, fcmToken?: string, authToken?: string) => {
      if (type === 'Sigongan') {
        storeData(NICKNAME, nickname);
        setNickname(nickname);
        return;
      }

      if (type === 'Comment') {
        await CheckNickname(nickname, fcmToken ?? '');
        await PutNickname(nickname, fcmToken ?? '', authToken ?? '');

        storeData(NICKNAME, nickname);
        setNickname(nickname);

        return;
      }
    },
    []
  );

  const logout = useCallback(() => {
    removeData(USER_STATE);
    setUserState('unLogin');

    removeData(AUTH_TOKEN);
    setAuthToken('');

    removeData(NICKNAME);
    setNickname('');
  }, []);

  const context = useMemo(
    () => ({ userState, changeUserState, loginToComment, loginToSigongan, changeNickname, logout }),
    [userState, changeUserState, loginToComment, loginToSigongan, changeNickname, logout]
  );

  return <UserStateContext.Provider value={context}>{children}</UserStateContext.Provider>;
};

export const useUserState = () => {
  const context = useContext(UserStateContext);

  if (!context) {
    throw new Error('useUserState must be used within a UserStateProvider');
  }

  return context;
};

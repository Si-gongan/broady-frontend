import { createContext, useState, useMemo, useCallback, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

import { AUTH_TOKEN, USER_STATE, getData, storeData, removeData, NICKNAME } from '../components/common/async-storage';

import { useRecoilState } from 'recoil';
import { authTokenState, nicknameState } from '../states';
import { delay } from '../components/renewal';

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
  changeNickname: (nickname: string) => void;
  logout: () => void;
} | null>(null);

export const UserStateProvider = ({ children }: { children: ReactNode }) => {
  const [, setAuthToken] = useRecoilState(authTokenState);
  const [, setNickname] = useRecoilState(nicknameState);
  const [userState, setUserState] = useState<UserState>('unLogin');

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

  const changeNickname = useCallback((nickname: string) => {
    storeData(NICKNAME, nickname);
    setNickname(nickname);
  }, []);

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

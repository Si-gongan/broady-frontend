import { createContext, useState, useMemo, useCallback, useContext, useEffect, type ReactNode } from 'react';
import { useRecoilState } from 'recoil';

import { authTokenState } from '../states';
import { AUTH_TOKEN_KEY, USER_STATE_KEY, delay, getData, removeData, storeData } from '../library';

/**
 * @description
 * unLogin: 로그인 되지 않은 상태
 * Sigongan: 시각장애인
 * Comment: 해설가
 */
type UserState = 'unLogin' | 'Sigongan' | 'Comment';

const UserStateContext = createContext<{
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
  login: (authToken: string, userState: UserState) => void;
  logout: () => void;
} | null>(null);

export const UserStateProvider = ({ children }: { children: ReactNode }) => {
  const [userState, setUserState] = useState<UserState>('unLogin');
  const [, setAuthToken] = useRecoilState(authTokenState);

  // initial load
  useEffect(() => {
    (async () => {
      const prevUserState = await getData(USER_STATE_KEY);

      const authToken = await getData(AUTH_TOKEN_KEY);

      setAuthToken(authToken ?? '');

      if (prevUserState !== 'Comment' && prevUserState !== 'Sigongan') {
        setUserState('unLogin');
        return;
      }

      setUserState(prevUserState);
    })();
  }, []);

  // const loginToComment = useCallback(async (authToken: string) => {
  //   storeData(AUTH_TOKEN_KEY, authToken);
  //   setAuthToken(authToken);

  //   // 가끔 토큰이 늦게 들어가서 401 에러가 발생하는 경우가 있어서 0.5초 지연
  //   await delay(500);

  //   storeData(USER_STATE_KEY, 'Comment');
  //   setUserState('Comment');
  // }, []);

  // const loginToSigongan = useCallback(() => {
  //   storeData(USER_STATE_KEY, 'Sigongan');
  //   setUserState('Sigongan');
  // }, []);

  const login = useCallback(async (authToken: string, userState: UserState) => {
    // storeData(AUTH_TOKEN_KEY, authToken);
    setAuthToken(authToken);
  }, []);

  const logout = useCallback(() => {
    removeData(USER_STATE_KEY);
    setUserState('unLogin');

    removeData(AUTH_TOKEN_KEY);
    setAuthToken('');
  }, []);

  const context = useMemo(() => ({ userState, setUserState, login, logout }), [userState, login, logout, setUserState]);

  return <UserStateContext.Provider value={context}>{children}</UserStateContext.Provider>;
};

export const useUserState = () => {
  const context = useContext(UserStateContext);

  if (!context) {
    throw new Error('useUserState must be used within a UserStateProvider');
  }

  return context;
};

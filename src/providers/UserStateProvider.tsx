import { createContext, useState, useMemo, useCallback, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AUTH_TOKEN, USER_STATE, getData, storeData, removeData } from '../components/common/async-storage';
import { useRecoilState } from 'recoil';
import { authTokenState } from '../states';

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
  loginToComment: (token: string) => void;
  loginToSigongan: () => void;
  logout: () => void;
} | null>(null);

export const UserStateProvider = ({ children }: { children: ReactNode }) => {
  const [, setAuthToken] = useRecoilState(authTokenState);
  const [userState, setUserState] = useState<UserState>('unLogin');

  useEffect(() => {
    (async () => {
      const prevUserState = await getData(USER_STATE);

      if (prevUserState === 'Comment') {
        const authToken = await getData(AUTH_TOKEN);

        setAuthToken(authToken ?? '');
        setUserState('Comment');
      }

      if (prevUserState === 'Sigongan') {
        setUserState('Sigongan');
      }
    })();
  }, []);

  const changeUserState = useCallback((userState: UserState) => {
    setUserState(userState);
  }, []);

  const loginToComment = useCallback((token: string) => {
    storeData(AUTH_TOKEN, token);
    setAuthToken(token);

    storeData(USER_STATE, 'Comment');
    setUserState('Comment');
  }, []);

  const loginToSigongan = useCallback(() => {
    storeData(USER_STATE, 'Sigongan');
    setUserState('Sigongan');
  }, []);

  const logout = useCallback(() => {
    removeData(USER_STATE);
    removeData(AUTH_TOKEN);

    setUserState('unLogin');
  }, []);

  const context = useMemo(
    () => ({ userState, changeUserState, loginToComment, loginToSigongan, logout }),
    [userState, changeUserState, loginToComment, loginToSigongan, logout]
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

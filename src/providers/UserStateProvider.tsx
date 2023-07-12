import { createContext, useState, useMemo, useCallback, useContext } from 'react';
import type { ReactNode } from 'react';

/**
 * @description
 * unLogin: 로그인 되지 않은 상태
 * Sigongan: 시각장애인
 * Commentary: 해설가
 *
 * 이름 고민 필요할듯
 */
type UserState = 'unLogin' | 'Sigongan' | 'Comment';

const UserStateContext = createContext<{
  userState: UserState;
  changeUserState: (userState: UserState) => void;
} | null>(null);

export const UserStateProvider = ({ children }: { children: ReactNode }) => {
  // const [userState, setUserState] = useState<UserState>('unLogin');
  const [userState, setUserState] = useState<UserState>('Sigongan');

  const changeUserState = useCallback((userState: UserState) => {
    setUserState(userState);
  }, []);

  const context = useMemo(() => ({ userState, changeUserState }), [userState, changeUserState]);

  return <UserStateContext.Provider value={context}>{children}</UserStateContext.Provider>;
};

export const useUserState = () => {
  const context = useContext(UserStateContext);

  if (!context) {
    throw new Error('useUserState must be used within a UserStateProvider');
  }

  return context;
};

import { ISigonganUser, TloginFromState } from '@/@types/user';
import { atom } from 'recoil';

// for auth
export const fcmTokenState = atom({
  key: `fcmTokenState${Math.random()}`,
  default: '',
});

export const authTokenState = atom({
  key: `authTokenState${Math.random()}`,
  default: '',
});

export const loginFromState = atom<TloginFromState>({
  key: `loginFromState${Math.random()}`,
  default: null,
});

export const SigonganUserState = atom<ISigonganUser | null>({
  key: `SigonganUserState${Math.random()}`,
  default: null,
});

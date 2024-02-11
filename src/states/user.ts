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

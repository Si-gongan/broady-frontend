import { atom } from 'recoil';

export const fcmTokenState = atom({
  key: 'fcmTokenState',
  default: '',
});

export const authTokenState = atom({
  key: 'authTokenState',
  default: '',
});

export const accountState = atom({
  key: 'accountState',
  default: '',
});

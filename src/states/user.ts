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

export const nicknameState = atom({
  key: `nicknameState${Math.random()}`,
  default: '',
});

// for comment
export const accountState = atom({
  key: `accountState${Math.random()}`,
  default: '',
});

export const myPointState = atom({
  key: `myPointState${Math.random()}`,
  default: 0,
});

// 예금주
export const accountHolderState = atom({
  key: `accountHolderState${Math.random()}`,
  default: '',
});

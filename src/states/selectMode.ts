import { atom } from 'recoil';

export const selectModeAtom = atom<boolean>({
  key: 'selectMode',
  default: false,
});

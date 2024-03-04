import { atom } from 'recoil';

export const fromDeletedPostIdAtom = atom<string | undefined>({
  key: 'fromDeletedPostId',
  default: '',
});

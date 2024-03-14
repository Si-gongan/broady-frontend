import { atom } from 'recoil';

export const reportModalState = atom({
  key: 'reportModalState',
  default: {
    visible: false,
    chatId: '',
  },
});

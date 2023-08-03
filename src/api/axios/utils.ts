import { Alert } from 'react-native';

export const setFcmTokenHeader = () => {
  1;
};

export const NoticeError = () => {
  Alert.alert('알림', '일시적인 오류가 발생했습니다.', [
    {
      text: '확인',
      style: 'default',
    },
  ]);
};

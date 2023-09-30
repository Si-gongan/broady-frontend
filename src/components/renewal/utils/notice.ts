import { Alert } from 'react-native';

export const Notice = (message: string) => {
  Alert.alert('알림', message, [
    {
      text: '확인',
      style: 'default',
    },
  ]);
};

export const NoticeError = () => {
  Alert.alert('알림', '일시적인 오류가 발생했습니다.', [
    {
      text: '확인',
      style: 'default',
    },
  ]);
};

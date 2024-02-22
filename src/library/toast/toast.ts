import Toast from 'react-native-toast-message';

export const showInfoToast = (message: string) => {
  Toast.show({
    type: 'info',
    text1: message,
  });
};

export const showSuccessToast = (message: string) => {
  Toast.show({
    type: 'success',
    text1: message,
  });
};

export const showErrorToast = (message: string) => {
  Toast.show({
    type: 'error',
    text1: message,
  });
};

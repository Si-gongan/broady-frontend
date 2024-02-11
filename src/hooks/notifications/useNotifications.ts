import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { registerForPushNotificationsAsync } from '../../library';
import { fcmTokenState } from '../../states';

const DEVELOPMENT_DEVICE_TOKEN = 'development';

export const useNotifications = () => {
  const [, setFcmToken] = useRecoilState(fcmTokenState);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setFcmToken(token?.data ?? DEVELOPMENT_DEVICE_TOKEN);
    });
  }, []);
};

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { registerForPushNotificationsAsync } from '../lib';
import { fcmTokenState } from '../../../../states';

export const useNotifications = () => {
  const [, setFcmToken] = useRecoilState(fcmTokenState);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setFcmToken(token?.data ?? 'development');
    });
  }, []);
};

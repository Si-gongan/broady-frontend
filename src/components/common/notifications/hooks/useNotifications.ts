import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { registerForPushNotificationsAsync } from '../lib';
import { fcmTokenState } from '../../../../states';

export const useNotifications = () => {
  const [, setRequestList] = useRecoilState(fcmTokenState);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setRequestList(token);
    });
  }, []);
};

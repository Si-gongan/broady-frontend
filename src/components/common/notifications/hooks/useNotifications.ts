import { useState, useRef, useEffect } from 'react';
import * as Notifications from 'expo-notifications';

import { storeData } from '../../async-storage';
import { registerForPushNotificationsAsync } from '../lib';

export const useNotifications = () => {
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      // TODO: recoil atom에 저장
    });
  }, []);
};

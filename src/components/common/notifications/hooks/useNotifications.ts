import { useState, useRef, useEffect } from 'react';
import * as Notifications from 'expo-notifications';

import { registerForPushNotificationsAsync } from '../lib';

export const useNotifications = () => {
  // TODO: token 영구 저장
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      console.log('token', token);
    });
  }, []);
};

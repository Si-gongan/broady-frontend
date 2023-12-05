import { useRef } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RecoilRoot } from 'recoil';
import { useFonts } from 'expo-font';

import { AuthStack, SigonganStack, CommentStack } from './navigations';
import { LoadingProvider, UserStateProvider, useUserState } from './providers';

import { initializeNotifications, useNotifications } from './components/common/notifications';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { CommentServer } from './api/axios/comment/setting';
import { AxiosError } from 'axios';
import { useState } from 'react';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

ReceiveSharingIntent.getReceivedFiles(
  (files: any) => {
    // files returns as JSON Array example
    //[{ filePath: null, text: null, weblink: null, mimeType: null, contentUri: null, fileName: null, extension: null }]
    Alert.alert('성공');
    console.log('success', files);
  },
  (error: any) => {
    Alert.alert('실패');
    console.log('error', error);
  },
  'ShareMedia' // share url protocol (must be unique to your app, suggest using your apple bundle id)
);

initializeNotifications();

const Main = () => {
  const [fontsLoaded] = useFonts({
    ABeeZee: require('../assets/font/ABeeZee-Regular.ttf'),
    Inter: require('../assets/font/Inter-Regular.ttf'),
    'Inter-Bold': require('../assets/font/Inter-SemiBold.ttf'),
  });
  const { userState, logout } = useUserState();

  // alert 중복 방지
  const isErrorAlertRef = useRef(false);

  useNotifications();

  // TODO: splash screen
  if (!fontsLoaded) {
    return null;
  }

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  // 토큰 만료 처리
  CommentServer.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      try {
        const response = error.response;
        const status = response?.status;

        if (status === 401 && !isErrorAlertRef.current) {
          isErrorAlertRef.current = true;
          Alert.alert('세션 만료', '다시 로그인 해주세요.', [
            {
              text: '확인',
              onPress: () => (isErrorAlertRef.current = false),
            },
          ]);

          logout();
          return Promise.reject(error);
        }
      } catch {
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );

  return (
    <NavigationContainer theme={navTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {userState === 'unLogin' && <AuthStack />}
        {userState === 'Sigongan' && <SigonganStack />}
        {userState === 'Comment' && <CommentStack />}

        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export const App = () => {
  return (
    <RecoilRoot>
      <UserStateProvider>
        <LoadingProvider>
          <RootSiblingParent>
            <Main />
          </RootSiblingParent>
        </LoadingProvider>
      </UserStateProvider>
    </RecoilRoot>
  );
};

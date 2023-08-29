import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RecoilRoot } from 'recoil';
import { useFonts } from 'expo-font';

import { AuthStack, SigonganStack, CommentStack } from './navigations';
import { UserStateProvider, useUserState } from './providers';

import { initializeNotifications, useNotifications } from './components/common/notifications';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { CommentServer } from './api/axios/comment/setting';
import { AxiosError } from 'axios';

initializeNotifications();

const Main = () => {
  const [fontsLoaded] = useFonts({
    ABeeZee: require('../assets/font/ABeeZee-Regular.ttf'),
    Inter: require('../assets/font/Inter-Regular.ttf'),
    'Inter-Bold': require('../assets/font/Inter-SemiBold.ttf'),
  });
  const { userState, logout } = useUserState();

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

        if (status === 401) {
          Alert.alert('세션 만료', '다시 로그인 해주세요.');
          return logout();
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
        <RootSiblingParent>
          <Main />
        </RootSiblingParent>
      </UserStateProvider>
    </RecoilRoot>
  );
};

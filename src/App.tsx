import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RecoilRoot } from 'recoil';

import { AuthStack, SigonganStack, CommentStack } from './navigations';
import { LoadingProvider, UserStateProvider, useUserState } from './providers';

import { initializeNotifications, useNotifications } from './components/common/notifications';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';

import { useGetShare, useCommentAuth, useFont } from './hooks';

// fcm 초기화
initializeNotifications();

const Main = () => {
  // fcm 세팅
  useNotifications();

  // 외부->내부 공유
  useGetShare();

  // 401 에러 관리 (해설자)
  useCommentAuth();

  const { userState } = useUserState();

  const fontsLoaded = useFont();

  // TODO: splash screen
  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {userState === 'unLogin' && <AuthStack />}
      {userState === 'Sigongan' && <SigonganStack />}
      {userState === 'Comment' && <CommentStack />}

      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
};

export const App = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  return (
    <RecoilRoot>
      <UserStateProvider>
        <LoadingProvider>
          <RootSiblingParent>
            <NavigationContainer theme={navTheme}>
              <Main />
            </NavigationContainer>
          </RootSiblingParent>
        </LoadingProvider>
      </UserStateProvider>
    </RecoilRoot>
  );
};

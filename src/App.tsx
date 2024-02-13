import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { RecoilRoot } from 'recoil';
import { StatusBar } from 'expo-status-bar';

import { UserStateProvider, useUserState } from './providers';
import { AuthStack, SigonganStack } from './navigations';
import { useCommentAuth, useGetShare, useNotifications, useFont } from './hooks';
import { initializeNotifications } from './library';
import { CommentStack } from './navigations/comment';

initializeNotifications();

const Main = () => {
  // fcm 세팅 훅
  useNotifications();

  // 외부 -> 내부 공유 리시버
  useGetShare();

  // 401 에러시 자동 로그아웃 훅
  useCommentAuth();

  const fontLoaded = useFont();
  const { userState } = useUserState();

  if (!fontLoaded) {
    // TODO: 폰트 불러오는 중
  }

  return (
    <>
      {userState === 'unLogin' && <AuthStack />}
      {userState === 'Sigongan' && <SigonganStack />}
      {userState === 'Comment' && <CommentStack />}
    </>
  );
};

export const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <UserStateProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
              <Main />
              <StatusBar style="auto" />
            </SafeAreaView>
          </GestureHandlerRootView>
        </UserStateProvider>
      </NavigationContainer>
    </RecoilRoot>
  );
};

import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, View } from 'react-native';
import { RecoilRoot } from 'recoil';
import { StatusBar } from 'expo-status-bar';
import { UserStateProvider, useUserState } from './providers';
import { AuthStack, SigonganStack } from './navigations';
import { useCommentAuth, useGetShare, useNotifications, useFont } from './hooks';
import { initializeNotifications } from './library';
import { CommentStack } from './navigations/comment';
import { THEME } from './constants/theme';
import { useFonts } from 'expo-font';
import { customFontsToLoad } from './config/customFonts';

initializeNotifications();

const Main = () => {
  // fcm 세팅 훅
  useNotifications();

  // 외부 -> 내부 공유 리시버
  useGetShare();

  // 401 에러시 자동 로그아웃 훅
  useCommentAuth();

  const { userState } = useUserState();

  const [fontsLoaded] = useFonts(customFontsToLoad);

  if (!fontsLoaded) {
    return (
      <View>
        <StatusBar style="auto" />
      </View>
    );
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
      <ThemeProvider value={THEME}>
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
      </ThemeProvider>
    </RecoilRoot>
  );
};

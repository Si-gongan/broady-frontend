import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { RecoilRoot } from 'recoil';
import { StatusBar } from 'expo-status-bar';

import { UserStateProvider, useUserState } from './providers';
import { AuthStack, CommentStack, SigonganStack } from './navigations';

const Main = () => {
  const { userState } = useUserState();

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

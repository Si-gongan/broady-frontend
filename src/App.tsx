import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { AuthStack, SigonganStack, CommentStack } from './navigations';

import { UserStateProvider, useUserState } from './providers';

const Main = () => {
  const { userState } = useUserState();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  return (
    <RecoilRoot>
      <NavigationContainer theme={navTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            {userState === 'unLogin' && <AuthStack />}
            {userState === 'Sigongan' && <SigonganStack />}
            {userState === 'Comment' && <CommentStack />}
          </SafeAreaView>
        </GestureHandlerRootView>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export const App = () => {
  return (
    <UserStateProvider>
      <Main />
    </UserStateProvider>
  );
};

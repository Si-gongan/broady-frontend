import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RecoilRoot } from 'recoil';
import { useFonts } from 'expo-font';

import { AuthStack, SigonganStack, CommentStack } from './navigations';
import { UserStateProvider, useUserState } from './providers';

import { initializeNotifications, useNotifications } from './components/common/notifications';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

initializeNotifications();

const Main = () => {
  const [fontsLoaded] = useFonts({
    ABeeZee: require('../assets/font/ABeeZee-Regular.ttf'),
    Inter: require('../assets/font/Inter-Regular.ttf'),
    'Inter-Bold': require('../assets/font/Inter-SemiBold.ttf'),
  });
  const { userState } = useUserState();

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

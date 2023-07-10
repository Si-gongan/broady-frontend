import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStack, CommentaryTab, SigonganTab } from './navigations';

import { UserStateProvider, useUserState } from './providers';

const Main = () => {
  const { userState } = useUserState();

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          {userState === 'unLogin' && <AuthStack />}
          {userState === 'Sigongan' && <SigonganTab />}
          {userState === 'Commentary' && <CommentaryTab />}
        </SafeAreaView>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export const App = () => {
  <UserStateProvider>
    <Main />
  </UserStateProvider>;
};

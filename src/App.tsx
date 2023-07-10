import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStack, CommentaryTab, SigonganTab } from './navigations';

import { UserStateProvider, useUserState } from './providers';

const Main = () => {
  const { userState } = useUserState();

  return (
    <NavigationContainer>
      <SafeAreaView>
        {userState === 'unLogin' && <AuthStack />}
        {userState === 'Sigongan' && <SigonganTab />}
        {userState === 'Commentary' && <CommentaryTab />}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export const App = () => {
  <UserStateProvider>
    <Main />
  </UserStateProvider>;
};

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserStateProvider, useUserState } from './providers';
import { AuthStack } from './navigations';

const Main = () => {
  const { userState } = useUserState();

  return (
    <NavigationContainer>
      <SafeAreaView>{userState === 'unLogin' && <AuthStack />}</SafeAreaView>
    </NavigationContainer>
  );
};

export const App = () => {
  <UserStateProvider>
    <Main />
  </UserStateProvider>;
};

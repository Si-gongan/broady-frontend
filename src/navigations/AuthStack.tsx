import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { AuthStackParamList } from '../types/types';
import { IntroScreen, StartScreen } from '../screens/auth';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="인트로" component={IntroScreen} />

      <Stack.Screen name="시작하기" component={StartScreen} />
    </Stack.Navigator>
  );
};

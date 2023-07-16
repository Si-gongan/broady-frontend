import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { AuthStackParamList } from '../types/types';
import { IntroScreen } from '../screens/auth/IntroScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="인트로" component={IntroScreen} />
    </Stack.Navigator>
  );
};

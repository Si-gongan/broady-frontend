import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { AuthStackParamList } from '../types/types';
import { EmailSignInScreen, EmailSignUpScreen, IntroScreen, StartScreen } from '../screens/auth';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="인트로" component={IntroScreen} />

      <Stack.Screen name="시작하기" component={StartScreen} />

      <Stack.Screen name="이메일 회원가입" component={EmailSignUpScreen} />

      <Stack.Screen name="이메일 로그인" component={EmailSignInScreen} />
    </Stack.Navigator>
  );
};

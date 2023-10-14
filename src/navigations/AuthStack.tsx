import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { AuthStackParamList } from '../types/types';
import { NicknameScreen, EmailSignInScreen, EmailSignUpScreen, IntroScreen } from '../screens/auth';
import OnboardingScreen from '../screens/Comment/OnboardingScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="인트로" component={IntroScreen} />

      <Stack.Screen name="이메일 회원가입" component={EmailSignUpScreen} />

      <Stack.Screen name="이메일 로그인" component={EmailSignInScreen} />

      <Stack.Screen name="닉네임 입력" component={NicknameScreen} />

      <Stack.Screen name="해설자 온보딩" component={OnboardingScreen} />
    </Stack.Navigator>
  );
};

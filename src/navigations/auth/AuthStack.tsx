import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  AuthEmailSignInScreen,
  AuthEmailSignUpScreen,
  AuthInitialScreen,
  AuthNicknameSetUpScreen,
} from '../../screens';
import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name="최초 화면" component={AuthInitialScreen} />

      <Stack.Screen name="이메일 로그인" component={AuthEmailSignInScreen} />

      <Stack.Screen name="이메일 회원가입" component={AuthEmailSignUpScreen} />

      <Stack.Screen name="닉네임 설정" component={AuthNicknameSetUpScreen} />
    </Stack.Navigator>
  );
};

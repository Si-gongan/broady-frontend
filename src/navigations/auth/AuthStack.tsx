import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AuthEmailSignInScreen,
  AuthEmailSignUpScreen,
  AuthInitialScreen,
  AuthNicknameSetUpScreen,
} from '../../screens/auth';
import type { AuthStackParamList } from './types';
import { SCREENS } from '../../constants/screens';

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
      <Stack.Screen name={SCREENS.AUTHSTACK.최초화면} component={AuthInitialScreen} />
      <Stack.Screen name={SCREENS.AUTHSTACK.이메일로그인} component={AuthEmailSignInScreen} />
      <Stack.Screen name={SCREENS.AUTHSTACK.이메일회원가입} component={AuthEmailSignUpScreen} />
      <Stack.Screen name={SCREENS.AUTHSTACK.닉네임설정} component={AuthNicknameSetUpScreen} />
    </Stack.Navigator>
  );
};

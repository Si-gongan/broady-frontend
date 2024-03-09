import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SigonganTab } from './SigonganTab';
import type { SigonganStackParamList } from './types';
import { SCREENS } from '@/constants/screens';
import SigonganPostScreen from '@/screens/sigongan/SigonganPostScreen';
import { AuthNicknameSetUpScreen } from '@/screens';
import SigonganFaqScreen from '@/screens/sigongan/SigonganFaqScreen';

const Stack = createNativeStackNavigator<SigonganStackParamList>();

export const SigonganStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name={SCREENS.MAINSTACK.브로디메인탭} component={SigonganTab} options={{ headerShown: false }} />
      <Stack.Screen
        name={SCREENS.MAINSTACK.브로디대화방}
        component={SigonganPostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group>
        <Stack.Screen
          name={SCREENS.MAINSTACK.브로디닉네임설정}
          component={AuthNicknameSetUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.MAINSTACK.브로디자주묻는질문}
          component={SigonganFaqScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

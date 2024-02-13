import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SigonganTab } from './SigonganTab';
import type { SigonganStackParamList } from './types';
import { SCREENS } from '@/constants/screens';

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
    </Stack.Navigator>
  );
};

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SigonganTab } from './SigonganTab';
import type { SigonganStackParamList } from './types';

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
      <Stack.Screen name="메인" component={SigonganTab} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

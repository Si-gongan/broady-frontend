import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { SigonganStackParamList } from '../../types/types';
import { CommentRequestScreen, RequestStateScreen } from '../../screens/sigongan';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { SigonganMainTab } from './SigonganMainTab';

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
      <Stack.Screen
        name="메인"
        component={SigonganMainTab}
        options={({ route }) => ({
          title: getFocusedRouteNameFromRoute(route) ?? '홈',
        })}
      />

      <Stack.Screen name="해설의뢰" component={CommentRequestScreen} options={{ headerShown: false }} />

      <Stack.Screen name="해설 진행현황" component={RequestStateScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CommentTab } from './CommentTab';
import type { CommentStackParamList } from './types';
import { SCREENS } from '@/constants/screens';

const Stack = createNativeStackNavigator<CommentStackParamList>();

export const CommentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name={SCREENS.COMMENTSTACK.해설자메인탭} component={CommentTab} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

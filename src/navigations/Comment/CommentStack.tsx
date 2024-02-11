import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CommentTab } from './CommentTab';
import type { CommentStackParamList } from './types';

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
      <Stack.Screen name="메인" component={CommentTab} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

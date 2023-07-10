import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Example" component={Example} />
    </Stack.Navigator>
  );
};

const Example = () => {
  return (
    <View>
      <Text>로그인 페이지</Text>
    </View>
  );
};

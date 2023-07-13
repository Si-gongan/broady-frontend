import { View, Text } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { SigonganHomeStackParamList } from '../../types/types';
import { HomeScreen } from '../../screens/sigongan';

const Stack = createNativeStackNavigator<SigonganHomeStackParamList>();

export const SigonganHomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="홈" component={HomeScreen} />

      <Stack.Screen name="해설의뢰" component={Example} />
    </Stack.Navigator>
  );
};

const Example = () => {
  return (
    <View>
      <Text>해설의뢰 페이지</Text>
    </View>
  );
};

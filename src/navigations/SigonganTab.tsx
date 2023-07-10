import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type { SigonganTabParamList } from './types';

const Tab = createBottomTabNavigator<SigonganTabParamList>();

export const SigonganTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Example" component={Example} />
    </Tab.Navigator>
  );
};

const Example = () => {
  return (
    <View>
      <Text>시각장애인 탭</Text>
    </View>
  );
};

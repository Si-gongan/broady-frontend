import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type { CommentaryTabParamList } from './types';

const Tab = createBottomTabNavigator<CommentaryTabParamList>();

export const CommentaryTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Example" component={Example} />
    </Tab.Navigator>
  );
};

const Example = () => {
  return (
    <View>
      <Text>해설자 탭</Text>
    </View>
  );
};

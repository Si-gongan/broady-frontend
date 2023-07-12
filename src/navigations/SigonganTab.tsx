import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { HomeScreen, AIChatScreen, MyPageScreen } from '../screens/sigongan';

import type { SigonganTabParamList } from '../types/types';

const Tab = createBottomTabNavigator<SigonganTabParamList>();

export const SigonganTab = () => {
  return (
    <Tab.Navigator sceneContainerStyle={{ backgroundColor: 'white' }}>
      <Tab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cards-diamond" color={color} size={size} />,
          headerStyle: { shadowOpacity: 0 },
        }}
      />
      <Tab.Screen
        name="AI 채팅"
        component={AIChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cards-diamond" color={color} size={size} />,
          headerStyle: { shadowOpacity: 0 },
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MyPageScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cards-diamond" color={color} size={size} />,
          headerStyle: { shadowOpacity: 0 },
        }}
      />
    </Tab.Navigator>
  );
};

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyRequest from '../../components/Comment/MyRequest';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../../screens/Comment/HomeScreen';
import MyPageScreen from '../../screens/Comment/MyPageScreen';

const Tab = createBottomTabNavigator();

export const CommentTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cards-diamond" color={color} size={size} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MY의뢰"
        component={MyRequest}
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

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyRequest from './MyRequest';
import MyPage from './MyPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Comment from './Comment';

const Tab = createBottomTabNavigator();

export const CommentTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="홈"
        component={Comment}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cards-diamond" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="MY의뢰"
        component={MyRequest}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cards-diamond" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MyPage}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cards-diamond" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyRequest from '../components/Comment/MyRequest';
import MyPage from '../components/Comment/Mypage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/Comment/HomeScreen';

const Tab = createBottomTabNavigator();

export const CommentTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cards-diamond" color={color} size={size} />,
          headerStyle: { shadowOpacity: 0 },
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
        component={MyPage}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cards-diamond" color={color} size={size} />,
          headerStyle: { shadowOpacity: 0 },
        }}
      />
    </Tab.Navigator>
  );
};

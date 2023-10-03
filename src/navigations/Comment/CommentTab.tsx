import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyRequest from '../../components/Comment/MyRequest';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../../screens/Comment/HomeScreen';
import MyPageScreen from '../../screens/Comment/MyPageScreen';
import { Colors } from '../../components/renewal';

const Tab = createBottomTabNavigator();

export const CommentTab = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: Colors.Red.Default }}>
      <Tab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home-variant" color={color} size={size} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MY의뢰"
        component={MyRequest}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="text-box" color={color} size={size} />,
          headerStyle: { shadowOpacity: 0 },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MyPageScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size} />,
          headerStyle: { shadowOpacity: 0 },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

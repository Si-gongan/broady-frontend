import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  CommentExcellentCommentaryScreen,
  CommentHomeScreen,
  CommentMyRequestScreen,
  CommentMypageScreen,
} from '../../screens';
import type { CommentTabParamList } from './types';

const Tab = createBottomTabNavigator<CommentTabParamList>();

export const CommentTab = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'white' }}
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          display: 'none',
        },
      }}
    >
      <Tab.Screen name="홈" component={CommentHomeScreen} />
      <Tab.Screen name="우수해설" component={CommentExcellentCommentaryScreen} />
      <Tab.Screen name="MY의뢰" component={CommentMyRequestScreen} />
      <Tab.Screen name="마이페이지" component={CommentMypageScreen} />
    </Tab.Navigator>
  );
};

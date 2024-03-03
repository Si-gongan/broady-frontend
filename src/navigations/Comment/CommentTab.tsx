import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  CommentExcellentCommentaryScreen,
  CommentHomeScreen,
  CommentMyRequestScreen,
  CommentMypageScreen,
} from '../../screens';
import { SCREENS } from '@/constants/screens';
import { CommentTabParamList } from './types';
import { CommentTabBar } from '@/components/comment/CommentTabBar';

const Tab = createBottomTabNavigator<CommentTabParamList>();

export const CommentTab = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'white' }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'flex',
        },
      }}
      tabBar={(props) => <CommentTabBar {...props} />}
    >
      <Tab.Screen name={SCREENS.COMMENTSTACK.COMMENTTAB.해설자홈} component={CommentHomeScreen} />
      <Tab.Screen name={SCREENS.COMMENTSTACK.COMMENTTAB.우수해설} component={CommentExcellentCommentaryScreen} />
      <Tab.Screen name={SCREENS.COMMENTSTACK.COMMENTTAB.MY의뢰} component={CommentMyRequestScreen} />
      <Tab.Screen name={SCREENS.COMMENTSTACK.COMMENTTAB.마이페이지} component={CommentMypageScreen} />
    </Tab.Navigator>
  );
};

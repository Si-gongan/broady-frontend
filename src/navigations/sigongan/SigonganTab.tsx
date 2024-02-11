import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SigonganHomeScreen, SigonganMypageScreen, SigonganPickedCommentaryScreen } from '../../screens';
import type { SigonganTabParamList } from './types';

const Tab = createBottomTabNavigator<SigonganTabParamList>();

export const SigonganTab = () => {
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
      <Tab.Screen name="홈" component={SigonganHomeScreen} />
      <Tab.Screen name="찜한해설" component={SigonganPickedCommentaryScreen} />
      <Tab.Screen name="마이페이지" component={SigonganMypageScreen} />
    </Tab.Navigator>
  );
};

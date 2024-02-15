import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SigonganHomeScreen, SigonganMypageScreen, SigonganPickedCommentaryScreen } from '../../screens';
import type { SigonganTabParamList } from './types';
import { SCREENS } from '@/constants/screens';

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
      <Tab.Screen name={SCREENS.MAINSTACK.MAINTAB.브로디홈} component={SigonganHomeScreen} />
      <Tab.Screen name={SCREENS.MAINSTACK.MAINTAB.찜한해설} component={SigonganPickedCommentaryScreen} />
      <Tab.Screen name={SCREENS.MAINSTACK.MAINTAB.브로디마이페이지} component={SigonganMypageScreen} />
    </Tab.Navigator>
  );
};

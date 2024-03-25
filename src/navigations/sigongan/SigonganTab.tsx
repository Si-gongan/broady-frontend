import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SigonganHomeScreen, SigonganMypageScreen, SigonganPickedCommentaryScreen } from '../../screens';
import type { SigonganTabParamList } from './types';
import { SCREENS } from '@/constants/screens';
import React from 'react';
import TabBar from '@/components/common/TabBar';
import SigonganTabBar from '@/components/sigongan/SigonganTabBar';
import { useRecoilValue } from 'recoil';
import { selectModeAtom } from '@/states/selectMode';

const Tab = createBottomTabNavigator<SigonganTabParamList>();

export const SigonganTab = () => {
  const isSelectMode = useRecoilValue(selectModeAtom);

  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'white' }}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // display: 'flex',
          display: 'none',
        },
      }}
      tabBar={(props) => {
        if (isSelectMode) {
          return null;
        } else {
          return <SigonganTabBar {...props} />;
        }
      }}
    >
      <Tab.Screen name={SCREENS.MAINSTACK.MAINTAB.브로디홈} component={SigonganHomeScreen} />
      <Tab.Screen name={SCREENS.MAINSTACK.MAINTAB.찜한해설} component={SigonganPickedCommentaryScreen} />
      <Tab.Screen name={SCREENS.MAINSTACK.MAINTAB.브로디마이페이지} component={SigonganMypageScreen} />
    </Tab.Navigator>
  );
};

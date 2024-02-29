import React from 'react';
import TabBar from '../common/TabBar';
import { TouchableOpacity } from 'react-native';
import Typography from '../common/Typography';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SCREENS } from '@/constants/screens';

const TabItemProps = {
  [SCREENS.MAINSTACK.MAINTAB.브로디홈]: {
    iconName: 'home',
    text: '홈',
  },
  [SCREENS.MAINSTACK.MAINTAB.찜한해설]: {
    iconName: 'bookmark',
    text: '찜한해설',
  },
  [SCREENS.MAINSTACK.MAINTAB.브로디마이페이지]: {
    iconName: 'bookmark',
    text: '마이페이지',
  },
};

export default function SigonganTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <TabBar>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        // const label =
        //   options.tabBarLabel !== undefined
        //     ? options.tabBarLabel
        //     : options.title !== undefined
        //     ? options.title
        //     : route.name;

        const name = route.name as keyof typeof TabItemProps;

        console.log('name', name);

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBar.Item
            onPress={onPress}
            iconName={TabItemProps[name].iconName}
            iconType="material"
            text={TabItemProps[name].text}
          />
        );
      })}
    </TabBar>
  );
}

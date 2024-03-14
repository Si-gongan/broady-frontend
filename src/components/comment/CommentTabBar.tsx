import React from 'react';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import TabBar from '@/components/common/TabBar';
import { SCREENS } from '@/constants/screens';
import { IconType } from '../common/Icons';

const TabItemProps = {
  [SCREENS.COMMENTSTACK.COMMENTTAB.해설자홈]: {
    iconType: 'material',
    iconName: 'home',
    text: '홈',
  },
  [SCREENS.COMMENTSTACK.COMMENTTAB.우수해설]: {
    iconType: 'material',
    iconName: 'bookmark',
    text: '우수해설',
  },
  [SCREENS.COMMENTSTACK.COMMENTTAB.MY의뢰]: {
    iconType: 'fontAwesome',
    iconName: 'file-text',
    text: 'MY의뢰',
  },
  [SCREENS.COMMENTSTACK.COMMENTTAB.마이페이지]: {
    iconType: 'fontAwesome',
    iconName: 'user',
    text: '마이페이지',
  },
};

export const CommentTabBar = ({ state, navigation }: BottomTabBarProps) => {
  return (
    <TabBar>
      {state.routes.map((route, index) => {
        const name = route.name as keyof typeof TabItemProps;
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

        return (
          <TabBar.Item
            onPress={onPress}
            isActive={isFocused}
            iconName={TabItemProps[name].iconName}
            iconType={TabItemProps[name].iconType as IconType}
            text={TabItemProps[name].text}
            key={index}
          />
        );
      })}
    </TabBar>
  );
};

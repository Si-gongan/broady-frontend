import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CommentTabParamList } from '../../navigations';
import { THEME } from '@/constants/theme';
import { SCREENS } from '@/constants/screens';

export const CommentTabBar = () => {
  const navigation = useNavigation<BottomTabNavigationProp<CommentTabParamList>>();

  return (
    <View>
      <Text>CommentTabBar</Text>

      <Text onPress={() => navigation.navigate(SCREENS.COMMENTSTACK.COMMENTTAB.해설자홈)}>홈 이동</Text>
      <Text onPress={() => navigation.navigate(SCREENS.COMMENTSTACK.COMMENTTAB.우수해설)}>우수해설 이동</Text>
      <Text onPress={() => navigation.navigate(SCREENS.COMMENTSTACK.COMMENTTAB.MY의뢰)}>MY의뢰 이동</Text>
      <Text onPress={() => navigation.navigate(SCREENS.COMMENTSTACK.COMMENTTAB.MY의뢰)}>마이페이지 이동</Text>
    </View>
  );
};

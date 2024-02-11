import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CommentTabParamList } from '../../navigations';

export const CommentTabBar = () => {
  const navigation = useNavigation<BottomTabNavigationProp<CommentTabParamList>>();

  return (
    <View>
      <Text>CommentTabBar</Text>

      <Text onPress={() => navigation.navigate('홈')}>홈 이동</Text>
      <Text onPress={() => navigation.navigate('우수해설')}>우수해설 이동</Text>
      <Text onPress={() => navigation.navigate('MY의뢰')}>MY의뢰 이동</Text>
      <Text onPress={() => navigation.navigate('마이페이지')}>마이페이지 이동</Text>
    </View>
  );
};

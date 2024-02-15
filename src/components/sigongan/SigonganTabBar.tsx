import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { SigonganTabParamList } from '../../navigations';
import { SCREENS } from '@/constants/screens';

export const SigonganTabBar = () => {
  const navigation = useNavigation<BottomTabNavigationProp<SigonganTabParamList>>();

  return (
    <View>
      <Text>SigonganTabBar</Text>

      <Text onPress={() => navigation.navigate(SCREENS.MAINSTACK.MAINTAB.브로디홈)}>홈 이동</Text>
      <Text onPress={() => navigation.navigate(SCREENS.MAINSTACK.MAINTAB.찜한해설)}>찜한해설 이동</Text>
      <Text onPress={() => navigation.navigate(SCREENS.MAINSTACK.MAINTAB.브로디마이페이지)}>마이페이지 이동</Text>
    </View>
  );
};

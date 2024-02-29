import { useNavigation } from '@react-navigation/native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SigonganStackParamList } from '../../navigations';

export const useSigonganNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SigonganStackParamList>>();

  return navigation;
};

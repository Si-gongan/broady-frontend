import { useNavigation } from '@react-navigation/native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigations';

export const useAuthNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return navigation;
};

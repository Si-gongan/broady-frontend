import { View, Text } from 'react-native';
import { Header } from '../../components';

import { useAuthNavigation } from '../../hooks/navigations';
import { useUserState } from '../../providers';

export const AuthInitialScreen = () => {
  const authNavigation = useAuthNavigation();

  const { loginToComment, loginToSigongan, logout } = useUserState();

  return (
    <View>
      <Header />

      <Text>AuthInitialScreen</Text>

      <Text onPress={() => authNavigation.push('broadyEmailLogin')}>이메일 로그인 화면 이동</Text>

      <Text onPress={() => loginToSigongan()}>시각장애인 플로우 이동</Text>

      <Text onPress={() => loginToComment('authToken')}>해설자 플로우 이동</Text>

      <Text onPress={() => logout()}>로그아웃</Text>
    </View>
  );
};

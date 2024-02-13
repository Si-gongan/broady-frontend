import { View, Text } from 'react-native';
import { SigonganTabBar } from '../../components';
import { useUserState } from '../../providers';

export const SigonganHomeScreen = () => {
  const { logout } = useUserState();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>SigonganHomeScreen</Text>
        <Text onPress={logout}>로그아웃</Text>
      </View>

      <SigonganTabBar />
    </View>
  );
};

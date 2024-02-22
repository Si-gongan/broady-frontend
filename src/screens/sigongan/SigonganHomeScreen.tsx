import { View, Text, SafeAreaView } from 'react-native';
import { SigonganTabBar } from '../../components';
import { useUserState } from '../../providers';
import { SigonganUserState } from '@/states';
import { useRecoilState } from 'recoil';
import { AUTH_TOKEN_KEY, getData } from '@/library';

export const SigonganHomeScreen = () => {
  const { logout } = useUserState();

  const [sigonganUser, setSigonganUser] = useRecoilState(SigonganUserState);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>SigonganHomeScreen</Text>
        <Text onPress={logout}>로그아웃</Text>
      </View>

      <SigonganTabBar />
    </SafeAreaView>
  );
};

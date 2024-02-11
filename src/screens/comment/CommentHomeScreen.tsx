import { View, Text } from 'react-native';
import { useUserState } from '../../providers';
import { CommentTabBar, Header } from '../../components';

export const CommentHomeScreen = () => {
  const { logout } = useUserState();

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <View style={{ flex: 1 }}>
        <Text>CommentHomeScreen</Text>
        <Text onPress={logout}>로그아웃</Text>
      </View>

      <CommentTabBar />
    </View>
  );
};

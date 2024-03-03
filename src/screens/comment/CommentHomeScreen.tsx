import { View, Text, SafeAreaView } from 'react-native';
import { useUserState } from '../../providers';
import { CommentTabBar } from '../../components';

export const CommentHomeScreen = () => {
  const { logout } = useUserState();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>CommentHomeScreen</Text>
        <Text onPress={logout}>로그아웃</Text>
      </View>
    </SafeAreaView>
  );
};

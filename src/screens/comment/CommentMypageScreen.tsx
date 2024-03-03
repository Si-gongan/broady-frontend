import { useUserState } from '@/providers';
import { View, Text } from 'react-native';

export const CommentMypageScreen = () => {
  const { logout } = useUserState();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>CommentMypageScreen</Text>
        <Text onPress={logout}>로그아웃</Text>
      </View>
    </View>
  );
};

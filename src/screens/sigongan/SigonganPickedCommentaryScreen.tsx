import Typography from '@/components/common/Typography';
import { useUserState } from '@/providers';
import { View, Text, Pressable, SafeAreaView } from 'react-native';

export const SigonganPickedCommentaryScreen = () => {
  const { logout } = useUserState();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>SigonganPickedCommentaryScreen</Text>
        <Pressable onPress={logout}>
          <Typography size="body_xl" weight="regular">
            logout
          </Typography>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

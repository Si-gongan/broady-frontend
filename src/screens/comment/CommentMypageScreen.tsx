import { View, Text } from 'react-native';
import { CommentTabBar } from '../../components';

export const CommentMypageScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>CommentMypageScreen</Text>
      </View>

      <CommentTabBar />
    </View>
  );
};

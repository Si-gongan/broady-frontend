import { View, Text } from 'react-native';
import { CommentTabBar, Header } from '../../components';

export const CommentMypageScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />

      <View style={{ flex: 1 }}>
        <Text>CommentMypageScreen</Text>
      </View>

      <CommentTabBar />
    </View>
  );
};

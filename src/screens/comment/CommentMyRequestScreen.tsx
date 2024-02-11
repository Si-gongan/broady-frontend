import { View, Text } from 'react-native';
import { CommentTabBar, Header } from '../../components';

export const CommentMyRequestScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />

      <View style={{ flex: 1 }}>
        <Text>CommentMyRequestScreen</Text>
      </View>

      <CommentTabBar />
    </View>
  );
};

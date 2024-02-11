import { View, Text } from 'react-native';
import { CommentTabBar, Header } from '../../components';

export const CommentExcellentCommentaryScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />

      <View style={{ flex: 1 }}>
        <Text>CommentExcellentCommentaryScreen</Text>
      </View>

      <CommentTabBar />
    </View>
  );
};

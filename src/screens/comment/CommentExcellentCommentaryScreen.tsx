import { View, Text } from 'react-native';
import { CommentTabBar } from '../../components';

export const CommentExcellentCommentaryScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>CommentExcellentCommentaryScreen</Text>
      </View>

      <CommentTabBar />
    </View>
  );
};

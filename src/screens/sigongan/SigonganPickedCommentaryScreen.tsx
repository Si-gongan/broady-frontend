import { View, Text } from 'react-native';
import { SigonganTabBar } from '../../components';

export const SigonganPickedCommentaryScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>SigonganPickedCommentaryScreen</Text>
      </View>

      <SigonganTabBar />
    </View>
  );
};

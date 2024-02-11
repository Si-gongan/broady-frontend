import { View, Text } from 'react-native';
import { Header, SigonganTabBar } from '../../components';

export const SigonganPickedCommentaryScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />

      <View style={{ flex: 1 }}>
        <Text>SigonganPickedCommentaryScreen</Text>
      </View>

      <SigonganTabBar />
    </View>
  );
};

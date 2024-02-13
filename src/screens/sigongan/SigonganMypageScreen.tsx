import { View, Text } from 'react-native';
import { SigonganTabBar } from '../../components';

export const SigonganMypageScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>SigonganMypageScreen</Text>
      </View>

      <SigonganTabBar />
    </View>
  );
};

import { View, Text } from 'react-native';
import { Header, SigonganTabBar } from '../../components';

export const SigonganMypageScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />

      <View style={{ flex: 1 }}>
        <Text>SigonganMypageScreen</Text>
      </View>

      <SigonganTabBar />
    </View>
  );
};

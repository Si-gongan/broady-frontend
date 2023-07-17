import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/common/Header';

const RefundScreen = ({ navigation }: any) => {
  return (
    <View>
      <Header navigation={navigation}>환급 신청</Header>
      <Text>RefundScreen</Text>
    </View>
  );
};

export default RefundScreen;

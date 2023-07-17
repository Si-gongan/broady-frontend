import { View, Text, StyleSheet } from 'react-native';
import CustomerService from '../../components/common/CustomerService';
import { AppSetting } from '../../components/sigongan/mypage';
import { SigonganDesign } from '../../components/sigongan/styles';

export const MyPageScreen = () => {
  return (
    <View style={styles.container}>
      <AppSetting />
      <CustomerService />
      <View style={[SigonganDesign.myPageGrid, styles.goBack]}>
        <Text style={SigonganDesign.myPageContent}>첫 화면으로 나가기</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
  },
  customerService: {
    paddingVertical: 16,
    paddingHorizontal: 12,

    gap: 18,
  },
  goBack: {
    paddingVertical: 17,
    paddingHorizontal: 14,
  },
});

import { View, Text, StyleSheet } from 'react-native';
import { AppSetting } from '../../components/sigongan/mypage';
import { SigonganDesign } from '../../components/sigongan/styles';

export const MyPageScreen = () => {
  return (
    <View style={styles.container}>
      <AppSetting />

      <View style={[SigonganDesign.myPageGrid, styles.customerService]}>
        <Text style={SigonganDesign.myPageTitle}>고객 지원</Text>

        <Text style={SigonganDesign.myPageContent}>1:1 문의</Text>
        <Text style={SigonganDesign.myPageContent}>자주 묻는 질문 (FAQ)</Text>
        <Text style={SigonganDesign.myPageContent}>개인정보처리방침</Text>
        <Text style={SigonganDesign.myPageContent}>서비스 이용약관</Text>
      </View>

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

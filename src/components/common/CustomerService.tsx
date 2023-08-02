import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SigonganDesign } from '../sigongan/styles';
import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';

const CustomerService = () => {
  const fcmToken = useRecoilValue(fcmTokenState);

  return (
    <>
      <View style={[SigonganDesign.myPageGrid, styles.customerService]}>
        <Text style={SigonganDesign.myPageTitle}>고객 지원</Text>

        <TouchableOpacity onPress={() => Alert.alert('알림', fcmToken)}>
          <Text style={SigonganDesign.myPageContent}>1:1 문의</Text>
        </TouchableOpacity>

        <Text style={SigonganDesign.myPageContent}>자주 묻는 질문 (FAQ)</Text>
        <Text style={SigonganDesign.myPageContent}>개인정보처리방침</Text>
        <Text style={SigonganDesign.myPageContent}>서비스 이용약관</Text>
      </View>
    </>
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

export default CustomerService;

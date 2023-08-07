import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SigonganDesign } from '../sigongan/styles';
import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';

import * as WebBrowser from 'expo-web-browser';

const CustomerService = () => {
  const fcmToken = useRecoilValue(fcmTokenState);

  return (
    <>
      <View style={[SigonganDesign.myPageGrid, styles.customerService]}>
        <TouchableOpacity onPress={() => Alert.alert('알림', fcmToken)}>
          <Text style={SigonganDesign.myPageTitle}>고객 지원</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('http://pf.kakao.com/_csbDxj')}>
          <Text style={SigonganDesign.myPageContent}>1:1 문의</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            WebBrowser.openBrowserAsync('https://sigongan.notion.site/FAQ-7e5f614efcc54953846d808e6b4948bb?pvs=4')
          }
        >
          <Text style={SigonganDesign.myPageContent}>자주 묻는 질문 (FAQ)</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('https://sites.google.com/view/sigongan/홈')}>
          <Text style={SigonganDesign.myPageContent}>개인정보처리방침</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => WebBrowser.openBrowserAsync('https://sites.google.com/view/sigongan-useterm/홈')}
        >
          <Text style={SigonganDesign.myPageContent}>서비스 이용약관</Text>
        </TouchableOpacity>
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

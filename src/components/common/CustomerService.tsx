import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SigonganDesign } from '../sigongan/styles';

import * as WebBrowser from 'expo-web-browser';

interface CustomerServiceProps {
  isBlind: boolean
}

const CustomerService = ({isBlind}: CustomerServiceProps) => {
  return (
    <>
      <View style={[SigonganDesign.myPageGrid, styles.customerService]}>
        <Text style={SigonganDesign.myPageTitle}>고객 지원</Text>

        <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(isBlind ? 'http://pf.kakao.com/_sAnVG' : 'https://open.kakao.com/o/gdtCWjwf')}>
          <Text style={SigonganDesign.myPageContent}>1:1 문의</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            WebBrowser.openBrowserAsync(isBlind ? 'https://sigongan.notion.site/FAQ-c4257e39b7c844379f894da5e22e0795?pvs=4' : 'https://sigongan.notion.site/FAQ-80538ba46ea1434b928ec077df6e475a?pvs=4')
          }
        >
          <Text style={SigonganDesign.myPageContent}>자주 묻는 질문 (FAQ)</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('https://sites.google.com/view/bomjaguk/개인정보처리방침?authuser=0')}>
          <Text style={SigonganDesign.myPageContent}>개인정보처리방침</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => WebBrowser.openBrowserAsync('https://sites.google.com/view/bomjaguk/이용약관')}
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

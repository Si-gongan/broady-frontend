import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SigonganDesign } from '../sigongan/styles';

import * as WebBrowser from 'expo-web-browser';
import { commentFont } from '../Comment/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CustomerServiceProps {
  isBlind: boolean;
}

const CustomerService = ({ isBlind }: CustomerServiceProps) => {
  return (
    <>
      <View style={[SigonganDesign.myPageGrid, styles.customerService]}>
        <Text style={commentFont.SMALL_TITLE}>고객 지원</Text>

        <TouchableOpacity
          style={styles.touchContainer}
          onPress={() => WebBrowser.openBrowserAsync('http://pf.kakao.com/_pKUjG')}
        >
          <Text style={commentFont.BODY1}>1:1 문의</Text>
          <MaterialIcons name="arrow-forward-ios" />
        </TouchableOpacity>

        {!isBlind && (
          <TouchableOpacity
            style={styles.touchContainer}
            onPress={() =>
              WebBrowser.openBrowserAsync('https://sigongan.notion.site/FAQ-80538ba46ea1434b928ec077df6e475a?pvs=4')
            }
          >
            <Text style={commentFont.BODY1}>사용설명서</Text>
            <MaterialIcons name="arrow-forward-ios" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.touchContainer}
          onPress={() =>
            WebBrowser.openBrowserAsync(
              isBlind
                ? 'https://sigongan.notion.site/FAQ-c4257e39b7c844379f894da5e22e0795?pvs=4'
                : 'https://sigongan.notion.site/FAQ-4e26fc2f0cac4e76a93f82babba94f31?pvs=4'
            )
          }
        >
          <Text style={commentFont.BODY1}>자주 묻는 질문 (FAQ)</Text>
          <MaterialIcons name="arrow-forward-ios" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchContainer}
          onPress={() =>
            WebBrowser.openBrowserAsync('https://sites.google.com/view/bomjaguk/개인정보처리방침?authuser=0')
          }
        >
          <Text style={commentFont.BODY1}>개인정보처리방침</Text>
          <MaterialIcons name="arrow-forward-ios" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchContainer}
          onPress={() => WebBrowser.openBrowserAsync('https://sites.google.com/view/bomjaguk/이용약관')}
        >
          <Text style={commentFont.BODY1}>서비스 이용약관</Text>
          <MaterialIcons name="arrow-forward-ios" />
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
  touchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CustomerService;

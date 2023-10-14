import { StyleSheet, View, Text } from 'react-native';
import Header from '../../components/common/Header';
import PagerView from 'react-native-pager-view';
import { WithLocalSvg } from 'react-native-svg';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigations';
import { useUserState } from '../../providers';
import { commentFont } from '../../components/Comment/styles';
import { Colors } from '../../components/renewal';
import { useState } from 'react';

const IMAGE_SOURCE = [
  require('../../../assets/comment_1.svg'),
  require('../../../assets/comment_2.svg'),
  require('../../../assets/comment_3.svg'),
  require('../../../assets/comment_4.svg'),
  require('../../../assets/comment_5.svg'),
];

const OnboardingScreen = () => {
  const { loginToComment } = useUserState();
  const {
    params: { token, nickname },
  } = useRoute<RouteProp<AuthStackParamList, '해설자 온보딩'>>();

  const [pageCount, setPageCount] = useState(0);

  const handleEndOnboarding = (index: number) => {
    setPageCount(index);
    if (index === 5) loginToComment(token ?? '', nickname);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header isBack={false}>봄자국 간편 가이드</Header>

      <PagerView
        style={styles.viewPager}
        initialPage={0}
        onPageSelected={(e) => handleEndOnboarding(e.nativeEvent.position)}
      >
        <View style={styles.firstPage} key="1">
          <View>
            <Text style={commentFont.SLOGAN}>
              <Text style={styles.boldColorText}>시각장애인의 눈👀</Text>이 되다!
            </Text>
          </View>

          <View style={styles.mainTextContainer}>
            <Text style={[commentFont.BODY1, { textAlign: 'center' }]}>
              봄자국에서는 시각장애인 분들께서 실시간으로{'\n'}의뢰하는 사진을 선택해 해설할 수 있습니다.{'\n'}홈 탭에서
              해설이 필요한 사진들을 확인할 수 있어요.
            </Text>
          </View>
          <WithLocalSvg width={'90%'} asset={IMAGE_SOURCE[0]} />
          <View style={styles.firstNavigatorContainer}>
            {[0, 1, 2, 3, 4].map((pageIdx) => (
              <View style={pageCount === pageIdx ? styles.navigatorColor : styles.navigatorGray} key={pageIdx}></View>
            ))}
          </View>
        </View>
        <View style={styles.page} key="2">
          <Text style={commentFont.SLOGAN}>
            쉽고 빠른
            <Text style={styles.boldColorText}> 앱테크💰</Text>
          </Text>
          <View style={styles.mainTextContainer}>
            <Text style={[commentFont.BODY1, { textAlign: 'center' }]}>
              자투리 시간을 활용해 쏠쏠한 보수를 챙겨보세요 :){'\n'} 사진 해설 1건 당 50원의 리워드가 지급되며,{'\n'}
              최소 환급 기준액은 500원입니다.
            </Text>
          </View>
          <WithLocalSvg width={'90%'} asset={IMAGE_SOURCE[1]} />
          <View style={styles.navigatorContainer}>
            {[0, 1, 2, 3, 4].map((pageIdx) => (
              <View style={pageCount === pageIdx ? styles.navigatorColor : styles.navigatorGray} key={pageIdx}></View>
            ))}
          </View>
        </View>
        <View style={styles.page} key="3">
          <Text style={commentFont.SLOGAN}>
            <Text style={styles.boldColorText}>성실하게</Text> 해설하기!
          </Text>
          <View style={styles.mainTextContainer}>
            <Text style={[commentFont.BODY1, { textAlign: 'center' }]}>
              최소 50자를 채워서 설명해주세요.{'\n'}최소 글자 수 제한을 채우기 위해 사진과 관련 없거나{'\n'}
              <Text style={styles.red}>무의미한 글자를 남발하는 것은 지양</Text>해주세요.
            </Text>
          </View>
          <WithLocalSvg width={'90%'} asset={IMAGE_SOURCE[2]} />
          <View style={styles.navigatorContainer}>
            {[0, 1, 2, 3, 4].map((pageIdx) => (
              <View style={pageCount === pageIdx ? styles.navigatorColor : styles.navigatorGray} key={pageIdx}></View>
            ))}
          </View>
        </View>
        <View style={styles.page} key="4">
          <Text style={commentFont.SLOGAN}>
            <Text style={styles.boldColorText}>객관적인</Text> 해설하기!
          </Text>
          <View style={styles.mainTextContainer}>
            <Text style={[commentFont.BODY1, { textAlign: 'center' }]}>
              사진에 대한 <Text style={styles.bold}>객관적이고 명확한 해설을 제공</Text>해 주세요.{'\n'} 필요할 경우에만
              약간의 주관적인 해설을 더해주세요.
            </Text>
          </View>
          <WithLocalSvg width={'90%'} asset={IMAGE_SOURCE[3]} />
          <View style={styles.navigatorContainer}>
            {[0, 1, 2, 3, 4].map((pageIdx) => (
              <View style={pageCount === pageIdx ? styles.navigatorColor : styles.navigatorGray} key={pageIdx}></View>
            ))}
          </View>
        </View>
        <View style={styles.page} key="5">
          <Text style={commentFont.SLOGAN}>
            <Text style={styles.boldColorText}>요구사항</Text> 파악하기!
          </Text>
          <View style={styles.mainTextContainer}>
            <Text style={[commentFont.BODY1, { textAlign: 'center' }]}>
              시각장애인이 <Text style={styles.bold}>궁금해하는 점을 중심으로 해설</Text>해 주세요.{'\n'} 요청 사항이
              없는 경우에는 해설 가이드라인에 따라{'\n'} 주요 정보를 먼저 설명해 주세요.
            </Text>
          </View>
          <WithLocalSvg width={'90%'} asset={IMAGE_SOURCE[4]} />
          <View style={styles.navigatorContainer}>
            {[0, 1, 2, 3, 4].map((pageIdx) => (
              <View style={pageCount === pageIdx ? styles.navigatorColor : styles.navigatorGray} key={pageIdx}></View>
            ))}
          </View>
        </View>
        <View></View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  firstPage: {
    alignItems: 'center',
    marginTop: 35,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTextContainer: {
    padding: 20,
  },
  boldColorText: {
    color: Colors.Red.Lighten100,
  },
  bold: {
    fontWeight: 'bold',
  },
  red: {
    color: '#D23928',
  },
  firstNavigatorContainer: {
    position: 'absolute',
    bottom: 35,
    flexDirection: 'row',
    gap: 5,

    margin: 10,
  },
  navigatorContainer: {
    flexDirection: 'row',
    gap: 5,
    margin: 10,
  },
  navigatorGray: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },
  navigatorColor: {
    width: 21,
    height: 10,
    borderRadius: 10,
    backgroundColor: Colors.Red.Lighten100,
  },
});

export default OnboardingScreen;

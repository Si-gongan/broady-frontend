import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRecoilValue } from 'recoil';
import { getRequestAll } from '../../api/axios';
import HomeInformation from '../../components/Comment/Home/HomeInformation';
import RequestList from '../../components/Comment/Home/RequestList';
import { authTokenState, fcmTokenState } from '../../states';
import { IRequest } from '../../types/request';
import { commentFont } from '../../components/Comment/styles';
import { BomHeader, PaddingHorizontal } from '../../components/renewal';
import { CommentTabBar } from '../../components/Comment/CommentTabBar';

const AnnounceIconPath =
  'M0.625 20.6057V18.7308H2.88462V9.40381C2.88462 7.72273 3.40345 6.23636 4.44109 4.94469C5.47876 3.65302 6.8109 2.82691 8.4375 2.46635V1.6875C8.4375 1.25348 8.58927 0.884564 8.89281 0.580751C9.19635 0.276918 9.56494 0.125 9.99856 0.125C10.4322 0.125 10.8012 0.276918 11.1057 0.580751C11.4102 0.884564 11.5624 1.25348 11.5624 1.6875V2.46635C13.189 2.82691 14.5212 3.65302 15.5588 4.94469C16.5965 6.23636 17.1153 7.72273 17.1153 9.40381V18.7308H19.3749V20.6057H0.625ZM9.99784 24.1153C9.37586 24.1153 8.84412 23.8941 8.40263 23.4516C7.96112 23.0091 7.74037 22.4771 7.74037 21.8557H12.2596C12.2596 22.4791 12.0381 23.0116 11.5952 23.4531C11.1523 23.8946 10.6198 24.1153 9.99784 24.1153ZM4.75956 18.7308H15.2404V9.40381C15.2404 7.95669 14.7288 6.72151 13.7055 5.69828C12.6823 4.67503 11.4471 4.16341 9.99997 4.16341C8.55284 4.16341 7.31767 4.67503 6.29444 5.69828C5.27119 6.72151 4.75956 7.95669 4.75956 9.40381V18.7308Z';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [currentRequest, setCurrentRequest] = useState<IRequest[]>([]);
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // 모든 의뢰목록 가져오기
      getRequestAll(fcmToken, authToken).then((data) => {
        const sortedRequestList = [...data].sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1));
        setCurrentRequest(sortedRequestList);
      });
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BomHeader
        text="홈"
        hideBackButton
        rightIcon={{
          path: AnnounceIconPath,
          onPress: () => navigation.navigate('Announce'),
          accessibilityLabel: '',
        }}
        isBottomBorder
      />

      <PaddingHorizontal value={0}>
        <HomeInformation navigation={navigation} />
        <View style={styles.bodyContainer}>
          {currentRequest.length > 0 ? (
            <RequestList requestList={currentRequest} navigation={navigation} />
          ) : (
            <View style={styles.blankTextContainer}>
              <Text style={commentFont.BODY1}>등록된 의뢰가 아직 없습니다.</Text>
            </View>
          )}
        </View>
      </PaddingHorizontal>

      <CommentTabBar currentIndex={0} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 24,
    paddingLeft: 35,
  },
  button: {
    paddingRight: 10,
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 30,
  },
  blankTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default HomeScreen;

import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { getRequestAll } from '../../api/axios';
import HomeInformation from '../../components/Comment/Home/HomeInformation';
import RequestList from '../../components/Comment/Home/RequestList';
import { authTokenState, fcmTokenState } from '../../states';
import { IRequest } from '../../types/request';
import { commentFont } from '../../components/Comment/styles';
import Header from '../../components/common/Header';

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
    <>
      <Header isBack={false} type="home" handleClick={() => navigation.navigate('Announce')}>
        홈
      </Header>
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
    </>
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

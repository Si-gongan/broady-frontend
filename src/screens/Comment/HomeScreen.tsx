import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, Image, Button, Modal, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { getRequestAll } from '../../api/axios';
import HomeInformation from '../../components/Comment/Home/HomeInformation';
import RequestList from '../../components/Comment/Home/RequestList';
import { authTokenState, fcmTokenState } from '../../states';
import { IRequest } from '../../types/request';
import { getKoreanTime } from '../../utils/time';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [currentRequest, setCurrentRequest] = useState<IRequest[]>([]);
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const todayRequestCount = countTodayRequest(currentRequest);

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
      <View style={styles.header}>
        {/* <Text style={styles.mainTitle}>의뢰목록</Text> */}
        {/* <View style={styles.button}>
          <Button 
            title="해설 가이드"
            onPress={()=>{
              setModalVisible(true);
            }}
          />
          </View> */}
      </View>
      <HomeInformation totalRequestCount={currentRequest.length} todayRequestCount={todayRequestCount} />
      <View style={styles.bodyContainer}>
        <RequestList requestList={currentRequest} navigation={navigation} />
      </View>
    </>
  );
};

const countTodayRequest = (requestList: IRequest[]) => {
  const todayRequest = requestList.filter(
    (request) => getKoreanTime(new Date()).getDay() === new Date(request.createdAt).getDay()
  );
  return todayRequest.length;
};

const styles = StyleSheet.create({
  header: {
    marginTop: 23,
    marginBottom: 10,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
});

export default HomeScreen;

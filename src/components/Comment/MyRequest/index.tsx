import { useIsFocused } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { getCompletedRequest, getMyRequestAll, getProceedRequest } from '../../../api/axios';
import { authTokenState, fcmTokenState } from '../../../states';
import { ICurrentRequest } from '../../../types/request';
import { getKoreanTime } from '../../../utils/time';
import Header from '../../common/Header';
import { Colors } from '../../renewal';
import MyRequestInformation from './MyRequestInformation';
import RequestList from './RequestList';

const MyRequest = ({ navigation }: any) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const [requestList, setRequestList] = useState<ICurrentRequest[]>([]);
  const totalCompletedCount = useRef(0);
  const todayCompletedCount = countTodayCompletedRequest(requestList);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      try {
        console.log('MY의뢰');
        getMyRequestAll(fcmToken, authToken).then((res) => {
          const proceedList = [...res]
            .filter((data) => data.isAvailable === false && data.isComplete === false)
            .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1));

          const completeList = [...res]
            .filter((data) => data.isAvailable === false && data.isComplete === true)
            .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1));

          const sortedCompletedList = [...proceedList, ...completeList];
          totalCompletedCount.current = completeList.length;
          setRequestList(sortedCompletedList);
        });
      } catch (error) {
        console.log('MY의뢰 API 오류:', error);
      }
    }
  }, [isFocused]);

  return (
    <View style={styles.mainContainer}>
      <Header isBack={false}>MY의뢰</Header>
      <MyRequestInformation
        totalCompletedCount={totalCompletedCount.current}
        todayCompletedCount={todayCompletedCount}
      />
      <View style={styles.bodyContainer}>
        <RequestList requestList={requestList} setRequestList={setRequestList} navigation={navigation} />
      </View>
    </View>
  );
};

const countTodayCompletedRequest = (requestList: ICurrentRequest[]) => {
  const todayRequest = requestList.filter((request) => {
    if (request.expiredAt) return getKoreanTime(new Date()).getDate() === new Date(request.expiredAt).getDate();
  });
  return todayRequest.length;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 22,
    marginBottom: 20,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    borderBottomColor: Colors.Red.Lighten400,
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 24,
    paddingLeft: 35,
  },
  tabText: {
    fontSize: 18,
  },
});

export default MyRequest;

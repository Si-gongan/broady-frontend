import { useIsFocused } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { getCompletedRequest, getMyRequestAll, getProceedRequest } from '../../../api/axios';
import { authTokenState, fcmTokenState } from '../../../states';
import { ICurrentRequest } from '../../../types/request';
import { Colors } from '../../renewal';
import MyRequestInformation from './MyRequestInformation';
import RequestList from './RequestList';

const MyRequest = ({ navigation }: any) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const [proceedRequest, setProceedRequest] = useState<ICurrentRequest[]>([]);
  const [completedRequest, setCompletedRequest] = useState<ICurrentRequest[]>([]);

  const isFocused = useIsFocused();

  const lastClicked = useRef(0);

  const [requestList, setRequestList] = useState<ICurrentRequest[]>([]);
  const totalCompletedRequest = useRef(0);

  useEffect(() => {
    if (isFocused) {
      try {
        console.log('하단탭으로 진입할 때');
        getMyRequestAll(fcmToken, authToken).then((res) => {
          const sortedCompletedList = [...res].sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1));
          totalCompletedRequest.current = sortedCompletedList.length;
          // const slicedCompletedList = sortedCompletedList.slice(0, 5); // 테스트용
          // setRequestList(slicedCompletedList); // 테스트용
          setRequestList(sortedCompletedList);
        });
      } catch (error) {
        console.log('MY의뢰 API 오류:', error);
      }
    }
  }, [isFocused]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}></View>
      <MyRequestInformation totalCompletedRequest={totalCompletedRequest.current} />
      <View style={styles.bodyContainer}>
        <RequestList
          // requestList={lastClicked.current ? completedRequest : proceedRequest}
          requestList={requestList}
          setProceedRequest={setProceedRequest}
          navigation={navigation}
          status={lastClicked.current}
        />
      </View>
    </View>
  );
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

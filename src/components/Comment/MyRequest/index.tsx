import { useIsFocused } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { getCompletedRequest, getProceedRequest } from '../../../api/axios';
import { authTokenState, fcmTokenState } from '../../../states';
import { ICurrentRequest } from '../../../types/request';
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

  useEffect(() => {
    if (isFocused) {
      console.log('하단탭으로 진입할 때');
      Promise.all([getProceedRequest(fcmToken, authToken), getCompletedRequest(fcmToken, authToken)]).then((res) => {
        const sortedProceedList = [...res[0]].sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1));
        const sortedCompletedList = [...res[1]].sort((a, b) =>
          new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
        );
        // const slicedCompletedList = sortedCompletedList.slice(0, 5); // 테스트용
        // setRequestList([...sortedProceedList, ...slicedCompletedList]); // 테스트용
        setRequestList([...sortedProceedList, ...sortedCompletedList]);
      });
    }
  }, [isFocused]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}></View>
      <MyRequestInformation />

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
    marginBottom: 10,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 2,
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

const tabStyles = (clicked: boolean) =>
  StyleSheet.create({
    topTabItem: {
      width: '50%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: `${clicked ? 'black' : '#E2E2E2'}`,
      borderBottomWidth: 5,
    },
  });

export default MyRequest;

import { useIsFocused } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRecoilValue } from 'recoil';
import { getCompletedRequest, getProceedRequest } from '../../../api/axios';
import { authTokenState, fcmTokenState } from '../../../states';
import { ICurrentRequest } from '../../../types/request';
import RequestList from './RequestList';

interface ITopTab {
  id: number;
  name: string;
  clicked: boolean;
}

const MyRequest = ({ navigation }: any) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const [proceedRequest, setProceedRequest] = useState<ICurrentRequest[]>([]);
  const [completedRequest, setCompletedRequest] = useState<ICurrentRequest[]>([]);

  const isFocused = useIsFocused();

  const [topTabNavigations, setTopTabNavigations] = useState([
    {
      id: 0,
      name: '작성 중',
      clicked: true,
    },
    {
      id: 1,
      name: '완료',
      clicked: false,
    },
  ]);

  const lastClicked = useRef(0);

  const handleClickTopTab = (e: any) => {
    const clickedId = parseInt(e._dispatchInstances.child.memoizedProps.id);
    lastClicked.current = clickedId;
    setTopTabNavigations(
      topTabNavigations.map((tab: ITopTab) =>
        tab.id === clickedId ? { ...tab, clicked: true } : { ...tab, clicked: false }
      )
    );
  };

  useEffect(() => {
    if (isFocused) {
      console.log('하단탭으로 진입할 때');
      getProceedRequest(fcmToken, authToken).then((data) => setProceedRequest(data));
      getCompletedRequest(fcmToken, authToken).then((data) => setCompletedRequest(data));
    }
  }, [isFocused]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View style={styles.topTabContainer}>
          {topTabNavigations.map((tab) => (
            <TouchableOpacity style={tabStyles(tab.clicked).topTabItem} key={tab.id} onPress={handleClickTopTab}>
              <Text id={`${tab.id}`} style={styles.tabText}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <RequestList
          requestList={lastClicked.current ? completedRequest : proceedRequest}
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
    flex: 0.1,
    marginTop: 30,
    alignItems: 'center',
  },
  topTabContainer: {
    width: '90%',
    height: '60%',
    flexDirection: 'row',
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 24,
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

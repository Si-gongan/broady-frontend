import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRecoilValue } from 'recoil';
import { getRequestAll } from '../../api/axios';
import HomeInformation from '../../components/Comment/Home/HomeInformation';
import RequestList from '../../components/Comment/Home/RequestList';
import { authTokenState, fcmTokenState } from '../../states';
import { IRequest } from '../../types/request';
import { getKoreanTime } from '../../utils/time';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left-thin" style={styles.headerBackIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>홈</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Announce')}>
          <MaterialCommunityIcons name="bullhorn-variant-outline" style={styles.headerSettingIcon} />
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingBottom: 25,
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 2,
  },
  headerBackIcon: {
    fontSize: 40,
    marginLeft: 10,
  },
  headerSettingIcon: {
    fontSize: 30,
    marginRight: 10,
  },
  headerBlank: {
    fontSize: 40,
    color: 'white',
    marginRight: 5,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
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

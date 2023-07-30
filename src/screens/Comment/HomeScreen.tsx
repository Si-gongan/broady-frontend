import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { getRequestAll } from '../../api/axios';
import RequestList from '../../components/Comment/Home/RequestList';
import { authTokenState, fcmTokenState } from '../../states';
import { IRequest } from '../../types/request';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [currentRequest, setCurrentRequest] = useState<IRequest[]>([]);
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // 모든 의뢰목록 가져오기
      getRequestAll(fcmToken, authToken).then((data) => setCurrentRequest(data));
    }
  }, [isFocused]);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>의뢰목록</Text>
      </View>
      <View style={styles.bodyContainer}>
        <RequestList requestList={currentRequest} navigation={navigation} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 23,
    marginBottom: 20,
    justifyContent: 'center',
    height: 50,
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 3,
  },
  mainTitle: {
    fontSize: 24,
    paddingLeft: 35,
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 30,
  },
});

export default HomeScreen;

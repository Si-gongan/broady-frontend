import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRecoilState } from 'recoil';
import RequestList from '../../components/Comment/Home/RequestList';
import { requestListState } from '../../states/request';
import { IRequest } from '../../types/request';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [requestList, setRequestList] = useRecoilState(requestListState);
  const [currentRequest, setCurrentRequest] = useState<IRequest[]>([]);

  useEffect(() => {
    setCurrentRequest(requestList.filter((request) => request.status === 0));
  }, [requestList]);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>의뢰목록</Text>
      </View>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.bodyContainer}>
          <RequestList requestList={currentRequest} navigation={navigation} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
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
  },
});

export default HomeScreen;

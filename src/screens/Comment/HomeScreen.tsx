import { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import RequestList from '../../components/Comment/Home/RequestList';
import { IRequest } from '../../types/request';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [requestList, setrequestList] = useState<IRequest[]>([
    {
      id: 0,
      createdAt: '2023-07-11T03:12:13T',
      content: '고양이가 어떤 모습인지 자세히 설명해주세요.',
      imgSrc: require('../../../assets/sample_request.png'),
      status: 0,
    },
    {
      id: 1,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
      status: 0,
    },
    {
      id: 2,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
      status: 0,
    },
    {
      id: 3,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
      status: 0,
    },
    {
      id: 4,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
      status: 0,
    },
    {
      id: 5,
      createdAt: '2023-07-11T03:12:13T',
      content: '해설 시작한 의뢰',
      imgSrc: require('../../../assets/sample_request.png'),
      status: 1,
    },
    {
      id: 6,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
      status: 1,
    },
    {
      id: 7,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
      status: 1,
    },
  ]);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>의뢰목록</Text>
      </View>
      <View style={styles.bodyContainer}>
        <RequestList requestList={requestList} navigation={navigation} />
      </View>
    </ScrollView>
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

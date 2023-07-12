import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IRequest } from '../../../types/request';

const MyRequest = () => {
  const [requestList, setrequestList] = useState<IRequest[]>([
    {
      id: 0,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: '작성중',
    },
    {
      id: 1,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: '작성중',
    },
    {
      id: 2,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: '작성중',
    },
    {
      id: 3,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: '작성중',
    },
    {
      id: 4,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: '작성중',
    },
    {
      id: 5,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: '완료',
    },
    {
      id: 6,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: '완료',
    },
    {
      id: 7,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: '완료',
    },
  ]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View
          style={{
            width: '90%',
            height: '40%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderBottomColor: 'black',
            borderBottomWidth: 5,
          }}
        >
          <Text style={{ fontSize: 18 }}>작성중</Text>
          <Text style={{ fontSize: 18 }}>완료</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 0.2,
    marginTop: 30,
    alignItems: 'center',
  },
  bodyContainer: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 24,
  },
});

export default MyRequest;

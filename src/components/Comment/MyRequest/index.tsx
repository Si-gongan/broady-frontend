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
      status: '작성 중',
    },
    {
      id: 1,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: '작성 중',
    },
    {
      id: 2,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: '작성 중',
    },
    {
      id: 3,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: '작성 중',
    },
    {
      id: 4,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: '작성 중',
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

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View style={styles.topTabContainer}>
          {topTabNavigations.map((tab) => (
            <View style={tabStyles(tab.clicked).topTabItem} key={tab.id}>
              <Text style={{ fontSize: 18 }}>{tab.name}</Text>
            </View>
          ))}
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
  topTabContainer: {
    width: '90%',
    height: '50%',
    flexDirection: 'row',
  },
  bodyContainer: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 24,
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

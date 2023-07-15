import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IRequest } from '../../../types/request';
import RequestList from '../Home/RequestList';

interface ITopTab {
  id: number;
  name: string;
  clicked: boolean;
}

const requestStatus = ['작성 중', '완료'];

const MyRequest = () => {
  const [requestList, setRequestList] = useState<IRequest[]>([
    {
      id: 0,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: 0,
    },
    {
      id: 1,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: 0,
    },
    {
      id: 2,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: 0,
    },
    {
      id: 3,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: 0,
    },
    {
      id: 4,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: 0,
    },
    {
      id: 5,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: 1,
    },
    {
      id: 6,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: 1,
    },
    {
      id: 7,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../../assets/sample_request.png'),
      status: 1,
    },
  ]);
  const [currestRequest, setCurrentRequest] = useState<IRequest[]>([]);

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

  const handleClickTopTab = (e: any) => {
    const clickedId = parseInt(e._dispatchInstances.child.memoizedProps.id);
    setTopTabNavigations(
      topTabNavigations.map((tab: ITopTab) =>
        tab.id === clickedId ? { ...tab, clicked: true } : { ...tab, clicked: false }
      )
    );
    const result = requestList.filter((tab) => tab.status === clickedId);
    setCurrentRequest(result);
  };

  useEffect(() => {
    setCurrentRequest(requestList.filter((tab) => tab.status === 0));
  }, []);

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
        <RequestList requestList={currestRequest} />
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

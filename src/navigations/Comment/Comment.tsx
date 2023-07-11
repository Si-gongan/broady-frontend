import { View, Text, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import MyRequest from './MyRequest';
import MyPage from './MyPage';

const Tab = createBottomTabNavigator();

export const CommentTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="홈" component={Comment} />
      <Tab.Screen name="MY의뢰" component={MyRequest} />
      <Tab.Screen name="마이페이지" component={MyPage} />
    </Tab.Navigator>
  );
};

const Comment = () => {
  const [requestList, setrequestList] = useState([
    {
      id: 0,
      createdAt: '2023:07:11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
    },
    {
      id: 1,
      createdAt: '2023:07:11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
    },
    {
      id: 2,
      createdAt: '2023:07:11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
    },
    {
      id: 3,
      createdAt: '2023:07:11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
    },
  ]);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>의뢰목록</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.cardContainer}>
          {requestList.map((question, idx) => (
            <View key={idx} style={styles.imageContainer}>
              <Image source={question.imgSrc} alt="" style={styles.image} />
              <Text>2분 전</Text>
              <Text>질문내용</Text>
            </View>
          ))}
        </View>
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
    flex: 0.05,
    marginLeft: 25,
    marginTop: 10,
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 24,
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 30,
  },
  imageContainer: {
    width: '40%',
    height: 200,
    display: 'flex',
    flexBasis: '45%',
  },
  image: {
    width: '100%',
    height: '30%',
    display: 'flex',
    flex: 1,
  },
});

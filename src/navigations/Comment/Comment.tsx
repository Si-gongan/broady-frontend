import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import MyRequest from './MyRequest';
import MyPage from './MyPage';
import { Shadow } from 'react-native-shadow-2';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export const CommentTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="홈"
        component={Comment}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cards-diamond" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="MY의뢰"
        component={MyRequest}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cards-diamond" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MyPage}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cards-diamond" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

const Comment = () => {
  const [requestList, setrequestList] = useState([
    {
      id: 0,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
    },
    {
      id: 1,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
    },
    {
      id: 2,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
    },
    {
      id: 3,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
    },
    {
      id: 4,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
    },
    {
      id: 5,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
    },
    {
      id: 6,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
    },
    {
      id: 7,
      createdAt: '2023-07-11T03:12:13T',
      content: '질문 내용',
      imgSrc: require('../../../assets/sample_request.png'),
    },
  ]);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>의뢰목록</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.cardContainer}>
          {requestList.map((question, idx) => (
            <Shadow key={idx} distance={3} sides={{ top: false, bottom: true, start: true, end: true }}>
              <View style={styles.imageContainer}>
                <Image source={question.imgSrc} alt="" style={styles.image} />
                <View style={styles.imageTextContainer}>
                  <Text style={styles.createdAtRequest}>{question.createdAt}</Text>
                  <Text style={styles.requestContent}>{question.content}</Text>
                </View>
              </View>
            </Shadow>
          ))}
        </View>
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
    height: 200,
    width: 160,
    display: 'flex',
    borderRadius: 12,
    overflow: 'hidden',
    gap: 10,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '70%',
  },
  imageTextContainer: {
    flex: 1,
    gap: 10,
    marginLeft: 10,
  },
  createdAtRequest: {
    fontSize: 12,
    color: 'gray',
  },
  requestContent: {},
});

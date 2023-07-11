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
  return (
    <>
      <Text style={styles.mainTitle}>의뢰목록</Text>
      <View>
        <View style={styles.cardContainer}>
          <Text>2분 전</Text>
          <Text>질문내용</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 24,
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 20,
  },
});

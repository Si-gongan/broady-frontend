import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getPointList } from '../../api/axios/comment/user';
import AlertSection from '../../components/Comment/Mypage/AlertSection';
import NicknameSection from '../../components/Comment/Mypage/NicknameSection';
import Refund from '../../components/Comment/Mypage/Refund';
import UserDeleteSection from '../../components/Comment/Mypage/UserDeleteSection';
import CustomerService from '../../components/common/CustomerService';
import { Colors } from '../../components/renewal';
import { authTokenState, fcmTokenState, myPointState } from '../../states';
import { IPoint } from '../../types/user';

const MyPageScreen = ({ navigation }: any) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);
  const [pointList, setPointList] = useState<IPoint[]>([]);
  const [myPoint, setMyPoint] = useRecoilState<number>(myPointState);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getPointList(fcmToken, authToken).then((data) => setPointList(data));
    }
  }, [isFocused]);

  useEffect(() => {
    const total = getMyPoint(pointList);
    setMyPoint(total);
  }, [pointList]);

  return (
    <>
      <View style={styles.header}></View>
      <ScrollView contentContainerStyle={styles.container}>
        <NicknameSection navigation={navigation} />
        <Refund myPoint={myPoint} navigation={navigation} />
        <AlertSection navigation={navigation} />
        <CustomerService isBlind={false} />
        <UserDeleteSection />
      </ScrollView>
    </>
  );
};

const getMyPoint = (pointList: IPoint[]) => {
  const points = pointList.map((data) => data.point);
  const total = points.reduce((sum, value) => sum + value, 0);
  return total;
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingBottom: 22,
    borderBottomColor: Colors.Red.Lighten400,
    borderBottomWidth: 1,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 30,
    paddingBottom: 50,
    gap: 20,
  },
});

export default MyPageScreen;

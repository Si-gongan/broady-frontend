import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRecoilValue } from 'recoil';
import { getPointList } from '../../api/axios/comment/user';
import Refund from '../../components/Comment/Mypage/Refund';
import CustomerService from '../../components/common/CustomerService';
import { SigonganDesign } from '../../components/sigongan/styles';
import { useUserState } from '../../providers';
import { authTokenState, fcmTokenState } from '../../states';
import { IPoint } from '../../types/user';

const getMyPoint = (pointList: IPoint[]) => {
  const points = pointList.map((data) => data.point);
  const total = points.reduce((sum, value) => sum + value, 0);
  return total;
};
const MyPageScreen = ({ navigation }: any) => {
  const { logout } = useUserState();
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);
  const [pointList, setPointList] = useState<IPoint[]>([]);
  const [myPoint, setMyPoint] = useState<number>(0);

  useEffect(() => {
    getPointList(fcmToken, authToken).then((data) => setPointList(data));
  }, []);

  useEffect(() => {
    const total = getMyPoint(pointList);
    setMyPoint(total);
    console.log('total point: ', total);
  }, [pointList]);

  return (
    <View style={styles.container}>
      <Refund myPoint={myPoint} navigation={navigation} />
      <CustomerService />
      <View style={[SigonganDesign.myPageGrid, styles.boxContainer]}>
        <TouchableOpacity onPress={logout}>
          <Text style={SigonganDesign.myPageContent}>로그아웃</Text>
        </TouchableOpacity>

        <Text style={styles.deleteUser}>회원 탈퇴</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 30,
    gap: 20,
    flex: 1,
  },
  boxContainer: {
    paddingVertical: 17,
    paddingHorizontal: 14,
    gap: 18,
  },
  deleteUser: {
    fontSize: 14,
    color: '#D40000',
  },
});

export default MyPageScreen;

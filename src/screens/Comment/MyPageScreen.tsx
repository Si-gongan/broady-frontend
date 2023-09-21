import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getPointList } from '../../api/axios/comment/user';
import Refund from '../../components/Comment/Mypage/Refund';
import CustomerService from '../../components/common/CustomerService';
import { SigonganDesign } from '../../components/sigongan/styles';
import { useUserState } from '../../providers';
import { authTokenState, fcmTokenState, myPointState } from '../../states';
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
    <View style={styles.container}>
      <View style={[SigonganDesign.myPageGrid, styles.boxContainer]}>
        <View>
          <Text style={styles.nicknameText}>
            <Text style={styles.bold}>곰지님</Text>은 오늘까지
          </Text>
          <Text style={styles.nicknameText}>
            <Text style={styles.bold}>총 32명</Text>의 시각장애인을 도왔어요!
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Nickname')}>
          <Text style={SigonganDesign.myPageContent}>닉네임 설정</Text>
        </TouchableOpacity>
      </View>
      <Refund myPoint={myPoint} navigation={navigation} />
      <CustomerService isBlind={false} />
      <View style={[SigonganDesign.myPageGrid, styles.boxContainer]}>
        <TouchableOpacity onPress={logout}>
          <Text style={SigonganDesign.myPageContent}>로그아웃</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={logout}>
          <Text style={styles.deleteUser}>회원 탈퇴</Text>
        </TouchableOpacity>
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
  nicknameText: {
    color: '#111E4F',
    fontSize: 16,
  },
  bold: {
    fontWeight: '600',
    lineHeight: 25,
  },
});

export default MyPageScreen;

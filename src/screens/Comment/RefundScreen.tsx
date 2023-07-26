import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Header from '../../components/common/Header';
import { commentColor, commentFont } from '../../components/Comment/styles';
import RefundPointList from '../../components/Comment/Mypage/RefundPointList';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accountState, authTokenState, fcmTokenState } from '../../states';
import { getPointList, requestRefundPoint } from '../../api/axios';
import { IPoint } from '../../types/user';
import { Keyboard } from 'react-native';
import { AuthColor } from '../../components/auth/styles';

const getMyPoint = (pointList: IPoint[]) => {
  const points = pointList.map((data) => data.point);
  const total = points.reduce((sum, value) => sum + value, 0);
  return total;
};

const RefundScreen = ({ navigation }: any) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);
  const [account, setAccount] = useRecoilState(accountState);
  const [accountNumberInput, setAccountNumberInput] = useState<string>(account);
  const [refundPoint, setRefundPoint] = useState<string>('');
  const [pointList, setPointList] = useState<IPoint[]>([]);
  const [myPoint, setMyPoint] = useState(0);

  const [isRefunded, setIsRefunded] = useState(false);

  const onClickRefundButton = () => {
    Keyboard.dismiss();
    requestRefundPoint(parseInt(refundPoint), accountNumberInput, fcmToken, authToken).then((data) =>
      console.log(data)
    );
    setAccount(accountNumberInput);
    setAccountNumberInput('');
    setRefundPoint('');
  };

  const handleChangeInput = (text: string) => {
    if (parseInt(text) >= 500) setIsRefunded(true);
    else setIsRefunded(false);

    const numberReg = text.replace(/[^0-9]/g, '');
    setRefundPoint(numberReg);
  };

  useEffect(() => {
    // API 수정 필요.
    // getPointList(fcmToken, authToken).then((data) => setPointList(data));
  }, []);

  useEffect(() => {
    const total = getMyPoint(pointList);
    setMyPoint(total);
    console.log('total point: ', total);
  }, [pointList]);

  return (
    <View style={styles.refundContainer}>
      <Header navigation={navigation}>환급 신청</Header>
      <View style={styles.refundPointHeader}>
        <Text style={commentFont.title}>포인트 환급</Text>
      </View>
      <View style={styles.refundBodyContainer}>
        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 16 }}>입금 받을 계좌 입력</Text>
          <TextInput
            placeholder="계좌번호 (-)없이 입력"
            placeholderTextColor="#5E5E5E"
            onChangeText={(text) => setAccountNumberInput(text)}
            value={accountNumberInput}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 16 }}>신청 포인트 입력 (최대 {myPoint}P)</Text>
          <TextInput
            placeholder="신청 포인트 입력"
            placeholderTextColor="#5E5E5E"
            keyboardType="decimal-pad"
            onChangeText={(text) => handleChangeInput(text)}
            value={refundPoint}
            style={styles.inputBox}
            inputMode="decimal"
          />
        </View>
        <TouchableOpacity
          style={[styles.refundBtn, isRefunded ? AuthColor.secondary : AuthColor.quaternary]}
          activeOpacity={0.6}
          onPress={onClickRefundButton}
          disabled={!isRefunded}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>환급 신청</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.6 }}>
        <View style={styles.pointList}>
          <Text style={commentFont.title}>포인트 내역</Text>
        </View>
        <RefundPointList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  refundContainer: {
    flex: 1,
  },
  refundPointHeader: {
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 20,
  },
  refundBodyContainer: {
    flex: 0.45,
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
    height: 100,
    justifyContent: 'center',
  },
  refundPointContainer: {
    flex: 0.4,
  },
  inputBox: {
    ...commentColor.inputBackgroundColor,
    marginTop: 5,
    paddingLeft: 10,
    height: 50,
    fontSize: 16,
    borderRadius: 10,
  },
  refundBtn: {
    width: '60%',
    height: 40,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
  },
  pointList: {
    marginLeft: 20,
    marginBottom: 20,
  },
});

export default RefundScreen;

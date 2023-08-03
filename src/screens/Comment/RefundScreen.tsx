import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import Header from '../../components/common/Header';
import { commentColor, commentFont } from '../../components/Comment/styles';
import RefundPointList from '../../components/Comment/Mypage/RefundPointList';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authTokenState, fcmTokenState, myPointState } from '../../states';
import { getPointList, requestRefundPoint } from '../../api/axios';
import { IPoint } from '../../types/user';
import { Keyboard } from 'react-native';
import { AuthColor } from '../../components/auth/styles';
import { ACCOUNT_NUMBER, getData, storeData } from '../../components/common/async-storage';
import { useIsFocused } from '@react-navigation/native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const RefundScreen = ({ navigation }: any) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const [accountNumberInput, setAccountNumberInput] = useState<string>('');
  const [refundPoint, setRefundPoint] = useState<string>('');
  const [pointList, setPointList] = useState<IPoint[]>([]);
  const [myPoint, setMyPoint] = useRecoilState(myPointState);

  const [isRefunded, setIsRefunded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  const onClickRefundButton = async () => {
    Keyboard.dismiss();
    setMyPoint((prevPoint) => prevPoint - parseInt(refundPoint));
    requestRefundPoint(parseInt(refundPoint), accountNumberInput, fcmToken, authToken)
      .then((data) => {
        if (data.code === 0) getPointList(fcmToken, authToken).then((data) => setPointList(data));
      })
      .catch(() => {
        Alert.alert('통신에 에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
        setMyPoint((prevPoint) => prevPoint + parseInt(refundPoint));
      });
    storeData(ACCOUNT_NUMBER, accountNumberInput);

    setRefundPoint('');
    setIsRefunded(false);
  };

  const handleChangeInput = (text: string) => {
    if (parseInt(text) >= 500 && parseInt(text) < myPoint) setIsRefunded(true);
    else setIsRefunded(false);

    const numberReg = text.replace(/[^0-9]/g, '');
    setRefundPoint(numberReg);
  };

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      getData(ACCOUNT_NUMBER).then((data) => {
        if (typeof data === 'string') setAccountNumberInput(data);
      });
      getPointList(fcmToken, authToken)
        .then((data) => {
          setPointList(data);
          setIsLoading(false);
        })
        .catch((error) => console.log('POINT ERROR ', error));
    }
  }, [isFocused]);

  return (
    <View style={styles.refundContainer}>
      <ScrollView scrollEnabled={false}>
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
            <Text style={{ fontSize: 16 }}>신청 포인트 입력 (최소 500P, 최대 {myPoint}P)</Text>
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
        <View style={styles.refundPointContainer}>
          <View
            style={{
              marginLeft: 20,
              marginBottom: 20,
            }}
          >
            <Text style={commentFont.title}>포인트 내역</Text>
          </View>
          {isLoading ? (
            <ActivityIndicator size="small" color="gray" />
          ) : pointList.length === 0 ? (
            <View style={styles.loadingPointList}>
              <Text style={{ color: 'gray' }}>포인트 내역이 존재하지 않습니다. 해설을 진행해주세요!</Text>
            </View>
          ) : (
            <RefundPointList pointList={pointList} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  refundContainer: {
    // flex: 1,
  },
  refundPointHeader: {
    marginTop: 30,
    marginLeft: 20,
    height: SCREEN_HEIGHT * 0.05,
  },
  refundBodyContainer: {
    // flex: 0.45,
    height: SCREEN_HEIGHT * 0.35,
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
    height: 100,
    justifyContent: 'center',
  },
  refundPointContainer: {
    // flex: 0.4,
    // marginLeft: 20,
    // marginBottom: 20,
    height: SCREEN_HEIGHT * 0.6,
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
    marginTop: 10,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
  },
  pointList: {
    // marginLeft: 20,
    // marginBottom: 20,
  },
  loadingPointList: {
    borderTopWidth: 2,
    borderColor: '#E8E8E8',
    gap: 10,
    marginHorizontal: 15,
    paddingVertical: 20,
  },
});

export default RefundScreen;

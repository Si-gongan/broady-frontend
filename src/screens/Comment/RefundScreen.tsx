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
  SafeAreaView,
} from 'react-native';
import { commentFont } from '../../components/Comment/styles';
import RefundPointList from '../../components/Comment/Mypage/RefundPointList';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authTokenState, fcmTokenState, myPointState } from '../../states';
import { getPointList, requestRefundPoint } from '../../api/axios';
import { IPoint } from '../../types/user';
import { Keyboard } from 'react-native';
import { ACCOUNT_HOLDER, ACCOUNT_NUMBER, getData, storeData } from '../../library';
import { useIsFocused } from '@react-navigation/native';
import { BomHeader, Colors, PaddingHorizontal } from '../../components/renewal';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const RefundScreen = () => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const [accountHolder, setAccountHolder] = useState<string>('');
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
    requestRefundPoint(parseInt(refundPoint), accountNumberInput, accountHolder, fcmToken, authToken)
      .then((data) => {
        if (data.code === 0)
          getPointList(fcmToken, authToken).then((data) => {
            const sortedPointList = [...data].sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
            setPointList(sortedPointList);
          });
      })
      .catch(() => {
        Alert.alert('통신에 에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
        setMyPoint((prevPoint) => prevPoint + parseInt(refundPoint));
      });
    storeData(ACCOUNT_NUMBER, accountNumberInput);
    storeData(ACCOUNT_HOLDER, accountHolder);

    setRefundPoint('');
    setIsRefunded(false);
  };

  const handleChangeInput = (text: string) => {
    if (parseInt(text) >= 500 && parseInt(text) <= myPoint) setIsRefunded(true);
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
      getData(ACCOUNT_HOLDER).then((data) => {
        if (typeof data === 'string') setAccountHolder(data);
      });

      getPointList(fcmToken, authToken)
        .then((data) => {
          const sortedPointList = [...data].sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
          setPointList(sortedPointList);
          setIsLoading(false);
        })
        .catch((error) => console.log('POINT ERROR ', error));
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BomHeader text="환급 신청" isBottomBorder />

      <PaddingHorizontal value={0}>
        <ScrollView scrollEnabled={false}>
          <View style={styles.refundPointHeader}>
            <Text style={commentFont.TITLE}>포인트 환급 : {myPoint} P</Text>
          </View>
          <View style={styles.refundBodyContainer}>
            <View style={styles.inputContainer}>
              <Text style={commentFont.BODY1}>입금 받을 계좌</Text>
              <TextInput
                placeholder="ex) 우리 1234-567-8910"
                placeholderTextColor="#5E5E5E"
                onChangeText={(text) => setAccountNumberInput(text)}
                value={accountNumberInput}
                style={styles.inputBox}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={commentFont.BODY1}>예금주명</Text>
              <TextInput
                placeholder="홍길동"
                placeholderTextColor="#5E5E5E"
                onChangeText={(text) => setAccountHolder(text)}
                value={accountHolder}
                style={styles.inputBox}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={commentFont.BODY1}>신청 포인트 입력 ( 500P 부터 환급 가능 )</Text>
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
              style={[
                styles.refundBtn,
                isRefunded ? { backgroundColor: Colors.Red.Default } : { backgroundColor: Colors.Red.Lighten300 },
              ]}
              activeOpacity={0.6}
              onPress={onClickRefundButton}
              disabled={!isRefunded}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>환급 신청</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.refundPointContainer}>
            <View style={{ margin: 10 }}>
              <Text style={commentFont.TITLE}>포인트 내역</Text>
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
      </PaddingHorizontal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  refundContainer: {},
  refundPointHeader: {
    marginVertical: 20,
    marginLeft: 20,
  },
  refundBodyContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
    height: 100,
    justifyContent: 'center',
  },
  refundPointContainer: {
    height: SCREEN_HEIGHT * 0.6,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#767676',
    marginTop: 10,
    paddingLeft: 10,
    height: 50,
    borderRadius: 10,
    ...commentFont.BODY1,
  },
  refundBtn: {
    width: '90%',
    height: 50,
    marginTop: 20,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  pointList: {},
  loadingPointList: {
    borderTopWidth: 2,
    borderColor: '#E8E8E8',
    gap: 10,
    marginHorizontal: 15,
    paddingVertical: 20,
  },
});

export default RefundScreen;

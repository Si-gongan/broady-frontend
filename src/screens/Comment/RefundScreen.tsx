import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Header from '../../components/common/Header';
import { commentColor, commentFont } from '../../components/Comment/styles';
import RefundPointList from '../../components/Comment/Mypage/RefundPointList';

const RefundScreen = ({ navigation }: any) => {
  const [accountNumber, setAccountNumber] = useState<string>();
  const [refundPoint, setRefundPoint] = useState<string>();

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
            onChangeText={(text) => setAccountNumber(text)}
            value={accountNumber}
            style={styles.inputBox}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 16 }}>신청 포인트 입력 (최대 3200P)</Text>
          <TextInput
            placeholder="신청 포인트 입력"
            placeholderTextColor="#5E5E5E"
            keyboardType="decimal-pad"
            onChangeText={(text) => setRefundPoint(text)}
            value={refundPoint}
            style={styles.inputBox}
          />
        </View>
        <TouchableOpacity style={styles.refundBtn}>
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

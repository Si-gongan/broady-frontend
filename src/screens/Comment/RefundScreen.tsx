import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Header from '../../components/common/Header';
import { commentColor, commentFont } from '../../components/Comment/styles';

const RefundScreen = ({ navigation }: any) => {
  const [accountNumber, setAccountNumber] = useState<string>();
  const [refundPoint, setRefundPoint] = useState<number>();

  return (
    <View style={styles.refundContainer}>
      <Header navigation={navigation}>환급 신청</Header>
      <View style={{ marginTop: 30, marginLeft: 20 }}>
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
            onChangeText={(text) => setRefundPoint(parseInt(text))}
            value={accountNumber}
            style={styles.inputBox}
          />
        </View>
        <TouchableOpacity style={styles.refundBtn}>
          <Text style={{ color: 'white', fontSize: 16 }}>환급 신청</Text>
        </TouchableOpacity>
      </View>
      <Text>포인트 내역</Text>
      <View style={styles.refundPointContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text>해설 작성</Text>
          <Text>+50</Text>
        </View>
        <Text>23.07.01 14:20</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  refundContainer: {
    flex: 1,
  },
  refundBodyContainer: {
    flex: 0.5,
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
    // paddingTop: 15,
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
});

export default RefundScreen;

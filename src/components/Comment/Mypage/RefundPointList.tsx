import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import RefundPointItem from './RefundPointItem';

interface IRefund {
  id: number;
  content: string;
  point: number;
  isGetPoint: boolean;
  refundedAt: string;
}

const RefundPointList = () => {
  const [refundList, setRefundList] = useState([
    {
      id: 0,
      content: '해설 작성',
      point: 50,
      isGetPoint: true,
      refundedAt: '23.07.01 14:20',
    },
    {
      id: 1,
      content: '포인트 환급',
      point: 1500,
      isGetPoint: false,
      refundedAt: '23.07.01 14:20',
    },
    {
      id: 2,
      content: '해설 작성',
      point: 50,
      isGetPoint: true,
      refundedAt: '23.07.01 14:20',
    },
  ]);
  return (
    <ScrollView style={styles.refundPointContainer}>
      {refundList.map((refund: IRefund, idx: number) => (
        <RefundPointItem key={idx} refund={refund}></RefundPointItem>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  refundPointContainer: {},
  inputBox: {
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
  refundPointItem: {},
});

export default RefundPointList;

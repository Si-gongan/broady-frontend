import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { IPoint } from '../../../types/user';
import RefundPointItem from './RefundPointItem';

const RefundPointList = ({ pointList }: { pointList: IPoint[] }) => {
  return (
    <ScrollView style={styles.refundPointContainer}>
      {pointList.map((refund: IPoint, idx: number) => (
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
});

export default RefundPointList;

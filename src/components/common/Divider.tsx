import { View, Text } from 'react-native';
import React from 'react';

export default function Divider({
  width,
  color,
  direction,
}: {
  width: number;
  color: string;
  direction: 'horizontal' | 'vertical';
}) {
  return (
    <View
      style={{
        width: direction === 'horizontal' ? '100%' : width,
        height: direction === 'horizontal' ? width : '100%',
        backgroundColor: color,
      }}
    />
  );
}

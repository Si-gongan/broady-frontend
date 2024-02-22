import { View, Text } from 'react-native';
import React from 'react';
import { GET_MARGIN } from '@/constants/theme';

export default function ContentsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        paddingHorizontal: GET_MARGIN('h3'),
      }}
    >
      {children}
    </View>
  );
}

export const CenteredContentsWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </View>
  );
};

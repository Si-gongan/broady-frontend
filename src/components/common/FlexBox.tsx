import React from 'react';
import { View } from 'react-native';

const FlexBox = ({
  direction = 'row',
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  children,
  gap,
  styles,
  accessible = false,
}: {
  direction?: 'row' | 'column';
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  gap?: number;
  children: React.ReactNode;
  padding?: number;
  styles?: any;
  accessible?: boolean;
}) => {
  return (
    <View
      style={{
        flexDirection: direction,
        justifyContent: justifyContent,
        alignItems: alignItems,
        ...(gap ? { gap } : {}),
        ...styles,
      }}
      accessible={accessible}
    >
      {children}
    </View>
  );
};

export default FlexBox;

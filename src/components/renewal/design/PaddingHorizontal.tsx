import { ReactNode } from 'react';
import { View } from 'react-native';

type IPaddingHorizontalProps = {
  children?: ReactNode;
  value: number;
};

export const PaddingHorizontal = ({ children, value }: IPaddingHorizontalProps) => {
  return <View style={{ flex: 1, paddingHorizontal: value }}>{children}</View>;
};

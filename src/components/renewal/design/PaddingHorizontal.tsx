import { ReactNode } from 'react';
import { View } from 'react-native';

type IPaddingHorizontalProps = {
  value: number;

  children?: ReactNode;
  noflex?: boolean;
};

export const PaddingHorizontal = ({ children, value, noflex = false }: IPaddingHorizontalProps) => {
  return <View style={[{ width: '100%', paddingHorizontal: value }, !noflex && { flex: 1 }]}>{children}</View>;
};

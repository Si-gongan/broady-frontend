import { THEME } from '@/constants/theme';
import React from 'react';
import { TextStyle } from 'react-native';
import styled from 'styled-components/native';

export type TypoSize = 'body_sm' | 'body_md' | 'body_lg' | 'body_xl' | 'h1' | 'h2' | 'h3';

export type WeightStyles = 'thin' | 'extraLight' | 'light' | 'regular' | 'medium' | 'bold' | 'semibold' | 'extraBold';

const $sizeStyles = {
  body_sm: { fontSize: THEME.FONT.SIZE.body_sm },
  body_md: { fontSize: THEME.FONT.SIZE.body_md },
  body_lg: { fontSize: THEME.FONT.SIZE.body_lg },
  body_xl: { fontSize: THEME.FONT.SIZE.body_xl },
  h1: { fontSize: THEME.FONT.SIZE.h1 },
  h2: { fontSize: THEME.FONT.SIZE.h2 },
  h3: { fontSize: THEME.FONT.SIZE.h3 },
};

const $weightStyles = {
  thin: { fontFamily: 'thin' },
  extraLight: { fontFamily: 'extraLight' },
  light: { fontFamily: 'light' },
  regular: { fontFamily: 'regular' },
  medium: { fontFamily: 'medium' },
  bold: { fontFamily: 'bold' },
  semibold: { fontFamily: 'semibold' },
  extraBold: { fontFamily: 'extraBold' },
};

const TextStyling = styled.Text<{
  size: TypoSize;
  weight: WeightStyles;
  color: string;
}>`
  font-size: ${({ size }) => $sizeStyles[size].fontSize}px;
  font-family: ${({ weight }) => $weightStyles[weight].fontFamily};
  color: ${(props) => (props.color === 'default' ? props.theme.COLOR.FONT.CONTENT : props.color)};
  font-weight: 400;
`;

interface TextProps {
  children: string | string[] | number | JSX.Element | JSX.Element[];
  size?: TypoSize;
  weight?: WeightStyles;
  color?: string;
  styles?: TextStyle;
}

const Typography = ({ children, size = 'body_md', weight = 'regular', color = 'default', styles }: TextProps) => {
  return (
    <TextStyling size={size} weight={weight} color={color} style={styles}>
      {children}
    </TextStyling>
  );
};

export default Typography;

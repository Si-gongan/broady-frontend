import { StyleSheet } from 'react-native';

export const Colors = {
  Red: {
    Darken400: '#400615',
    Darken300: '#800B2A',
    Darken200: '#C01140',
    Darken100: '#EC2B5E',
    Default: '#F7A6BC',
    Lighten100: '#F589A5',
    Lighten200: '#F7A6BC',
    Lighten300: '#FAC4D2',
    Lighten400: '#FCE1E9',
  },
  Blue: {
    Darken400: '#09103E',
    Darken300: '#12207D',
    Darken200: '#1A31BB',
    Darken100: '#3A51E3',
    Default: '#7888EC',
    Lighten100: '#93A0F0',
    Lighten200: '#AEB8F4',
    Lighten300: '#C9CFF7',
    Lighten400: '#E4E7FB',
  },
  Purple: {
    Darken400: '#160E34',
    Darken300: '#2D1C68',
    Darken200: '#432B9D',
    Darken100: '#5D3FCB',
    Default: '#8973D9',
    Lighten100: '#A18FE1',
    Lighten200: '#B8ABE8',
    Lighten300: '#D0C7F0',
    Lighten400: '#E7E3F7',
  },
  None: {
    Darken400: '#000',
    Darken300: '#333',
    Darken200: '#767676',
    Darken100: '#AAA',
    Default: '#CCC',
    Lighten100: '#E5E5E5',
    Lighten200: '#EEE',
    Lighten300: '#F9F9F9',
    Lighten400: '#FFF',
  },
  Font: {
    primary: '#565656',
    secondary: '#767676',
  },
} as const;

export const Fonts = StyleSheet.create({
  Bold48: {
    fontSize: 48,
    fontStyle: 'normal',
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  Bold40: {
    fontSize: 40,
    fontStyle: 'normal',
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  Bold32: {
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  Bold28: {
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  Bold24: {
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  Bold20: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  Bold16: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  Bold14: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  Regular20: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  Regular16: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  Regular14: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  Regular12: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  Regular10: {
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  Medium16: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    fontFamily: 'Inter',
  },
});

export const Utils = {
  backgroundColor: (s: string) => ({ backgroundColor: s }),
  borderColor: (s: string) => ({ borderWidth: 1, borderColor: s }),
  borderBottomColor: (s: string) => ({ borderBottomWidth: 1, borderBottomColor: s }),
  fontColor: (s: string) => ({ color: s }),
  safePaddingBottom: (i: number) => ({ paddingBottom: i || 20 }),
};

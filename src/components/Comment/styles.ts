import { StyleSheet } from 'react-native';
import { Colors } from '../renewal';

export const commentColor = StyleSheet.create({
  inputBackgroundColor: {
    backgroundColor: '#E8E8E8',
  },
  inputTextColor: {
    color: '#5E5E5E',
  },
});

export const commentFont = StyleSheet.create({
  SLOGAN: {
    fontSize: 28,
    fontWeight: '700',
    color: '#565656',
  },
  HEADER: {
    fontSize: 20,
    fontWeight: '700',
    color: '#565656',
  },
  HEADLINE: {
    fontSize: 20,
    fontWeight: '400',
    color: '#565656',
  },
  TITLE: {
    fontSize: 16,
    fontWeight: '700',
    color: '#565656',
  },
  SMALL_TITLE: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.Red.Lighten100,
  },
  BODY1: {
    fontSize: 16,
    fontWeight: '400',
    color: '#565656',
  },
  BODY2: {
    fontSize: 12,
    fontWeight: '400',
    color: '#767676',
  },
});

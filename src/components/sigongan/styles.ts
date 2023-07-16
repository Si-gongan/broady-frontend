import { StyleSheet } from 'react-native';

export const SigonganColor = StyleSheet.create({
  backgroundPrimary: {
    backgroundColor: '#fff',
  },
  backgroundSecondary: {
    backgroundColor: '#000',
  },
  backgroundTeritary: {
    backgroundColor: '#F2F2F2',
  },
  backgroundQuaternary: {
    backgroundColor: '#E8E8E8',
  },

  contentPrimary: {
    color: '#000',
  },
  contentSecondary: {
    color: '#fff',
  },
  contentTeritary: {
    color: '#5E5E5E',
  },

  iconPrimary: {
    color: '#AFAFAF',
  },
});

export const SigonganFont = StyleSheet.create({
  primary: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '400',
  },
  secondary: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '400',
  },
  teritary: {
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '400',
  },
  quaternary: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});

export const SigonganDesign = StyleSheet.create({
  borderOpaque: {
    width: '100%',
    height: 1,

    backgroundColor: '#E8E8E8',
  },
  borderOpaqueInObject: {
    borderWidth: 2,
    borderColor: '#E8E8E8',
  },
});

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
  backgroundquinary: {
    backgroundColor: '#3B4A89',
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
  contentQuaternary: {
    color: '#3B4A89',
  },
  contentQuinary: {
    color: '#777',
  },
  contentSenary: {
    color: '#6E6E6E',
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

  speechBubble1: {
    ...SigonganColor.backgroundquinary,

    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 0,

    maxWidth: 201,
    alignSelf: 'flex-end',

    paddingLeft: 12,
    paddingTop: 10,
    paddingBottom: 9,
    paddingRight: 9,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },

  speechBubble2: {
    ...SigonganColor.backgroundPrimary,

    borderWidth: 0.3,
    borderColor: SigonganColor.contentQuaternary.color,

    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 13,

    maxWidth: 214,
    alignSelf: 'flex-start',

    paddingLeft: 13,
    paddingTop: 10,
    paddingBottom: 8,
    paddingRight: 13,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});

import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../renewal';

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
  contentSeptenary: {
    color: '#111E4F',
  },

  iconPrimary: {
    color: '#AFAFAF',
  },
});

export const SigonganFont = StyleSheet.create({
  primary: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '400',
  },
  secondary: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
  },
  teritary: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
  },
  quaternary: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
  },
});

export const SigonganShadow = StyleSheet.create({
  shadowBottomLow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      android: {
        elevation: 7,
      },
    }),
  },
  shadowBottomHigh: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  shadowTopLow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      android: {
        elevation: 7,
      },
    }),
  },
  shadowTopHigh: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 20,
      },
    }),
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

  myPageGrid: {
    borderWidth: 1,
    borderColor: Colors.Red.Lighten300,

    borderRadius: 10,
    width: 347,
  },
  myPageTitle: {
    ...SigonganFont.primary,
    ...SigonganColor.contentSeptenary,
    fontFamily: 'Inter-Bold',
  },
  myPageContent: {
    ...SigonganFont.teritary,
    ...SigonganColor.contentSeptenary,
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

    ...SigonganShadow.shadowBottomLow,
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

export const SigonganResponsive = {
  textCardWidth: () => (Platform.OS === 'ios' ? 247 : 224),
  imageWidth: () => (Platform.OS === 'ios' ? 338 : 315),
  aiChatInputWidth: () => (Platform.OS === 'ios' ? 281 : 258),
};

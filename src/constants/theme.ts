export type ThemeType = typeof THEME;

export const THEME = {
  COLOR: {
    ORANGE: '#F26716',
    WHITE: '#FFFFFF',
    FONT: {
      TITLE: '#565656',
      CONTENT: '#000000',
      CONTENTDIM: '#B3B3B3',
      SUB_CONTENT: '#838383',
      SUB_CONTENTDIM: '#666666',
      WARN: '#D23928',
    },
    GRAY_ICON: '#777777',
    GRAY_50: '#F1F1F1',
    GRAY_500: '#808080',
    BD_1: '#565656',
    BD_2: '#C6C6C6',
    BD_3: '#E8E8E8',
    BD_4: '#4D4D4D',
    BD_5: '#DADADA',
    BLACK: '#000000',
    BACKGROUND: '#E8E8E8',
    BACKGROUND_ORANGE: '#FFF2E6',
  },
  FONT: {
    SIZE: {
      h1: 46,
      h2: 40,
      h3: 30,
      body_sm: 14,
      body_md: 16,
      body_lg: 18,
      body_xl: 20,
      body_xxl: 24,
      text_md: 13,
      text_sm: 12,
    },
  },
  STYLES: {
    RADIUS: {
      xl: 20,
      lg: 16,
      md: 12,
      sm: 8,
    },
  },
  SPACING: {
    PADDING: {
      P1: 32, // 고정
      P2: 24, // 고정
      P3: 18, // 고정
      P4: 16, // 고정
      P5: 12,
      P6: 10,
    },
    MARGIN: {
      h1: 40,
      h2: 30,
      h3: 20,
      h4: 10,
      h5: 8,
      h6: 6,
      layout_xl: 80,
      layout_lg: 60,
      layout_md: 40,
      layout_sm: 20,
    },
  },
};

export const GET_MARGIN = (size: keyof typeof THEME.SPACING.MARGIN) => {
  return THEME.SPACING.MARGIN[size];
};

export const GET_PADDING = (size: keyof typeof THEME.SPACING.PADDING) => {
  return THEME.SPACING.PADDING[size];
};

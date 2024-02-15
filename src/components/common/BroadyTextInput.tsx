import { TextInput, View } from 'react-native';
import React from 'react';
import { THEME } from '@/constants/theme';

export type TextInputType = 'Border' | 'gray';
export type TextInputPaddingType = 'Border' | 'gray' | 'small';

const TextInputStyle = {
  Border: {
    backgroundColor: THEME.COLOR.WHITE,
    borderRadius: THEME.STYLES.RADIUS.md,
    borderColor: THEME.COLOR.FONT.TITLE,
    borderWidth: 1,
    padding: 10,
  },
  gray: {
    backgroundColor: THEME.COLOR.BACKGROUND,
    borderColor: 'transparent',
    borderRadius: THEME.STYLES.RADIUS.md,
    padding: 10,
  },
};

const TextInputPadding = {
  Border: {
    paddingVertical: THEME.SPACING.PADDING.P4,
    paddingHorizontal: THEME.SPACING.PADDING.P5,
  },
  gray: {
    paddingVertical: THEME.SPACING.PADDING.P4,
    paddingHorizontal: THEME.SPACING.PADDING.P5,
  },
  small: {
    paddingVertical: THEME.SPACING.PADDING.P6,
    paddingHorizontal: THEME.SPACING.PADDING.P5,
  },
};

export default function BroadyTextInput({
  variant,
  paddingVariant,
  placeholder = '',
  text,
  onChangeText,
  fixedWidth,
}: {
  fixedWidth?: number;
  variant: TextInputType;
  paddingVariant?: TextInputPaddingType;
  text: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}) {
  return (
    <View
      style={{
        width: fixedWidth ?? '100%',
        ...TextInputStyle[variant],
        ...TextInputPadding[paddingVariant ?? variant],
      }}
    >
      <TextInput
        value={text}
        style={{
          fontSize: THEME.FONT.SIZE.body_md,
        }}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    </View>
  );
}

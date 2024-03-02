import { Pressable, TextInput, View } from 'react-native';
import React from 'react';
import { THEME } from '@/constants/theme';
import { Image } from 'react-native';

export type TextInputType = 'password' | 'text' | 'email';
export type TextInputVariantType = 'Border' | 'gray';
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
    borderRadius: THEME.STYLES.RADIUS.sm,
    borderWidth: 1,
    padding: 10,
  },
};

const TextInputPadding = {
  Border: {
    paddingVertical: THEME.SPACING.PADDING.P3,
    paddingHorizontal: THEME.SPACING.PADDING.P3,
  },
  gray: {
    paddingVertical: THEME.SPACING.PADDING.P3,
    paddingHorizontal: THEME.SPACING.PADDING.P3,
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
  borderColor,
  onChangeText,
  maxLength,
  fixedWidth,
  initialType,
  onFocus,
}: {
  initialType: 'password' | 'text' | 'email';
  fixedWidth?: number;
  maxLength?: number;
  variant: TextInputVariantType;
  paddingVariant?: TextInputPaddingType;
  borderColor?: string;
  text: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFocus?: () => void;
}) {
  const initialSecure = initialType === 'password' ? true : false;
  const [isSecure, setIsSecure] = React.useState(initialSecure);

  return (
    <View
      style={{
        width: fixedWidth ?? '100%',
        ...TextInputStyle[variant],
        ...TextInputPadding[paddingVariant ?? variant],
        position: 'relative',
        ...(borderColor && { borderColor }),
      }}
    >
      <TextInput
        {...(onFocus && { onFocus })}
        value={text}
        secureTextEntry={isSecure ? true : false}
        placeholder={placeholder}
        placeholderTextColor={'#5E5E5E'}
        onChangeText={onChangeText}
        maxLength={maxLength}
        style={{
          width: initialSecure ? '90%' : '100%',
          fontSize: THEME.FONT.SIZE.body_md,
        }}
      />
      {initialType === 'password' && (
        <Pressable
          style={{
            position: 'absolute',
            right: 20,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
          }}
          onPress={() => setIsSecure(!isSecure)}
        >
          <Image source={require('@/../assets/images/auth/eyes.png')} />
        </Pressable>
      )}
    </View>
  );
}

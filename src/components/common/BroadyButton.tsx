import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Typography from './Typography';
import { THEME } from '@/constants/theme';

type ButtonTheme = 'primary' | 'secondary' | 'grey' | 'darkButton' | 'borderButton' | 'alert';

const ButtonColor = {
  primary: {
    background: {
      def: THEME.COLOR.MINT_2,
      pressed: THEME.COLOR.MINT_2,
      disabled: THEME.COLOR.GRAY_500,
    },
    border: {
      def: 'transparent',
      pressed: 'transparent',
      disabled: 'transparent',
    },
    font: {
      size: 'body_lg',
      weight: 'bold',
      def: THEME.COLOR.WHITE,
    },
  },
  secondary: {
    background: {
      def: THEME.COLOR.MINT,
      pressed: THEME.COLOR.MINT,
      disabled: THEME.COLOR.MINT,
    },
    border: {
      def: 'transparent',
      pressed: 'transparent',
      disabled: 'transparent',
    },
    font: {
      size: 'body_lg',
      weight: 'bold',
      def: THEME.COLOR.GRAY_500,
    },
  },
  grey: {
    background: {
      def: THEME.COLOR.GRAY_50,
      pressed: THEME.COLOR.GRAY_50,
      disabled: THEME.COLOR.GRAY_50,
    },
    border: {
      def: 'transparent',
      pressed: 'transparent',
      disabled: 'transparent',
    },
    font: {
      size: 'body_lg',
      weight: 'bold',
      def: THEME.COLOR.GRAY_500,
    },
  },
  alert: {
    background: {
      def: THEME.COLOR.ALERT_RED,
      pressed: THEME.COLOR.ALERT_RED,
      disabled: THEME.COLOR.ALERT_RED,
    },
    border: {
      def: 'transparent',
      pressed: 'transparent',
      disabled: 'transparent',
    },
    font: {
      size: 'body_lg',
      weight: 'bold',
      def: THEME.COLOR.WHITE,
    },
  },
  darkButton: {
    background: {
      def: THEME.COLOR.BLACK_2,
      pressed: THEME.COLOR.BLACK_2,
      disabled: THEME.COLOR.BLACK_2,
    },
    border: {
      def: 'transparent',
      pressed: 'transparent',
      disabled: 'transparent',
    },
    font: {
      size: 'body_lg',
      weight: 'bold',
      def: THEME.COLOR.WHITE,
    },
  },
  borderButton: {
    background: {
      def: THEME.COLOR.WHITE,
      pressed: THEME.COLOR.WHITE,
      disabled: THEME.COLOR.WHITE,
    },
    border: {
      def: THEME.COLOR.BD_1,
      pressed: THEME.COLOR.BD_1,
      disabled: THEME.COLOR.BD_1,
    },
    font: {
      size: 'body_md',
      weight: 'regular',
      def: THEME.COLOR.BD_1,
    },
  },
} as const;

const ButtonPadding = {
  primary: {
    paddingHorizontal: THEME.SPACING.PADDING.P2,
    paddingVertical: THEME.SPACING.PADDING.P3 + 2,
  },
  secondary: {
    paddingHorizontal: THEME.SPACING.PADDING.P2,
    paddingVertical: THEME.SPACING.PADDING.P3 + 2,
  },
  grey: {
    paddingHorizontal: THEME.SPACING.PADDING.P2,
    paddingVertical: THEME.SPACING.PADDING.P3 + 2,
  },
  alert: {
    paddingHorizontal: THEME.SPACING.PADDING.P2,
    paddingVertical: THEME.SPACING.PADDING.P3 + 2,
  },
  darkButton: {
    paddingHorizontal: THEME.SPACING.PADDING.P2,
    paddingVertical: THEME.SPACING.PADDING.P3 + 2,
  },
  borderButton: {
    paddingHorizontal: THEME.SPACING.PADDING.P3,
    paddingVertical: THEME.SPACING.PADDING.P4,
  },
} as const;

const ButtonRadius = {
  primary: THEME.STYLES.RADIUS.lg,
  secondary: THEME.STYLES.RADIUS.lg,
  grey: THEME.STYLES.RADIUS.lg,
  alert: THEME.STYLES.RADIUS.lg,
  darkButton: THEME.STYLES.RADIUS.md,
  borderButton: THEME.STYLES.RADIUS.md,
} as const;

const BroadyButton = ({
  text,
  onPress,
  variant,
  isLoading = false,
  fixedWidth,
  accessibilityLabel,
  paddingVariant,
  radiusVariant,
  flex,
  isActive = false,
  disabled = false,
}: {
  text: string;
  isLoading?: boolean;
  onPress: () => void;
  variant: ButtonTheme;
  paddingVariant?: ButtonTheme;
  radiusVariant?: ButtonTheme;
  fixedWidth?: number;
  flex?: number;
  accessibilityLabel?: string;
  disabled?: boolean;
  isActive?: boolean;
}) => {
  const buttonState = disabled ? 'disabled' : isActive ? 'pressed' : 'def';

  return (
    <View
      style={[
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: fixedWidth ?? '100%',
          ...(flex && { flex: flex }),
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: ButtonColor[variant]['background'][buttonState],
          ...{
            borderWidth: 1,
            borderColor: ButtonColor[variant]['border'][buttonState],
          },
          width: '100%',
          ...{
            borderRadius: radiusVariant ? ButtonRadius[radiusVariant] : ButtonRadius[variant],
          },
          paddingVertical: paddingVariant
            ? ButtonPadding[paddingVariant]['paddingVertical']
            : ButtonPadding[variant]['paddingVertical'],
          paddingHorizontal: paddingVariant
            ? ButtonPadding[paddingVariant]['paddingHorizontal']
            : ButtonPadding[variant]['paddingHorizontal'],
          justifyContent: 'center',
          alignItems: 'center',
        }}
        disabled={disabled}
        accessible
        accessibilityLabel={accessibilityLabel ? accessibilityLabel : `${text} 버튼`}
      >
        {isLoading ? (
          <View
            style={{
              top: 1.5,
            }}
          >
            <ActivityIndicator size="small" color={THEME.COLOR.FONT.CONTENT} />
          </View>
        ) : (
          <Typography
            size={ButtonColor[variant]['font']['size']}
            color={ButtonColor[variant]['font']['def']}
            weight={ButtonColor[variant]['font']['weight']}
          >
            {text}
          </Typography>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default BroadyButton;

import { View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Typography from "./Typography";
import { THEME } from "@/constants/theme";

type ButtonTheme = "primary" | "secondary" | "darkButton" | "borderButton";

const ButtonColor = {
  primary: {
    background: {
      def: THEME.COLOR.ORANGE,
      pressed: THEME.COLOR.ORANGE,
      disabled: THEME.COLOR.ORANGE,
    },
    border: {
      def: "transparent",
      pressed: "transparent",
      disabled: "transparent",
    },
    font: {
      size: "body_lg",
      weight: "bold",
      def: THEME.COLOR.WHITE,
    },
  },
  secondary: {
    background: {
      def: THEME.COLOR.GRAY_50,
      pressed: THEME.COLOR.GRAY_50,
      disabled: THEME.COLOR.GRAY_50,
    },
    border: {
      def: "transparent",
      pressed: "transparent",
      disabled: "transparent",
    },
    font: {
      size: "body_lg",
      weight: "bold",
      def: THEME.COLOR.GRAY_500,
    },
  },
  darkButton: {
    background: {
      def: THEME.COLOR.FONT_MAIN,
      pressed: THEME.COLOR.FONT_MAIN,
      disabled: THEME.COLOR.FONT_MAIN,
    },
    border: {
      def: "transparent",
      pressed: "transparent",
      disabled: "transparent",
    },
    font: {
      size: "body_md",
      weight: "regular",
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
      size: "body_md",
      weight: "regular",
      def: THEME.COLOR.BD_1,
    },
  },
} as const;

const ButtonPadding = {
  primary: {
    paddingHorizontal: THEME.SPACING.PADDING.P2,
    paddingVertical: THEME.SPACING.PADDING.P3,
  },
  secondary: {
    paddingHorizontal: THEME.SPACING.PADDING.P2,
    paddingVertical: THEME.SPACING.PADDING.P3,
  },
  darkButton: {
    paddingHorizontal: THEME.SPACING.PADDING.P3,
    paddingVertical: THEME.SPACING.PADDING.P4,
  },
  borderButton: {
    paddingHorizontal: THEME.SPACING.PADDING.P3,
    paddingVertical: THEME.SPACING.PADDING.P4,
  },
} as const;

const ButtonRadius = {
  primary: THEME.STYLES.RADIUS.lg,
  secondary: THEME.STYLES.RADIUS.lg,
  darkButton: THEME.STYLES.RADIUS.md,
  borderButton: THEME.STYLES.RADIUS.md,
} as const;

const BroadyButton = ({
  text,
  onPress,
  variant,
  fixedWidth,
  accessibilityLabel,
  paddingVariant,
  radiusVariant,
  disabled = false,
}: {
  text: string;
  onPress: () => void;
  variant: ButtonTheme;
  paddingVariant?: ButtonTheme;
  radiusVariant?: ButtonTheme;
  fixedWidth?: number;
  accessibilityLabel?: string;
  disabled?: boolean;
}) => {
  const [isPress, setPress] = useState(false);

  const buttonState = disabled ? "disabled" : isPress ? "pressed" : "def";

  return (
    <View
      style={[
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: fixedWidth ?? "100%",
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => setPress(true)}
        onPressOut={() => setPress(false)}
        style={{
          backgroundColor: ButtonColor[variant]["background"][buttonState],
          ...{
            borderWidth: 1,
            borderColor: ButtonColor[variant]["border"][buttonState],
          },
          width: "100%",
          ...{
            borderRadius: radiusVariant
              ? ButtonRadius[radiusVariant]
              : ButtonRadius[variant],
          },
          paddingVertical: paddingVariant
            ? ButtonPadding[paddingVariant]["paddingVertical"]
            : ButtonPadding[variant]["paddingVertical"],
          paddingHorizontal: paddingVariant
            ? ButtonPadding[paddingVariant]["paddingHorizontal"]
            : ButtonPadding[variant]["paddingHorizontal"],
          justifyContent: "center",
          alignItems: "center",
        }}
        disabled={disabled}
        accessible
        accessibilityLabel={
          accessibilityLabel ? accessibilityLabel : `${text} 버튼`
        }
      >
        <Typography
          size={ButtonColor[variant]["font"]["size"]}
          color={ButtonColor[variant]["font"]["def"]}
          weight={ButtonColor[variant]["font"]["weight"]}
        >
          {text}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

export default BroadyButton;

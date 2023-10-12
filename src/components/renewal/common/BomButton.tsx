import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors, Fonts, Utils } from '../styles';

type IBomButtonProps = {
  text: string;
  theme: 'primary' | 'secondary';

  onPress?: () => void;
  disabled?: boolean;

  fixedWidth?: number;
};

const BomButtonColor = {
  primary: {
    background: {
      def: Colors.None.Lighten400,
      pressed: Colors.None.Lighten200,
      disabled: Colors.None.Lighten400,
    },
    border: {
      def: Colors.Red.Default,
      pressed: Colors.Red.Default,
      disabled: Colors.None.Darken200,
    },
    font: {
      def: Colors.Red.Default,
      pressed: Colors.Red.Default,
      disabled: Colors.None.Darken200,
    },
  },
  secondary: {
    background: {
      def: Colors.Red.Default,
      pressed: Colors.Red.Lighten100,
      disabled: Colors.Red.Lighten300,
    },
    border: {
      def: 'transparent',
      pressed: 'transparent',
      disabled: 'transparent',
    },
    font: {
      def: Colors.None.Lighten300,
      pressed: Colors.None.Lighten300,
      disabled: Colors.None.Lighten300,
    },
  },
};

export const BomButton = ({ text, onPress, theme, disabled = false, fixedWidth }: IBomButtonProps) => {
  const [isPress, setPress] = useState(false);

  const buttonState = disabled ? 'disabled' : isPress ? 'pressed' : 'def';

  return (
    <View style={[styles.wrapper, { width: fixedWidth ?? '100%' }]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => setPress(true)}
        onPressOut={() => setPress(false)}
        style={[
          styles.container,
          Utils.backgroundColor(BomButtonColor[theme]['background'][buttonState]),
          Utils.borderColor(BomButtonColor[theme]['border'][buttonState]),
        ]}
        disabled={disabled}
        accessible
        accessibilityLabel={`${text} 버튼`}
      >
        <Text style={[Fonts.Regular16, Utils.fontColor(BomButtonColor[theme]['font'][buttonState])]}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    paddingVertical: 15,

    borderRadius: 12,
  },
});

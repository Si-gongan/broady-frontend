import { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Utils } from '../styles';

type ILongButtonProps = {
  text: string;
  theme: 'primary' | 'secondary';

  onPress?: () => void;
  disabled?: boolean;
};

const LongButtonColor = {
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

export const LongButton = ({ text, onPress, theme, disabled = false }: ILongButtonProps) => {
  const [isPress, setPress] = useState(false);

  const buttonState = disabled ? 'disabled' : isPress ? 'pressed' : 'def';

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={() => setPress(true)}
        onPressOut={() => setPress(false)}
        style={[
          styles.container,
          Utils.backgroundColor(LongButtonColor[theme]['background'][buttonState]),
          Utils.borderColor(LongButtonColor[theme]['border'][buttonState]),
        ]}
        disabled={disabled}
        accessible
        accessibilityLabel={`${text} 버튼`}
      >
        <Text style={[Fonts.Regular16, Utils.fontColor(LongButtonColor[theme]['font'][buttonState])]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',

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

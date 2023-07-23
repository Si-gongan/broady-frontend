import { View, Text, StyleSheet, TextInput } from 'react-native';
import { AuthColor, AuthFont } from './styles';
import { Noop } from 'react-hook-form';

type CustomTextInputProps = {
  text: string;

  value: string;
  onChangeValue: (prev: string) => void;

  onBlur?: Noop;
  secureTextEntry?: boolean;
};

export const CustomTextInput = ({ text, value, secureTextEntry, onBlur, onChangeValue }: CustomTextInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={[AuthFont.teritary, AuthColor.contentPrimary]}>{text}</Text>

      <TextInput
        value={value}
        onBlur={onBlur}
        onChangeText={onChangeValue}
        style={[styles.input, AuthColor.teritary, AuthColor.contentTeritary, AuthFont.teritary]}
        accessible
        accessibilityLabel={`${text} 입력창`}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 343,
    gap: 8,
  },
  input: {
    width: '100%',

    paddingHorizontal: 16,
    paddingVertical: 8,

    borderRadius: 8,
  },
});

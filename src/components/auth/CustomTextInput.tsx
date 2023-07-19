import { View, Text, StyleSheet, TextInput } from 'react-native';
import { AuthColor, AuthFont } from './styles';

type CustomTextInputProps = {
  text: string;

  value: string;
  onChangeValue: (prev: string) => void;
};

export const CustomTextInput = ({ text, value, onChangeValue }: CustomTextInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={[AuthFont.teritary, AuthColor.contentPrimary]}>{text}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeValue}
        style={[
          styles.input,
          AuthColor.teritary,
          AuthColor.contentTeritary,
          AuthFont.teritary,
          {
            fontStyle: 'normal',
          },
        ]}
        placeholder={text}
        accessible
        accessibilityLabel={`${text} 입력창`}
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

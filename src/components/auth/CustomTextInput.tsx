import { View, Text, StyleSheet, TextInput } from 'react-native';

type CustomTextInputProps = {
  text: string;

  value: string;
  onChangeValue: (prev: string) => void;
};

export const CustomTextInput = ({ text, value, onChangeValue }: CustomTextInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>

      <TextInput value={value} onChangeText={onChangeValue} style={styles.input} placeholder={text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 343,
    gap: 8,
  },
  text: {
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '400',
  },
  input: {
    width: '100%',
    backgroundColor: '#E8E8E8',
    color: '#5E5E5E',

    paddingHorizontal: 16,
    paddingVertical: 8,

    borderRadius: 8,
  },
});

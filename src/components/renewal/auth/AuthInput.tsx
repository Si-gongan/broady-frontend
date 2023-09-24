import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Noop } from 'react-hook-form';
import { Colors, Fonts, Utils } from '../styles';

type IAuthInputProps = {
  text: string;

  value: string;
  onChangeValue: (prev: string) => void;

  onBlur?: Noop;
  secureTextEntry?: boolean;
  onSubmitEditing?: () => void;

  inputRef?: React.RefObject<TextInput>;
};

export const AuthInput = ({
  text,
  value,
  secureTextEntry,
  onBlur,
  onChangeValue,
  onSubmitEditing,
  inputRef,
}: IAuthInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>{text}</Text>

      <TextInput
        ref={inputRef}
        value={value}
        onBlur={onBlur}
        onChangeText={onChangeValue}
        onSubmitEditing={onSubmitEditing}
        style={[
          styles.input,

          Fonts.Regular16,
          Utils.fontColor(Colors.Font.secondary),
          Utils.borderColor(Colors.Font.secondary),
        ]}
        accessible
        accessibilityLabel={`${text} 입력창`}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  input: {
    width: '100%',

    paddingVertical: 16,
    paddingHorizontal: 10,

    borderRadius: 12,
  },
});

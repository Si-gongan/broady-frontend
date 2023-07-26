import { View, Text, StyleSheet, TextInput } from 'react-native';
import { AuthColor, AuthFont, AuthResponsive } from './styles';
import { Noop } from 'react-hook-form';

type CustomTextInputProps = {
  text: string;

  value: string;
  onChangeValue: (prev: string) => void;

  onBlur?: Noop;
  secureTextEntry?: boolean;
  onSubmitEditing?: () => void;

  inputRef?: React.RefObject<TextInput>;
};

export const CustomTextInput = ({
  text,
  value,
  secureTextEntry,
  onBlur,
  onChangeValue,
  onSubmitEditing,
  inputRef,
}: CustomTextInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={[AuthFont.teritary, AuthColor.contentPrimary]}>{text}</Text>

      <TextInput
        ref={inputRef}
        value={value}
        onBlur={onBlur}
        onChangeText={onChangeValue}
        onSubmitEditing={onSubmitEditing}
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
    width: AuthResponsive.dynamicWidth(),
    gap: 8,
  },
  input: {
    width: '100%',

    paddingHorizontal: 16,
    paddingVertical: 8,

    borderRadius: 8,
  },
});

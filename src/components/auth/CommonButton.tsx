import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthColor, AuthFont } from './styles';

type CommonButtonProps = {
  text: string;
  onPress?: () => void;
};

export const CommonButton = ({ text, onPress }: CommonButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, AuthColor.secondary]}
      onPress={onPress}
      accessible
      accessibilityLabel={`${text} 버튼`}
    >
      <Text
        style={[
          styles.text,
          AuthColor.contentSecondary,
          AuthFont.primary,
          {
            fontStyle: 'normal',
          },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 343,
    borderRadius: 8,

    alignItems: 'center',
  },
  text: {
    paddingVertical: 16,
  },
});

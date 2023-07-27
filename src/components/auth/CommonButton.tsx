import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthColor, AuthFont, AuthResponsive } from './styles';

type CommonButtonProps = {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
};

export const CommonButton = ({ text, onPress, disabled }: CommonButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, disabled ? AuthColor.quaternary : AuthColor.secondary]}
      onPress={onPress}
      accessible
      accessibilityLabel={`${text} 버튼`}
      disabled={disabled}
    >
      <Text style={[styles.text, AuthColor.contentSecondary, AuthFont.primary]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: AuthResponsive.dynamicWidth(),
    borderRadius: 8,

    alignItems: 'center',
  },
  text: {
    paddingVertical: 16,
  },
});

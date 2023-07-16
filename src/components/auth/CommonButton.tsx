import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type CommonButtonProps = {
  text: string;
  onPress?: () => void;
};

export const CommonButton = ({ text, onPress }: CommonButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',

    width: 343,
    borderRadius: 8,

    alignItems: 'center',
  },
  text: {
    color: '#fff',
    paddingVertical: 16,

    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});

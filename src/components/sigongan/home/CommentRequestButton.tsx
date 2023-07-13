import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { SigonganColor } from '../styles';

type CommentRequestButtonProps = {
  onPress: () => void;
};

export const CommentRequestButton = ({ onPress }: CommentRequestButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={onPress}>
      <MaterialIcons name="add" style={styles.icon} />
      <Text style={styles.content}>해설 의뢰하기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 256,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,

    paddingHorizontal: 10,
    paddingVertical: 12,

    backgroundColor: SigonganColor.normalButton,

    borderRadius: 8,
  },
  icon: {
    color: SigonganColor.normalButtonText,
    fontSize: 16,
  },
  content: {
    color: SigonganColor.normalButtonText,
    fontSize: 14,
    fontStyle: 'italic',
  },
});

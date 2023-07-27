import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { SigonganColor, SigonganFont } from '../styles';

type CommentRequestButtonProps = {
  onPress: () => void;
};

export const CommentRequestButton = ({ onPress }: CommentRequestButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, SigonganColor.backgroundSecondary]}
      onPress={onPress}
      accessible
      accessibilityLabel="해설 의뢰하기 버튼"
    >
      <MaterialIcons name="add" style={[styles.icon, SigonganColor.contentSecondary]} />
      <Text style={[SigonganFont.teritary, SigonganColor.contentSecondary]}>해설 의뢰하기</Text>
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

    marginTop: 23,

    paddingHorizontal: 10,
    paddingVertical: 12,

    borderRadius: 8,
  },
  icon: {
    fontSize: 16,
  },
});

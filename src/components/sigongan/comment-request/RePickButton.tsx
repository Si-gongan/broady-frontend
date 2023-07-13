import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { SigonganColor, SigonganFont } from '../styles';

type RePickButtonProps = {
  onPress: () => void;
};

export const RePickButton = ({ onPress }: RePickButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, SigonganColor.backgroundSecondary]}
      onPress={onPress}
    >
      <Text style={[SigonganFont.teritary, SigonganColor.contentSecondary]}>사진 다시 선택하기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 256,

    alignItems: 'center',

    marginTop: 27,

    paddingHorizontal: 10,
    paddingVertical: 12,

    borderRadius: 8,
  },
});

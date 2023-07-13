import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SigonganColor, SigonganFont } from '../styles';

type SubmitRequestButtonProps = {
  onPress: () => void;
};

export const SubmitRequestButton = ({ onPress }: SubmitRequestButtonProps) => {
  return (
    <View style={[styles.container, SigonganColor.backgroundPrimary]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.textWrapper, SigonganColor.backgroundSecondary]}
        onPress={onPress}
      >
        <Text style={[SigonganFont.primary, SigonganColor.contentSecondary]}>의뢰 전송하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',

    // hard coding
    paddingBottom: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },
  textWrapper: {
    alignItems: 'center',
    paddingVertical: 16,

    margin: 16,

    borderRadius: 8,
  },
});

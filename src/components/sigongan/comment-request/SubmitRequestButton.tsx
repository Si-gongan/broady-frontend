import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SigonganColor, SigonganFont, SigonganShadow } from '../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SubmitRequestButtonProps = {
  onPress: () => void;
  disabled?: boolean;
};

export const SubmitRequestButton = ({ onPress, disabled }: SubmitRequestButtonProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, SigonganColor.backgroundPrimary, { paddingBottom: insets.bottom || 16 }]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.textWrapper, SigonganColor.backgroundSecondary]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[SigonganFont.primary, SigonganColor.contentSecondary]}>의뢰 전송하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...SigonganShadow.shadowTopHigh,
  },
  textWrapper: {
    alignItems: 'center',
    paddingVertical: 16,

    marginHorizontal: 16,
    marginTop: 16,

    borderRadius: 8,
  },
});

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SigonganColor, SigonganFont, SigonganShadow } from '../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ActionButtonProps = {
  onPress: () => void;
};

export const ActionButton = ({ onPress }: ActionButtonProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, SigonganColor.backgroundPrimary, { paddingBottom: insets.bottom || 16 }]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.textWrapper, SigonganColor.backgroundSecondary]}
        onPress={onPress}
      >
        <Text style={[SigonganFont.primary, SigonganColor.contentSecondary]}>질문 추가하기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.textWrapper, SigonganColor.backgroundSecondary]}
        onPress={onPress}
      >
        <Text style={[SigonganFont.primary, SigonganColor.contentSecondary]}>감사 인사하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    gap: 8,

    ...SigonganShadow.shadowTopHigh,
  },
  textWrapper: {
    alignItems: 'center',
    paddingVertical: 16,

    marginHorizontal: 16,

    borderRadius: 8,
  },
});

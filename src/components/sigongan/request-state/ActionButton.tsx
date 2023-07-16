import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SigonganColor, SigonganFont } from '../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ActionButtonProps = {
  onPress: () => void;
};

export const ActionButton = ({ onPress }: ActionButtonProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, SigonganColor.backgroundPrimary, { marginBottom: insets.bottom }]}>
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

    marginHorizontal: 16,

    borderRadius: 8,
  },
});

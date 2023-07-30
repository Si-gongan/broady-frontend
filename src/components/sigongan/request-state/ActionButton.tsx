import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SigonganColor, SigonganFont, SigonganShadow } from '../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ActionButtonProps = {
  isComplete: boolean;
  onThanksPress: () => void;
  onQuestPress: () => void;
};

export const ActionButton = ({ isComplete, onThanksPress, onQuestPress }: ActionButtonProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, SigonganColor.backgroundPrimary, { paddingBottom: insets.bottom || 16 }]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.textWrapper, SigonganColor.backgroundSecondary]}
        onPress={onQuestPress}
        accessible
        accessibilityLabel="질문 추가하기 버튼"
      >
        <Text style={[SigonganFont.primary, SigonganColor.contentSecondary]}>질문 추가하기</Text>
      </TouchableOpacity>

      {isComplete && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.textWrapper, SigonganColor.backgroundSecondary]}
          onPress={onThanksPress}
          accessible
          accessibilityLabel="감사 인사하기 버튼"
        >
          <Text style={[SigonganFont.primary, SigonganColor.contentSecondary]}>감사 인사하기</Text>
        </TouchableOpacity>
      )}
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

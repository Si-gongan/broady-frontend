import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SigonganColor, SigonganFont, SigonganShadow } from '../styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const ThanksBox = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, SigonganColor.backgroundPrimary, { paddingBottom: insets.bottom || 22 }]}>
      <TextInput placeholder="감사 인사를 전하세요..." style={[styles.text, SigonganFont.secondary]} />

      <FontAwesome name="send" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...SigonganShadow.shadowTopHigh,

    paddingLeft: 17,
    paddingTop: 22,

    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  text: {
    flex: 1,

    paddingLeft: 11,
    paddingTop: 10,
    paddingBottom: 7,

    borderWidth: 0.5,
    borderColor: SigonganColor.contentSenary.color,

    borderRadius: 10,
  },
  icon: {
    paddingRight: 18,
    fontSize: 28,
  },
});

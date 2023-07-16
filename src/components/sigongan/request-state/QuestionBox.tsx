import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SigonganColor, SigonganFont } from '../styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const QuestionBox = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, SigonganColor.backgroundPrimary, { paddingBottom: insets.bottom || 22 }]}>
      <TextInput placeholder="질문을 입력하세요..." style={[styles.text, SigonganFont.secondary]} />

      <FontAwesome name="send" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,

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

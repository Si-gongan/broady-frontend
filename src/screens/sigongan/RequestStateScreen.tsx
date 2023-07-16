import { View, Text, StyleSheet } from 'react-native';
import {
  AnotherSpeechBubble,
  MySpeechBubble,
  TimeViewer,
  AnotherAvatar,
  ActionButton,
} from '../../components/sigongan/request-state';

export const RequestStateScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.speechContainer}>
        <View style={styles.mySpeechWrapper}>
          <MySpeechBubble />
        </View>

        <View style={styles.mySpeechEndWrapper}>
          <TimeViewer />

          <MySpeechBubble />
        </View>

        <View style={styles.AnotherSpeechWrapper}>
          <AnotherAvatar />

          <AnotherSpeechBubble />

          <TimeViewer />
        </View>
      </View>

      <ActionButton
        onPress={() => {
          1;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  speechContainer: {
    flex: 1,
    gap: 12,
  },
  mySpeechWrapper: {
    marginRight: 18,
  },
  mySpeechEndWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',

    gap: 11,
    marginRight: 18,
  },
  AnotherSpeechWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',

    marginLeft: 16,
    gap: 8,
  },
});

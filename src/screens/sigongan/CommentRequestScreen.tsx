import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { ImageCard, QuestTextArea, RePickButton, SubmitRequestButton } from '../../components/sigongan/comment-request';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CommentRequestScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={44 + insets.top}
    >
      <View style={styles.container}>
        <ImageCard imgUrl="" />

        <RePickButton
          onPress={() => {
            1;
          }}
        />

        <QuestTextArea />
      </View>

      <SubmitRequestButton
        onPress={() => {
          1;
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

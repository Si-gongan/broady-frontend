import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { ImageCard, QuestTextArea, RePickButton, SubmitRequestButton } from '../../components/sigongan/comment-request';

export const CommentRequestScreen = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
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

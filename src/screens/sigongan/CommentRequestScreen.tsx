import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { ImageController, QuestTextArea, SubmitRequestButton } from '../../components/sigongan/comment-request';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export const CommentRequestScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={44 + insets.top}
    >
      <ScrollView>
        <View style={styles.container}>
          <ImageController
            imgUrl=""
            onPress={() => {
              1;
            }}
          />

          <QuestTextArea />
        </View>
      </ScrollView>

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

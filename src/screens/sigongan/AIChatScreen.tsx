import { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { QuestionBox } from '../../components/sigongan/ai-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { MySpeechBubble, AnotherSpeechBubble } from '../../components/sigongan/request-state';

export const AIChatScreen = () => {
  const [text, setText] = useState('');

  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={44 + insets.top}
    >
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.chatWrapper}>
            <MySpeechBubble />

            <AnotherSpeechBubble />
          </View>
        </ScrollView>

        <QuestionBox value={text} onChangeValue={setText} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatWrapper: {
    flex: 1,
  },
});

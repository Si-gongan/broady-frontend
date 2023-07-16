import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { ImageController, QuestTextArea, SubmitRequestButton } from '../../components/sigongan/comment-request';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useRef, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SigonganStackParamList } from '../../navigations';
import { CommentRequestPopup, ICommentRequestPopupHandler } from '../../components/sigongan/home';

export const CommentRequestScreen = () => {
  const {
    params: { url },
  } = useRoute<RouteProp<SigonganStackParamList, '해설의뢰'>>();
  const [value, setValue] = useState('');

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const commentRequestPopupRef = useRef<ICommentRequestPopupHandler>(null);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardVisible(false);
    });
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardWillShowListener?.remove();
      keyboardWillHideListener?.remove();
      keyboardDidHideListener?.remove();
      keyboardDidShowListener?.remove();
    };
  }, []);

  useEffect(() => {
    if (isKeyboardVisible) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [isKeyboardVisible]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={44 + insets.top}
    >
      <ScrollView ref={scrollViewRef}>
        <View style={styles.container}>
          {url && <ImageController imgUrl={url} onPress={() => commentRequestPopupRef.current?.open()} />}

          <QuestTextArea value={value} onChangeValue={setValue} />
        </View>
      </ScrollView>

      <SubmitRequestButton
        onPress={() => {
          console.log('url', url);
          console.log('value', value);

          // TODO: 페이지 이동 처리
        }}
      />

      <CommentRequestPopup ref={commentRequestPopupRef} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

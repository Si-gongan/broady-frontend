import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { QuestionBox, ImageSelectPopup, ImageSelectPopupHandler } from '../../components/sigongan/ai-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { MySpeechBubble, AnotherSpeechBubble, AnotherAvatar } from '../../components/sigongan/request-state';
import { IMessageType, PostQuestion } from '../../api/axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { SigonganColor, SigonganDesign } from '../../components/sigongan/styles';
import { SigonganHeader } from '../../components/sigongan/SigonganHeader';

export const AIChatScreen = () => {
  const [text, setText] = useState('');

  const [loading, setLoading] = useState(false);

  const [chatList, setChatList] = useState<IMessageType[]>([]);
  const APIdata = useRef<object | null>({});

  const insets = useSafeAreaInsets();

  const scrollViewRef = useRef<ScrollView>(null);
  const imageSelectPopupRef = useRef<ImageSelectPopupHandler>(null);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

  const onSendTextPress = async () => {
    const newMessage: IMessageType = { type: 'text', content: text, role: 'user' };
    const newChatList = [...chatList, newMessage];

    try {
      setLoading(true);

      const res = await PostQuestion(newChatList.slice(-7), APIdata.current);

      const newResponse: IMessageType = { type: 'text', content: res.data.message[0], role: 'assistant' };
      APIdata.current = res.data.data;

      const finalChatList = [...newChatList, newResponse];
      setChatList(finalChatList);

      setText('');
    } catch (e) {
      Alert.alert('알림', '일시적인 오류가 발생했습니다.', [
        {
          text: '확인',
          style: 'default',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={0}
    >
      <SigonganHeader text="AI 채팅" hideBackButton isBottomBorder />
      <Spinner visible={loading} />

      <View style={styles.container}>
        <ScrollView ref={scrollViewRef}>
          <View style={styles.chatWrapper}>
            {chatList.map((item, i) =>
              item.role === 'user' ? (
                <View key={i} style={styles.mySpeechEndWrapper}>
                  {/* <TimeViewer date={item.createdAt} /> */}

                  <MySpeechBubble text={item.content} />
                </View>
              ) : (
                <View key={i} style={styles.AnotherSpeechWrapper}>
                  <AnotherAvatar />

                  <AnotherSpeechBubble text={item.content} />

                  {/* <TimeViewer date={item.createdAt} /> */}
                </View>
              )
            )}
          </View>
        </ScrollView>

        <QuestionBox
          value={text}
          onChangeValue={setText}
          onImagePopupPress={() => imageSelectPopupRef.current?.open()}
          onSendTextPress={onSendTextPress}
          disabled={loading}
        />
      </View>

      <ImageSelectPopup ref={imageSelectPopupRef} onSendImagePress={() => 2} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatWrapper: {
    flex: 1,
    gap: 12,

    marginTop: 16,
    marginBottom: 20,
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

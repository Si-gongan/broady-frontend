import { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { QuestionBox, ImageSelectPopup, ImageSelectPopupHandler } from '../../components/sigongan/ai-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import {
  MySpeechBubble,
  AnotherSpeechBubble,
  AnotherAvatar,
  TimeViewer,
} from '../../components/sigongan/request-state';
import { GetChatList, PostImageQuestion, PostTextQuestion } from '../../api/axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { SigonganColor, SigonganDesign } from '../../components/sigongan/styles';
import { SigonganHeader } from '../../components/sigongan/SigonganHeader';
import { useFocusEffect } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';

export const AIChatScreen = () => {
  const fcmToken = useRecoilValue(fcmTokenState);

  const [text, setText] = useState('');

  const [loading, setLoading] = useState(false);
  console.log('loading: ', loading);

  const [chatList, setChatList] = useState<any[]>([]);
  const chatId = useRef<string | null>(null);

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

  useEffect(() => {
    (async () => {
      try {
        const temp = await GetChatList(fcmToken);

        const prevData = temp.data.result.chat;
        if (prevData === null) {
          return;
        }

        setChatList(prevData.chat);
        chatId.current = prevData._id;
      } catch {
        Alert.alert('알림', '일시적인 오류가 발생했습니다.', [
          {
            text: '확인',
            style: 'default',
          },
        ]);
      }
    })();
  }, []);

  const onSendTextPress = async () => {
    try {
      setLoading(true);

      const _ = await PostTextQuestion(chatId.current, text, fcmToken);

      await refresh();
    } catch {
      Alert.alert('알림', '일시적인 오류가 발생했습니다.', [
        {
          text: '확인',
          style: 'default',
        },
      ]);
    } finally {
      setLoading(false);
      setText('');
    }
  };

  const onSendImagePress = async (url: string) => {
    try {
      setLoading(true);

      const _ = await PostImageQuestion(chatId.current, url, fcmToken);

      await refresh();
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

  const refresh = async () => {
    const temp = await GetChatList(fcmToken);
    const newChatData = temp.data.result.chat;
    if (newChatData === null) {
      return;
    }

    setChatList(newChatData.chat);
    chatId.current = newChatData._id;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={0}
    >
      <SigonganHeader text="AI 채팅" hideBackButton isBottomBorder />

      <View style={styles.container}>
        <ScrollView ref={scrollViewRef}>
          <View style={styles.chatWrapper}>
            {chatList.map((item, i) =>
              item.role === 'user' ? (
                <View key={i} style={styles.mySpeechEndWrapper}>
                  <TimeViewer date={item.createdAt} />

                  <MySpeechBubble text={item.content} />
                </View>
              ) : (
                <View key={i} style={styles.AnotherSpeechWrapper}>
                  <AnotherAvatar />

                  <AnotherSpeechBubble text={item.content} />

                  <TimeViewer date={item.createdAt} />
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

      <ImageSelectPopup ref={imageSelectPopupRef} onSendImagePress={onSendImagePress} />

      <Spinner visible={loading} />
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

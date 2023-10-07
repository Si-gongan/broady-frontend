import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert, SafeAreaView, ScrollView } from 'react-native';
import { GetChatList, IGetChatListReturnType, PostImageQuestion, PostTextQuestion } from '../../api/axios';

import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { SigonganMainTabParamList } from '../../navigations';
import { delay, getDate } from '../../utils/time';
import { useKeyboard } from '../../hooks';
import {
  BomHeader,
  AIInputBar,
  PaddingHorizontal,
  TabBar,
  IImageMethodPopupHandler,
  ImageMethodPopup,
} from '../../components/renewal';

type ChatListType = NonNullable<IGetChatListReturnType['result']['chat']>['chat'];

export const AIChatScreen = () => {
  // page move
  const navigation = useNavigation<BottomTabNavigationProp<SigonganMainTabParamList>>();

  // api
  const fcmToken = useRecoilValue(fcmTokenState);
  const [chatList, setChatList] = useState<ChatListType>([]);
  const chatId = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);

  // state
  const [text, setText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const { isKeyboardVisible } = useKeyboard();

  // popup
  const ImageMethodPopupRef = useRef<IImageMethodPopupHandler>(null);

  // load initial chat
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

        // hard coding
        await delay(500);
        scrollViewRef.current?.scrollToEnd({ animated: true });
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

  // keyboard animation
  useEffect(() => {
    if (isKeyboardVisible) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }

    if (Platform.OS === 'android') {
      if (isKeyboardVisible) {
        navigation.setOptions({ tabBarStyle: { display: 'none' } });
      } else {
        navigation.setOptions({ tabBarStyle: { display: 'flex' } });
      }
    }
  }, [isKeyboardVisible]);

  const onSendTextPress = async () => {
    if (text.length === 0) {
      Alert.alert('알림', '질문을 입력해주세요.', [
        {
          text: '확인',
          style: 'default',
        },
      ]);

      return;
    }

    try {
      setLoading(true);

      await PostTextQuestion(chatId.current, text, fcmToken);
      await refresh();
    } catch {
      console.log('error');
    } finally {
      setLoading(false);
      setText('');
    }
  };

  const onSendImagePress = async (url: string) => {
    await delay(500);

    try {
      setLoading(true);

      await PostImageQuestion(chatId.current, url, fcmToken);
      await refresh();
    } catch (e) {
      console.log('error');
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

  const isShowDate = (list: ChatListType, i: number) =>
    i === 0 || (i - 2 >= 0 && getDate(list[i].createdAt) !== getDate(list[i - 2].createdAt));

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <BomHeader text="AI 해설" hideBackButton isBottomBorder />

        <PaddingHorizontal value={20}></PaddingHorizontal>

        <AIInputBar value={text} onChangeText={setText} onImagePress={() => ImageMethodPopupRef.current?.open()} />
      </KeyboardAvoidingView>

      <TabBar currentIndex={1} />

      <ImageMethodPopup ref={ImageMethodPopupRef} aiChat={{ onImageSubmit: () => 1 }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

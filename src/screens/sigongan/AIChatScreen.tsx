import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { GetChatList, IGetChatListReturnType, PostImageQuestion, PostTextQuestion } from '../../api/axios';

import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';

import { useKeyboard } from '../../hooks';
import { useLoading } from '../../providers';
import {
  BomHeader,
  AIInputBar,
  PaddingHorizontal,
  TabBar,
  IImageMethodPopupHandler,
  ImageMethodPopup,
  DateViewer,
  TimeViewer,
  MySpeechBubble,
  AnotherSpeechBubble,
  RobotAvatar,
  ImageViewer,
  NoticeError,
  Notice,
  delay,
  getDate,
  getFormattedTime_Label,
} from '../../components/renewal';

type ChatListType = NonNullable<IGetChatListReturnType['result']['chat']>['chat'];

const LOAD_DELAY = 500;

export const AIChatScreen = () => {
  // api
  const fcmToken = useRecoilValue(fcmTokenState);
  const [chatList, setChatList] = useState<ChatListType>([]);
  const chatId = useRef<string | null>(null);

  // state
  const [text, setText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const { isKeyboardVisible } = useKeyboard();
  const { isLoading, changeLoading } = useLoading();

  // popup
  const ImageMethodPopupRef = useRef<IImageMethodPopupHandler>(null);

  // load initial chat
  useEffect(() => {
    (async () => {
      try {
        const temp = await GetChatList(fcmToken);
        console.log(temp);
        const prevData = temp.data.result.chat;
        if (prevData === null) {
          return;
        }

        setChatList(prevData.chat);
        chatId.current = prevData._id;

        // hard coding
        await delay(LOAD_DELAY);
        scrollViewRef.current?.scrollToEnd({ animated: true });
      } catch {
        NoticeError();
      }
    })();
  }, []);

  // keyboard animation
  useEffect(() => {
    if (isKeyboardVisible) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [isKeyboardVisible]);

  const onTextSubmit = async () => {
    if (text.length === 0) {
      Notice('질문을 입력해주세요.');
      return;
    }

    try {
      changeLoading(true);

      await PostTextQuestion(chatId.current, text, fcmToken);
      await refresh();
    } catch {
      NoticeError();
    } finally {
      changeLoading(false);
      setText('');
    }
  };

  const onImageSubmit = async (url: string) => {
    try {
      changeLoading(true);

      await PostImageQuestion(chatId.current, url, fcmToken);
      await refresh();
    } catch {
      NoticeError();
    } finally {
      changeLoading(false);
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

    // hard coding
    await delay(LOAD_DELAY);
    scrollViewRef.current?.scrollToEnd({ animated: true });
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

        <PaddingHorizontal value={20}>
          <ScrollView ref={scrollViewRef}>
            <View style={styles.chatWrapper}>
              {chatList.map((item, i) =>
                item.role === 'user' ? (
                  <View key={i}>
                    {isShowDate(chatList, i) && <DateViewer date={item.createdAt} />}

                    <View
                      style={styles.mySpeechWrapper}
                      accessible
                      accessibilityLabel={`내가 전송한 ${item.isPhoto ? '사진' : '채팅'} ${
                        !item.isPhoto ? item.content : ''
                      }, ${getFormattedTime_Label(item.createdAt)}`}
                    >
                      <TimeViewer date={item.createdAt} />

                      {item.isPhoto ? <ImageViewer url={item.content} /> : <MySpeechBubble text={item.content} />}
                    </View>
                  </View>
                ) : (
                  <View
                    key={i}
                    style={styles.anotherSpeechWrapper}
                    accessible
                    accessibilityLabel={`AI의 답변, ${item.content}, ${getFormattedTime_Label(item.createdAt)}`}
                  >
                    <RobotAvatar />

                    <AnotherSpeechBubble text={item.content} />

                    <TimeViewer date={item.createdAt} />
                  </View>
                )
              )}
            </View>
          </ScrollView>
        </PaddingHorizontal>

        <AIInputBar
          value={text}
          onChangeText={setText}
          isSubmitting={isLoading}
          onImagePress={() => ImageMethodPopupRef.current?.open()}
          onTextSubmit={onTextSubmit}
        />
      </KeyboardAvoidingView>

      <TabBar currentIndex={1} />

      <ImageMethodPopup ref={ImageMethodPopupRef} aiChat={{ onImageSubmit }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatWrapper: {
    marginTop: 5,
    marginBottom: 15,

    gap: 12,
  },
  mySpeechWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',

    gap: 10,
  },
  anotherSpeechWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',

    gap: 10,
  },
});

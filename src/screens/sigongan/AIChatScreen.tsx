import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import {
  QuestionBox,
  ImageSelectPopup,
  ImageSelectPopupHandler,
  ImageViewer,
  DateViewer,
} from '../../components/sigongan/ai-chat';
import { ScrollView } from 'react-native-gesture-handler';
import {
  MySpeechBubble,
  AnotherSpeechBubble,
  AnotherAvatar,
  TimeViewer,
} from '../../components/sigongan/request-state';
import { GetChatList, IGetChatListReturnType, NoticeError, PostImageQuestion, PostTextQuestion } from '../../api/axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { SigonganHeader } from '../../components/sigongan/SigonganHeader';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { SigonganMainTabParamList } from '../../navigations';
import { delay, getDate } from '../../utils/time';
import { useKeyboard } from '../../hooks';

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
  const imageSelectPopupRef = useRef<ImageSelectPopupHandler>(null);

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
      NoticeError();
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
      NoticeError();
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
                <View key={i} style={styles.chatItem}>
                  {isShowDate(chatList, i) && <DateViewer date={item.createdAt} />}

                  <View
                    key={i}
                    style={styles.mySpeechEndWrapper}
                    accessible
                    accessibilityLabel={`내가 전송한 ${item.isPhoto ? '사진' : '채팅'} ${
                      !item.isPhoto ? item.content : ''
                    }`}
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
                  accessibilityLabel={`AI의 답변 ${item.content}`}
                >
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

    marginTop: 3,
    marginBottom: 20,
  },
  chatItem: {
    width: '100%',
  },
  mySpeechEndWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',

    gap: 11,
    marginRight: 18,
  },
  anotherSpeechWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',

    marginLeft: 16,
    gap: 8,
  },
});

import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, Keyboard } from 'react-native';
import {
  AnotherSpeechBubble,
  MySpeechBubble,
  TimeViewer,
  AnotherAvatar,
  ActionButton,
  ThanksBox,
  QuestionBox,
} from '../../components/sigongan/request-state';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { SigonganStackParamList } from '../../navigations';
import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GetRequestList, IReqeustListItem } from '../../api/axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SigonganHeader } from '../../components/sigongan/SigonganHeader';
import { useKeyboard } from '../../hooks';
import { DateViewer } from '../../components/sigongan/ai-chat';
import { getDate } from '../../utils/time';

export const RequestStateScreen = () => {
  // for page move
  const {
    params: { item },
  } = useRoute<RouteProp<SigonganStackParamList, '해설 진행현황'>>();
  const navigation = useNavigation<NativeStackNavigationProp<SigonganStackParamList>>();

  // api
  const fcmToken = useRecoilValue(fcmTokenState);
  const [chatList, setChatList] = useState<IReqeustListItem['requestedUser']>([]);

  // state
  const [isShowThanks, setShowThanks] = useState(false);
  const [isShowQuest, setShowQuest] = useState(false);

  // for keyboard
  const insets = useSafeAreaInsets();
  const keyboardBottom = insets.bottom === 0 ? 0 : 16 - insets.bottom;

  // for ux
  const scrollViewRef = useRef<ScrollView>(null);
  const { isKeyboardVisible } = useKeyboard();
  useEffect(() => {
    if (isKeyboardVisible) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [isKeyboardVisible]);

  // after
  // item -> chatList
  useEffect(() => {
    if (item) {
      setChatList([...item.requestedUser, ...item.responseUser]);
    }
  }, [item]);

  // after
  // for ux
  useFocusEffect(
    useCallback(() => {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 500);
    }, [])
  );

  const refresh = async () => {
    setShowQuest(false);
    setShowThanks(false);

    try {
      const res = await GetRequestList(fcmToken);

      const tempList = res.data.result.posts;
      const tempItem = tempList.filter((data) => data.id === item.id)[0];

      navigation.navigate('해설 진행현황', { item: tempItem !== undefined ? tempItem : item });
    } catch {
      Alert.alert('알림', '일시적인 오류가 발생했습니다.', [
        {
          text: '확인',
          style: 'default',
        },
      ]);
    }
  };

  // for state
  const isNotButtonClicked = !(isShowThanks || isShowQuest);

  const isMe = (item: IReqeustListItem['requestedUser'][0]) => item.userId === undefined;
  const isNextMe = (list: IReqeustListItem['requestedUser'], i: number) => list.length !== i + 1 && isMe(list[i + 1]);
  const isAppreciated = (item: IReqeustListItem['requestedUser'][0]) => item.appreciated;

  const isShowDate = (list: IReqeustListItem['requestedUser'], i: number) =>
    i === 0 || (i - 1 >= 0 && getDate(list[i].createdAt) !== getDate(list[i - 1].createdAt));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={keyboardBottom}
    >
      <View style={styles.container}>
        <SigonganHeader text="해설 진행현황" onBackButtonPress={() => navigation.goBack()} isBottomBorder />

        {/* 채팅 리스트 */}
        <ScrollView ref={scrollViewRef}>
          <View style={styles.speechContainer}>
            {chatList
              .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1))
              .map((item, i) =>
                isMe(item) ? (
                  // 나의 대화
                  <View key={item.createdAt}>
                    {isShowDate(chatList, i) && <DateViewer date={item.createdAt} />}

                    <View
                      style={isNextMe(chatList, i) ? styles.mySpeechWrapper : styles.mySpeechEndWrapper}
                      accessible
                      accessibilityLabel={`나의 대화: ${item.text}`}
                    >
                      {/* 다음 대화가 나일 때, 시간 표시를 없앰 */}
                      {!isNextMe(chatList, i) && <TimeViewer date={item.createdAt} />}

                      <MySpeechBubble text={item.text} />
                    </View>
                  </View>
                ) : (
                  // 상대방의 대화
                  <View key={item.createdAt}>
                    {isShowDate(chatList, i) && <DateViewer date={item.createdAt} />}

                    <View
                      style={styles.AnotherSpeechWrapper}
                      accessible
                      accessibilityLabel={`해설자의 대화: ${item.text}`}
                    >
                      <AnotherAvatar />

                      <AnotherSpeechBubble text={item.text} />

                      <TimeViewer date={item.createdAt} />
                    </View>

                    {/* 감사인사를 한 경우, 나의 감사인사도 표시 */}
                    {isAppreciated(item) && (
                      <View
                        style={[styles.mySpeechEndWrapper, { marginTop: 12 }]}
                        accessible
                        accessibilityLabel={`나의 대화: ${item.text}`}
                      >
                        <TimeViewer date={item.createdAt} />

                        <MySpeechBubble text={item.appreciatedText ?? ''} />
                      </View>
                    )}
                  </View>
                )
              )}
          </View>
        </ScrollView>

        {/* 질문, 감사 인사 버튼 */}
        {isNotButtonClicked && (
          <ActionButton
            isComplete={item?.isComplete}
            onThanksPress={() => setShowThanks(true)}
            onQuestPress={() => setShowQuest(true)}
          />
        )}

        {/* 질문 입력 창 */}
        {isShowQuest && <QuestionBox item={item} refresh={refresh} />}

        {/* 감사 인사 입력 창*/}
        {isShowThanks && <ThanksBox item={item} refresh={refresh} />}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  speechContainer: {
    flex: 1,
    gap: 12,

    marginTop: 3,
    marginBottom: 20,
  },
  mySpeechWrapper: {
    marginRight: 18,
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

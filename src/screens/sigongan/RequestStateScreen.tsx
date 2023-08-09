import { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SigonganStackParamList } from '../../navigations';

import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';

import { GetRequestList, IReqeustListItem } from '../../api/axios';

import { SigonganHeader } from '../../components/sigongan/SigonganHeader';
import {
  AnotherSpeechBubble,
  MySpeechBubble,
  TimeViewer,
  AnotherAvatar,
  ActionButton,
  ThanksBox,
  QuestionBox,
} from '../../components/sigongan/request-state';
import { DateViewer } from '../../components/sigongan/ai-chat';

import { getDate } from '../../utils/time';
import { useKeyboard } from '../../hooks';

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
  const isShowTimeViewer = (list: IReqeustListItem['requestedUser'], i: number) =>
    isShowDate(list, i) || !isNextMe(chatList, i);

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
                      style={isShowTimeViewer(chatList, i) ? styles.mySpeechEndWrapper : styles.mySpeechWrapper}
                      accessible
                      accessibilityLabel={`나의 대화: ${item.text.trimEnd()}`}
                    >
                      {/* 다음 대화가 나일 때, 시간 표시를 없앰 */}
                      {isShowTimeViewer(chatList, i) && <TimeViewer date={item.createdAt} />}

                      <MySpeechBubble text={item.text.trimEnd()} />
                    </View>
                  </View>
                ) : (
                  // 상대방의 대화
                  <View key={item.createdAt}>
                    {isShowDate(chatList, i) && <DateViewer date={item.createdAt} />}

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onLongPress={() =>
                        Alert.alert('알림', '이 답변을 신고하시겠습니까?', [{ text: '신고' }, { text: '취소' }])
                      }
                      accessible
                      accessibilityLabel={`해설자의 대화: ${item.text.trimEnd()}, 신고하려면 길게 누르세요`}
                    >
                      <View style={styles.AnotherSpeechWrapper}>
                        <AnotherAvatar />

                        <AnotherSpeechBubble text={item.text.trimEnd()} />

                        <TimeViewer date={item.createdAt} />
                      </View>
                    </TouchableOpacity>

                    {/* 감사인사를 한 경우, 나의 감사인사도 표시 */}
                    {isAppreciated(item) && (
                      <View
                        style={[styles.mySpeechEndWrapper, { marginTop: 12 }]}
                        accessible
                        accessibilityLabel={`나의 대화: ${item.text}`}
                      >
                        <TimeViewer date={item.appreciatedDate ?? ''} />

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

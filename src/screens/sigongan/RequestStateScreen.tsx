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

export const RequestStateScreen = () => {
  const {
    params: { item },
  } = useRoute<RouteProp<SigonganStackParamList, '해설 진행현황'>>();

  const [chatList, setChatList] = useState<IReqeustListItem['requestedUser']>([]);

  const navigation = useNavigation<NativeStackNavigationProp<SigonganStackParamList>>();

  const [isShowThanks, setShowThanks] = useState(false);
  const [isShowQuest, setShowQuest] = useState(false);

  const fcmToken = useRecoilValue(fcmTokenState);
  const insets = useSafeAreaInsets();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

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
    if (item) {
      setChatList([...item.requestedUser, ...item.responseUser]);
    }
  }, [item]);

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

  const isMe = (item: IReqeustListItem['requestedUser'][0]) => item.userId === undefined;
  const isNextMe = (list: IReqeustListItem['requestedUser'], i: number) => list.length !== i + 1 && isMe(list[i + 1]);
  const isAppreciated = (item: IReqeustListItem['requestedUser'][0]) => item.appreciated;

  const isNotButtonClicked = !(isShowThanks || isShowQuest);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -15 : 0}
    >
      <View style={styles.container}>
        <SigonganHeader text="해설 진행현황" onBackButtonPress={() => navigation.goBack()} isBottomBorder />

        <ScrollView ref={scrollViewRef}>
          <View style={styles.speechContainer}>
            {chatList
              .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1))
              .map((item, i) =>
                isMe(item) ? (
                  isNextMe(chatList, i) ? (
                    <View key={item.createdAt} style={styles.mySpeechWrapper}>
                      <MySpeechBubble text={item.text} />
                    </View>
                  ) : (
                    <View key={item.createdAt} style={styles.mySpeechEndWrapper}>
                      <TimeViewer date={item.createdAt} />

                      <MySpeechBubble text={item.text} />
                    </View>
                  )
                ) : isAppreciated(item) ? (
                  <View key={item.createdAt}>
                    <View style={styles.AnotherSpeechWrapper}>
                      <AnotherAvatar />

                      <AnotherSpeechBubble text={item.text} />

                      <TimeViewer date={item.createdAt} />
                    </View>
                    <View style={[styles.mySpeechEndWrapper, { marginTop: 12 }]}>
                      <TimeViewer date={item.createdAt} />

                      <MySpeechBubble text={item.appreciatedText ?? ''} />
                    </View>
                  </View>
                ) : (
                  <View key={item.createdAt} style={styles.AnotherSpeechWrapper}>
                    <AnotherAvatar />

                    <AnotherSpeechBubble text={item.text} />

                    <TimeViewer date={item.createdAt} />
                  </View>
                )
              )}
          </View>
        </ScrollView>

        {isNotButtonClicked && (
          <ActionButton
            isComplete={item?.isComplete}
            onThanksPress={() => setShowThanks(true)}
            onQuestPress={() => setShowQuest(true)}
          />
        )}

        {isShowThanks && <ThanksBox item={item} refresh={refresh} />}

        {isShowQuest && <QuestionBox item={item} refresh={refresh} />}
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

    marginTop: 18,
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

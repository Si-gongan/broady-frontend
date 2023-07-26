import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import {
  AnotherSpeechBubble,
  MySpeechBubble,
  TimeViewer,
  AnotherAvatar,
  ActionButton,
  ThanksBox,
  QuestionBox,
} from '../../components/sigongan/request-state';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SigonganStackParamList } from '../../navigations';
import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';
import { useEffect, useState } from 'react';
import { IReqeustListItem } from '../../api/axios';

export const RequestStateScreen = () => {
  const {
    params: { item },
  } = useRoute<RouteProp<SigonganStackParamList, '해설 진행현황'>>();

  const [chatList, setChatList] = useState<IReqeustListItem['requestedUser']>([]);

  const [isShowThanks, setShowThanks] = useState(false);
  const [isShowQuest, setShowQuest] = useState(false);

  useEffect(() => {
    if (item) {
      setChatList([...item.requestedUser, ...item.responseUser]);
    }
  }, [item]);
  console.log('item: ', item);

  const insets = useSafeAreaInsets();

  const isMe = (item: IReqeustListItem['requestedUser'][0]) => item.userId === undefined;
  const isNotButtonClicked = !(isShowThanks || isShowQuest);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 44 + insets.top - insets.bottom + 22 : 80}
    >
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.speechContainer}>
            {chatList
              .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1))
              .map((item) =>
                isMe(item) ? (
                  <View key={item.createdAt} style={styles.mySpeechEndWrapper}>
                    <TimeViewer date={item.createdAt} />

                    <MySpeechBubble text={item.text} />
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
            isComplete={item.isComplete}
            onThanksPress={() => setShowThanks(true)}
            onQuestPress={() => setShowQuest(true)}
          />
        )}

        {isShowThanks && <ThanksBox />}

        {isShowQuest && <QuestionBox />}
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

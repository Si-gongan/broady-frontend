import { View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native';
import { ImageController, QuestTextArea, SubmitRequestButton } from '../../components/sigongan/comment-request';

import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useRef, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SigonganStackParamList } from '../../navigations';
import { CommentRequestPopup, ICommentRequestPopupHandler } from '../../components/sigongan/home';
import { NoticeError, RegisterRequest } from '../../api/axios';
import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Spinner from 'react-native-loading-spinner-overlay';
import { SigonganHeader } from '../../components/sigongan/SigonganHeader';
import { useKeyboard } from '../../hooks';

export const CommentRequestScreen = () => {
  // for page move
  /** @param url: 이미지 로컬 url */
  const {
    params: { url },
  } = useRoute<RouteProp<SigonganStackParamList, '해설의뢰'>>();
  const navigation = useNavigation<NativeStackNavigationProp<SigonganStackParamList>>();

  // api
  const fcmToken = useRecoilValue(fcmTokenState);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  // popup
  const commentRequestPopupRef = useRef<ICommentRequestPopupHandler>(null);

  // for ux
  const scrollViewRef = useRef<ScrollView>(null);
  const { isKeyboardVisible } = useKeyboard();
  useEffect(() => {
    if (isKeyboardVisible) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [isKeyboardVisible]);

  const onSubmit = async () => {
    if (value.length === 0) {
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

      await RegisterRequest(value, url ?? '', fcmToken);
      navigation.goBack();
    } catch {
      NoticeError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -15 : 0}
    >
      <SigonganHeader text="해설의뢰" onBackButtonPress={() => navigation.goBack()} />

      <Spinner visible={loading} />

      {/* 이미지, 전송 폼 */}
      <ScrollView ref={scrollViewRef}>
        <View style={styles.container}>
          {url && <ImageController imgUrl={url} onPress={() => commentRequestPopupRef.current?.open()} />}

          <QuestTextArea value={value} onChangeValue={setValue} />
        </View>
      </ScrollView>

      {/* 전송 버튼 */}
      <SubmitRequestButton onPress={onSubmit} disabled={loading} />

      {/* 사진 다시 선택 팝업 */}
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

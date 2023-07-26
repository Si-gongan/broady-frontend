import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native';
import { ImageController, QuestTextArea, SubmitRequestButton } from '../../components/sigongan/comment-request';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useRef, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SigonganStackParamList } from '../../navigations';
import { CommentRequestPopup, ICommentRequestPopupHandler } from '../../components/sigongan/home';
import { RegisterRequest } from '../../api/axios';
import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Spinner from 'react-native-loading-spinner-overlay';
import { SigonganHeader } from '../../components/sigongan/SigonganHeader';

export const CommentRequestScreen = () => {
  const {
    params: { url },
  } = useRoute<RouteProp<SigonganStackParamList, '해설의뢰'>>();
  const [value, setValue] = useState('');
  const fcmToken = useRecoilValue(fcmTokenState);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const commentRequestPopupRef = useRef<ICommentRequestPopupHandler>(null);

  const navigation = useNavigation<NativeStackNavigationProp<SigonganStackParamList>>();

  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);

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

      const _ = await RegisterRequest(value, url ?? '', fcmToken);
      navigation.goBack();
    } catch {
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
      keyboardVerticalOffset={Platform.OS === 'ios' ? -15 : 0}
    >
      <SigonganHeader text="해설의뢰" onBackButtonPress={() => navigation.goBack()} />

      <Spinner visible={loading} />

      <ScrollView ref={scrollViewRef}>
        <View style={styles.container}>
          {url && <ImageController imgUrl={url} onPress={() => commentRequestPopupRef.current?.open()} />}

          <QuestTextArea value={value} onChangeValue={setValue} />
        </View>
      </ScrollView>

      <SubmitRequestButton onPress={onSubmit} disabled={loading} />

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

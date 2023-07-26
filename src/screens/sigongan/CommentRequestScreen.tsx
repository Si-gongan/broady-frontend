import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 44 + insets.top : 80}
    >
      <ScrollView ref={scrollViewRef}>
        <View style={styles.container}>
          {url && <ImageController imgUrl={url} onPress={() => commentRequestPopupRef.current?.open()} />}

          <QuestTextArea value={value} onChangeValue={setValue} />
        </View>
      </ScrollView>

      <SubmitRequestButton
        onPress={async () => {
          try {
            const res = await RegisterRequest(value, url ?? '', fcmToken);

            // TODO: 팝업 처리 등록 완료
            navigation.goBack();
          } catch (e) {
            console.log('error', e);
          }

          // TODO: 페이지 이동 처리
        }}
      />

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

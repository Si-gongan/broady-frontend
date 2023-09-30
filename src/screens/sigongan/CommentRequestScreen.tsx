import { useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SigonganStackParamList } from '../../navigations';

import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';

import { RegisterRequest } from '../../api/axios';

import { useKeyboard } from '../../hooks';
import { Header, IImageMethodPopupHandler, PaddingHorizontal } from '../../components/renewal';

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
  const ImageMethodPopup = useRef<IImageMethodPopupHandler>(null);

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
      console.log('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <SafeAreaView style={styles.container}>
        <Header text="질문작성" isBottomBorder />

        <PaddingHorizontal value={20}></PaddingHorizontal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

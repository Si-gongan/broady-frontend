import { useEffect, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SigonganStackParamList } from '../../navigations';

import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';

import { RegisterRequest } from '../../api/axios';

import { useKeyboard } from '../../hooks';
import {
  Colors,
  Fonts,
  BomHeader,
  IImageMethodPopupHandler,
  BomButton,
  PaddingHorizontal,
  Utils,
  ImageMethodPopup,
  NoticeError,
  Notice,
} from '../../components/renewal';
import { useLoading } from '../../providers';

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

  const { isLoading, changeLoading } = useLoading();

  // popup
  const ImageMethodPopupRef = useRef<IImageMethodPopupHandler>(null);

  // for keyboard
  const insets = useSafeAreaInsets();

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
      Notice('질문을 입력해주세요.');

      return;
    }

    try {
      changeLoading(true);

      await RegisterRequest(value, url ?? '', fcmToken);
      navigation.goBack();
    } catch {
      NoticeError();
    } finally {
      changeLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={-insets.bottom}
      >
        <BomHeader text="질문작성" isBottomBorder />

        <PaddingHorizontal value={20}>
          <ScrollView ref={scrollViewRef}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: url }} style={styles.image} accessible accessibilityLabel="업로드한 사진" />
            </View>

            <View style={{ marginTop: 10 }}>
              <BomButton
                text="사진 다시 선택하기 &#8634;"
                theme="primary"
                onPress={() => ImageMethodPopupRef.current?.open()}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>질문을 입력해주세요.</Text>

              <TextInput
                style={[
                  styles.input,
                  Utils.borderColor(Colors.Red.Lighten300),
                  Fonts.Regular14,
                  Utils.fontColor(Colors.Font.secondary),
                ]}
                multiline
                value={value}
                onChangeText={setValue}
                accessible
                accessibilityLabel="질문 입력 창"
              />
            </View>

            <View style={{ marginTop: 40, marginBottom: 15 }}>
              <BomButton text="사진 질문하기" theme="secondary" onPress={onSubmit} disabled={isLoading} />
            </View>
          </ScrollView>
        </PaddingHorizontal>
      </KeyboardAvoidingView>

      <ImageMethodPopup ref={ImageMethodPopupRef} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    marginTop: 30,

    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    maxWidth: 353,
    height: 252,

    borderRadius: 12,
  },
  inputContainer: {
    marginTop: 25,

    gap: 10,
  },
  input: {
    height: 150,

    padding: 10,
    paddingTop: 10,

    textAlignVertical: 'top',

    borderRadius: 12,
  },
});

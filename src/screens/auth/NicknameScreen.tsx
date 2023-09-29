import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthStackParamList } from '../../navigations';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AuthInput,
  BomCheckBox,
  Fonts,
  Header,
  LongButton,
  PaddingHorizontal,
  TERMS_OF_USE,
  Utils,
  Colors,
} from '../../components/renewal';
import { useForm, Controller } from 'react-hook-form';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';

type INicknameForm = {
  nickname: string;
};

export const NicknameScreen = () => {
  const {
    params: { type },
  } = useRoute<RouteProp<AuthStackParamList, '닉네임 입력'>>();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<INicknameForm>();

  // for term-of-use
  const [isChecked, setChecked] = useState(false);
  const onCheckBoxClicked = async () => {
    if (isChecked) {
      setChecked(false);
      return;
    }

    await WebBrowser.openBrowserAsync(TERMS_OF_USE);

    setChecked((prev) => !prev);
  };

  // for upload-nickname
  const onSubmit = async (data: INicknameForm) => {
    const { nickname } = data;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <SafeAreaView style={styles.container}>
        <Header text="닉네임 설정" isBottomBorder />

        <PaddingHorizontal value={20}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.inputsWrapper}>
              <View style={styles.inputItem}>
                <Controller
                  control={control}
                  rules={{
                    required: '닉네임을 입력해주세요.',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AuthInput
                      text="사용하실 닉네임을 입력해주세요."
                      value={value}
                      onBlur={onBlur}
                      onChangeValue={onChange}
                    />
                  )}
                  name="nickname"
                />
                {errors.nickname && <Text style={[Fonts.Regular14, { color: 'red' }]}>{errors.nickname?.message}</Text>}
              </View>
            </View>

            <View style={styles.startWrapper}>
              {type === 'sigongan' && (
                <View style={styles.checkWrapper}>
                  <BomCheckBox
                    value={isChecked}
                    onValueChange={onCheckBoxClicked}
                    accessibilityLabel="이용약관 숙지 체크박스"
                  />

                  <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>
                    이용약관을 숙지했으며, 이에 동의합니다.
                  </Text>
                </View>
              )}

              <LongButton text="봄자국 시작하기" theme="secondary" />
            </View>
          </ScrollView>
        </PaddingHorizontal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputsWrapper: {
    marginTop: 30,

    gap: 20,
  },
  inputItem: {
    gap: 5,
  },
  startWrapper: {
    marginTop: 30,

    gap: 10,

    alignItems: 'center',
  },
  checkWrapper: {
    flexDirection: 'row',

    gap: 10,
  },
});

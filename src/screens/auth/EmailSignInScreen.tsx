import { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';
import { useLoading, useUserState } from '../../providers';

import { AuthInput, Fonts, BomHeader, BomButton, Notice, PaddingHorizontal } from '../../components/renewal';
import { Login } from '../../api/axios';

type ILoginForm = {
  email: string;
  password: string;
};

const SCROLL_GAP = 79.3;

export const EmailSignInScreen = () => {
  const fcmToken = useRecoilValue(fcmTokenState);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>();

  const { changeLoading } = useLoading();

  const { loginToComment } = useUserState();

  // for ux
  const scrollViewRef = useRef<ScrollView>(null);
  const passwordRef = useRef<TextInput>(null);

  // for login
  const onSubmit = async (data: ILoginForm) => {
    const { email, password } = data;

    try {
      changeLoading(true);

      const res = await Login(email, password, fcmToken);
      const authToken = res.data.result.token;

      loginToComment(authToken);
    } catch {
      Notice('존재하지 않는 회원 정보입니다.');
    } finally {
      changeLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <SafeAreaView style={styles.container}>
        <BomHeader text="이메일로 로그인" isBottomBorder />

        <PaddingHorizontal value={20}>
          <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
            <View style={styles.inputsWrapper}>
              <View style={styles.inputItem}>
                <Controller
                  control={control}
                  rules={{
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                      message: '이메일 형식을 지켜주세요.',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AuthInput
                      text="이메일"
                      value={value}
                      onBlur={onBlur}
                      onChangeValue={onChange}
                      onSubmitEditing={() => {
                        passwordRef.current?.focus();
                        scrollViewRef.current?.scrollTo({ y: SCROLL_GAP, animated: true });
                      }}
                    />
                  )}
                  name="email"
                />
                {errors.email && <Text style={[Fonts.Regular14, { color: 'red' }]}>{errors.email?.message}</Text>}
              </View>

              <View style={styles.inputItem}>
                <Controller
                  control={control}
                  rules={{
                    required: '비밀번호를 입력해주세요.',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AuthInput
                      text="비밀번호"
                      inputRef={passwordRef}
                      value={value}
                      onBlur={onBlur}
                      onChangeValue={onChange}
                      secureTextEntry
                    />
                  )}
                  name="password"
                />
                {errors.password && <Text style={[Fonts.Regular14, { color: 'red' }]}>{errors.password?.message}</Text>}
              </View>
            </View>

            <View style={styles.loginWrapper}>
              <BomButton text="로그인" theme="secondary" onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />
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
  loginWrapper: {
    marginTop: 30,
  },
});

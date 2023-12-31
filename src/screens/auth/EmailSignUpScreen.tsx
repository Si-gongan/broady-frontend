import { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigations';

import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';
import { useLoading } from '../../providers';

import * as WebBrowser from 'expo-web-browser';

import {
  AuthInput,
  BomCheckBox,
  Colors,
  Fonts,
  BomHeader,
  BomButton,
  Notice,
  PaddingHorizontal,
  TERMS_OF_USE,
  Utils,
} from '../../components/renewal';
import { Login, Register } from '../../api/axios';

type IRegisterForm = {
  email: string;
  password: string;
  password2: string;
};

const SCROLL_GAP = 79.3;

export const EmailSignUpScreen = () => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterForm>();

  const { changeLoading } = useLoading();

  // for ux
  const scrollViewRef = useRef<ScrollView>(null);
  const passwordRef = useRef<TextInput>(null);
  const password2Ref = useRef<TextInput>(null);

  // for term-of-use
  const [isChecked, setChecked] = useState(false);

  // for register
  const onSubmit = async (data: IRegisterForm) => {
    const { email, password } = data;

    try {
      changeLoading(true);

      await Register(email, password, fcmToken);

      const resLogin = await Login(email, password, fcmToken);
      const authToken = resLogin.data.result.token;

      navigation.push('닉네임 입력', { type: 'Comment', token: authToken });
    } catch {
      Notice('이미 존재하는 이메일입니다.');
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
                      onSubmitEditing={() => {
                        password2Ref.current?.focus();
                        scrollViewRef.current?.scrollTo({ y: SCROLL_GAP * 2, animated: true });
                      }}
                      secureTextEntry
                    />
                  )}
                  name="password"
                />
                {errors.password && <Text style={[Fonts.Regular14, { color: 'red' }]}>{errors.password?.message}</Text>}
              </View>

              <View style={styles.inputItem}>
                <Controller
                  control={control}
                  rules={{
                    validate: (value) => (value === watch('password') ? true : '비밀번호가 일치하지 않습니다.'),
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AuthInput
                      text="비밀번호 확인"
                      inputRef={password2Ref}
                      value={value}
                      onBlur={onBlur}
                      onChangeValue={onChange}
                      secureTextEntry
                    />
                  )}
                  name="password2"
                />
                {errors.password2 && (
                  <Text style={[Fonts.Regular14, { color: 'red' }]}>{errors.password2?.message}</Text>
                )}
              </View>
            </View>

            <View style={styles.registerWrapper}>
              <View style={styles.checkWrapper}>
                <BomCheckBox value={isChecked} onValueChange={setChecked} accessibilityLabel="이용약관 숙지 체크박스" />

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => WebBrowser.openBrowserAsync(TERMS_OF_USE)}
                    accessible
                    accessibilityLabel="이용약관, 이 버튼을 누르면 이용약관을 볼 수 있습니다."
                    hitSlop={{ top: 5, bottom: 5, right: 10 }}
                  >
                    <Text
                      style={[
                        Fonts.Regular14,
                        Utils.fontColor(Colors.Font.primary),
                        { textDecorationLine: 'underline' },
                        { marginBottom: 1 },
                      ]}
                    >
                      이용약관
                    </Text>
                  </TouchableOpacity>

                  <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>
                    을 숙지했으며, 이에 동의합니다.
                  </Text>
                </View>
              </View>
              <BomButton
                text="회원가입"
                onPress={handleSubmit(onSubmit)}
                disabled={!isChecked || isSubmitting}
                theme="primary"
              />
            </View>

            <View style={styles.loginWrapper}>
              <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>이미 회원이신가요?</Text>

              <BomButton text="로그인" theme="secondary" onPress={() => navigation.push('이메일 로그인')} />
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
  registerWrapper: {
    marginTop: 30,

    gap: 10,

    alignItems: 'center',
  },
  checkWrapper: {
    flexDirection: 'row',

    gap: 10,
  },
  loginWrapper: {
    marginTop: 24,

    gap: 10,

    alignItems: 'center',
  },
});

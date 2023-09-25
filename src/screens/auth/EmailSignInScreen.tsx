import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthStackParamList } from '../../navigations';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthInput, Fonts, Header, LongButton, PaddingHorizontal } from '../../components/renewal';
import { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';

type ILoginForm = {
  email: string;
  password: string;
};

const SCROLL_GAP = 79.3;

export const EmailSignInScreen = () => {
  const {
    params: { type },
  } = useRoute<RouteProp<AuthStackParamList, '이메일 로그인'>>();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>();

  // for ux
  const scrollViewRef = useRef<ScrollView>(null);
  const passwordRef = useRef<TextInput>(null);

  // for login
  const onSubmit = async (data: ILoginForm) => {
    const { email, password } = data;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <SafeAreaView style={styles.container}>
        <Header text="이메일로 로그인" isBottomBorder />

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
              <LongButton text="로그인" theme="secondary" />
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

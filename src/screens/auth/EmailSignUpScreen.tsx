import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AuthStackParamList } from '../../navigations';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthInput, BomCheckBox, Colors, Fonts, Header, LongButton, Utils } from '../../components/renewal';
import { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

type IRegisterForm = {
  email: string;
  password: string;
  password2: string;
};

export const EmailSignUpScreen = () => {
  const {
    params: { type },
  } = useRoute<RouteProp<AuthStackParamList, '이메일 회원가입'>>();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterForm>();

  const scrollViewRef = useRef<ScrollView>(null);

  const onSubmit = async (data: IRegisterForm) => {
    const { email, password } = data;
  };

  const [isChecked, setChecked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header text="이메일로 로그인" isBottomBorder />

      <ScrollView ref={scrollViewRef}>
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
                <AuthInput text="이메일" value={value} onBlur={onBlur} onChangeValue={onChange} />
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
                <AuthInput text="비밀번호" value={value} onBlur={onBlur} onChangeValue={onChange} secureTextEntry />
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
                  value={value}
                  onBlur={onBlur}
                  onChangeValue={onChange}
                  secureTextEntry
                />
              )}
              name="password2"
            />
            {errors.password2 && <Text style={[Fonts.Regular14, { color: 'red' }]}>{errors.password2?.message}</Text>}
          </View>
        </View>

        <View style={styles.registerWrapper}>
          <View style={styles.checkWrapper}>
            <BomCheckBox value={isChecked} onValueChange={setChecked} accessibilityLabel="이용약관 숙지 체크박스" />

            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>
              이용약관을 숙지했으며, 이에 동의합니다.
            </Text>
          </View>
          <LongButton text="회원가입" onPress={handleSubmit(onSubmit)} disabled={isSubmitting} theme="primary" />
        </View>

        <View style={styles.loginWrapper}>
          <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>이미 회원이신가요?</Text>

          <LongButton text="로그인" theme="secondary" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,
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

import { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { CommonButton, CommonHeader, CustomTextInput } from '../../components/auth';

import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigations';
import { AuthColor, AuthFont } from '../../components/auth/styles';
import { fcmTokenState } from '../../states';
import { useRecoilValue } from 'recoil';
import { Login, Register } from '../../api/axios';
import { useUserState } from '../../providers';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';

import Spinner from 'react-native-loading-spinner-overlay';

type IRegisterForm = {
  email: string;
  password: string;
  password2: string;
};

export const EmailSignUpScreen = () => {
  const fcmToken = useRecoilValue(fcmTokenState);

  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const passwordRef = useRef<TextInput>(null);
  const password2Ref = useRef<TextInput>(null);

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterForm>();

  const { loginToComment } = useUserState();

  const onSubmit = async (data: IRegisterForm) => {
    const { email, password } = data;

    try {
      setLoading(true);

      await Register(email, password, fcmToken);

      const resLogin = await Login(email, password, fcmToken);

      const authToken = resLogin.data.result.token;
      loginToComment(authToken);
    } catch {
      Alert.alert('알림', '이미 존재하는 이메일입니다.', [{ text: '확인', style: 'default' }]);
    } finally {
      setLoading(false);
    }
  };

  const [isChecked, setChecked] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommonHeader text="이메일로 계속하기" onBackButtonPress={() => navigation.goBack()} />

      <Spinner visible={loading} />

      <View style={styles.container}>
        <View style={styles.formWrapper}>
          <View style={styles.inputWrapper}>
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
                <CustomTextInput
                  text="이메일"
                  value={value}
                  onBlur={onBlur}
                  onChangeValue={onChange}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
              )}
              name="email"
            />
            {errors.email && <Text style={[AuthFont.quaternary, { color: 'red' }]}>{errors.email?.message}</Text>}
          </View>

          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              rules={{
                required: '비밀번호를 입력해주세요.',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  text="비밀번호"
                  inputRef={passwordRef}
                  value={value}
                  onBlur={onBlur}
                  onChangeValue={onChange}
                  onSubmitEditing={() => password2Ref.current?.focus()}
                  secureTextEntry
                />
              )}
              name="password"
            />
            {errors.password && <Text style={[AuthFont.quaternary, { color: 'red' }]}>{errors.password?.message}</Text>}
          </View>

          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              rules={{
                validate: (value) => (value === watch('password') ? true : '비밀번호가 일치하지 않습니다.'),
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
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
              <Text style={[AuthFont.quaternary, { color: 'red' }]}>{errors.password2?.message}</Text>
            )}
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.8} onPress={() => setChecked((prev) => !prev)}>
          <View style={styles.signUpWrapper}>
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? AuthColor.secondary.backgroundColor : undefined}
              accessible
              accessibilityLabel="이용약관 숙지 체크박스"
              accessibilityLabelledBy="checkBox"
              accessibilityState={{ checked: isChecked }}
            />

            <Text nativeID="checkBox" style={[AuthFont.teritary, AuthColor.contentPrimary]}>
              이용약관을 숙지했으며, 이에 동의합니다.
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{ marginTop: 14 }}>
          <CommonButton text="회원가입" onPress={handleSubmit(onSubmit)} disabled={!isChecked || isSubmitting} />
        </View>

        <View style={{ marginTop: 25 }}>
          <Text style={[AuthFont.teritary, AuthColor.contentPrimary]}>이미 회원이신가요?</Text>
        </View>

        <View style={{ marginTop: 14 }}>
          <CommonButton text="로그인" onPress={() => navigation.push('이메일 로그인')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 35,
  },
  formWrapper: {
    gap: 22,
    alignItems: 'center',
  },
  inputWrapper: {
    gap: 5,
  },
  signUpWrapper: {
    width: 343,
    flexDirection: 'row',

    gap: 14,
    marginTop: 36,
  },
});

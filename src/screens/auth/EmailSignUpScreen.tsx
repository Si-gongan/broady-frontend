import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { CommonButton, CustomTextInput } from '../../components/auth';

import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigations';
import { AuthColor, AuthFont } from '../../components/auth/styles';
import { fcmTokenState } from '../../states';
import { useRecoilValue } from 'recoil';
import { Login, Register } from '../../api/axios';
import { AUTH_TOKEN, USER_STATE, storeData } from '../../components/common/async-storage';
import { useUserState } from '../../providers';

type IRegisterForm = {
  email: string;
  password: string;
  password2: string;
};

export const EmailSignUpScreen = () => {
  const fcmToken = useRecoilValue(fcmTokenState);

  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterForm>();

  const { changeUserState } = useUserState();

  const onSubmit = async (data: IRegisterForm) => {
    const { email, password } = data;

    try {
      const resRegister = await Register(email, password, fcmToken);
      const resLogin = await Login(email, password, fcmToken);

      const authToken = resLogin.data.result.token;

      storeData(USER_STATE, 'Comment');
      storeData(AUTH_TOKEN, authToken);

      changeUserState('Comment');
    } catch (e: any) {
      // 회원가입 실패 (이미 있는 아이디일 때..? )
      // console.log('error', e.response.data);
    }
  };

  const [isChecked, setChecked] = useState(false);

  return (
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
              <CustomTextInput text="이메일" value={value} onBlur={onBlur} onChangeValue={onChange} />
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
              <CustomTextInput text="비밀번호" value={value} onBlur={onBlur} onChangeValue={onChange} secureTextEntry />
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
                value={value}
                onBlur={onBlur}
                onChangeValue={onChange}
                secureTextEntry
              />
            )}
            name="password2"
          />
          {errors.password2 && <Text style={[AuthFont.quaternary, { color: 'red' }]}>{errors.password2?.message}</Text>}
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
        <CommonButton text="회원가입" onPress={handleSubmit(onSubmit)} disabled={!isChecked} />
      </View>

      <View style={{ marginTop: 25 }}>
        <Text style={[AuthFont.teritary, AuthColor.contentPrimary]}>이미 회원이신가요?</Text>
      </View>

      <View style={{ marginTop: 14 }}>
        <CommonButton text="로그인" onPress={() => navigation.push('이메일 로그인')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  formWrapper: {
    marginTop: 19,

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

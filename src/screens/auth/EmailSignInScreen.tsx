import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { CommonButton, CustomTextInput } from '../../components/auth';
import { useUserState } from '../../providers';
import { Login } from '../../api/axios';
import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';
import { AuthFont } from '../../components/auth/styles';
import { AUTH_TOKEN, USER_STATE, storeData } from '../../components/common/async-storage';

type ILoginForm = {
  email: string;
  password: string;
};

export const EmailSignInScreen = ({ navigation }: any) => {
  const [fcmToken] = useRecoilValue(fcmTokenState);

  const { loginToComment } = useUserState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit = async (data: ILoginForm) => {
    const { email, password } = data;

    try {
      const res = await Login(email, password, fcmToken);
      const authToken = res.data.result.token;

      loginToComment(authToken);
    } catch (e: any) {
      console.log('로그인 실패');
      // console.log('error', e.response.data);
    }
  };

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
      </View>

      <View style={{ marginTop: 36 }}>
        <CommonButton text="로그인" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 19,

    alignItems: 'center',
  },
  inputWrapper: {
    gap: 5,
  },
  formWrapper: {
    gap: 22,
  },
});

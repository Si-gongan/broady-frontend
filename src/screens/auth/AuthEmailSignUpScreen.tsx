import { CommonErrorResponse } from '@/@types/response';
import {
  ICommentRegisterReturnType,
  ISigonganRegisterReturnType,
  RegisterToComment,
  RegisterToSigongan,
} from '@/axios/auth';
import AuthInput from '@/components/auth/AuthInput';
import CheckBox from '@/components/auth/CheckBox';
import BroadyButton from '@/components/common/BroadyButton';
import CheckBoxForm from '@/components/common/CheckBoxForm';
import ContentsWrapper from '@/components/common/ContentsWrapper';
import FlexBox from '@/components/common/FlexBox';
import Icons from '@/components/common/Icons';
import Margin from '@/components/common/Margin';
import PageHeader from '@/components/common/PageHeader';
import Typography from '@/components/common/Typography';
import { GET_MARGIN, GET_PADDING, THEME } from '@/constants/theme';
import { useAuthNavigation } from '@/hooks';
import { emailValidator, passwordValidator } from '@/library/auth/validator';
import { showErrorToast } from '@/library/toast/toast';
import { useUserState } from '@/providers';
import { fcmTokenState, loginFromState } from '@/states/user';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { useRecoilValue } from 'recoil';

export const AuthEmailSignUpScreen = () => {
  const authNavigation = useAuthNavigation();
  const fcmToken = useRecoilValue(fcmTokenState);
  const loginFrom = useRecoilValue(loginFromState);
  const { login, setCurrentUser } = useUserState();

  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    emailError: '',
    passwordError: '',
    passwordConfirmError: '',
    isAgreeFirst: false,
    isAgreeSecond: false,
  });

  const onSubmit = async () => {
    let hasError = false;
    if (emailValidator(form.email) !== '') {
      setForm((prev) => ({ ...prev, emailError: emailValidator(form.email) }));
      hasError = true;
    }

    if (passwordValidator(form.password) !== '') {
      setForm((prev) => ({ ...prev, passwordError: passwordValidator(form.password) }));
      hasError = true;
    }

    if (form.password !== form.passwordConfirm) {
      setForm((prev) => ({ ...prev, passwordConfirmError: '비밀번호가 일치하지 않습니다' }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    if (!form.isAgreeFirst || !form.isAgreeSecond) {
      showErrorToast('약관에 동의해주세요');
      return;
    }

    try {
      if (loginFrom === 'Comment') {
        const res = await RegisterToComment(form.email, form.password, fcmToken);

        const {
          result: {
            token,
            commentUser: { nickname },
            commentUser,
          },
        } = res.data;

        login(token, 'Comment');

        setCurrentUser(commentUser, 'Comment');

        if (!nickname) {
          authNavigation.navigate('nickname');
        } else {
          authNavigation.navigate('onBoarding');
        }
      } else if (loginFrom === 'Sigongan') {
        const res = await RegisterToSigongan(form.email, form.password, fcmToken);

        const {
          result: {
            sigonganUser: { nickname },
            sigonganUser,
            token,
          },
        } = res.data;

        login(token, 'Sigongan');

        setCurrentUser(sigonganUser, 'Sigongan');

        if (!nickname) {
          authNavigation.navigate('nickname');
        } else {
          authNavigation.navigate('onBoarding');
        }
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data);

        const {
          result: { errorCode },
        } = e.response?.data as CommonErrorResponse;

        if (errorCode === 1003) {
          showErrorToast('이미 가입된 이메일입니다. 로그인해주세요.');
        }
      }
    }
  };

  const onChangeText = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value, [`${key}Error`]: '' }));
  };

  const onCheck = (key: 'isAgreeFirst' | 'isAgreeSecond') => {
    setForm((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <PageHeader title="이메일로 회원가입하기" />

      <FlexBox
        direction="column"
        justifyContent="space-between"
        styles={{
          flex: 1,
        }}
      >
        <View></View>
        <ContentsWrapper>
          <FlexBox direction="column" gap={GET_MARGIN('h3') + 10}>
            <AuthInput
              inputText={form.email}
              onChangeText={(text) => {
                onChangeText('email', text);
              }}
              initialType="email"
              label="이메일"
              placeholder="이메일을 입력해주세요"
              errorMessage={form.emailError}
            />
            <AuthInput
              inputText={form.password}
              onChangeText={(text) => {
                onChangeText('password', text);
              }}
              initialType="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              errorMessage={form.passwordError}
            />
            <AuthInput
              inputText={form.passwordConfirm}
              onChangeText={(text) => {
                onChangeText('passwordConfirm', text);
              }}
              initialType="password"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해주세요"
              errorMessage={form.passwordConfirmError}
            />
          </FlexBox>
        </ContentsWrapper>
        <ContentsWrapper>
          <CheckBoxForm
            onPress={() => {
              onCheck('isAgreeFirst');
            }}
            text="이용약관을 숙지하였으며 동의합니다."
            checked={form.isAgreeFirst}
          />
          <CheckBoxForm
            onPress={() => {
              onCheck('isAgreeSecond');
            }}
            text="개인정보 처리방침 동의"
            checked={form.isAgreeSecond}
          />
          <Margin margin={GET_MARGIN('h3')} />
        </ContentsWrapper>
      </FlexBox>
      <ContentsWrapper>
        <BroadyButton text="다음" variant="primary" onPress={onSubmit} />
      </ContentsWrapper>
      <Margin margin={GET_MARGIN('layout_xl')} />
    </View>
  );
};

import { CommonErrorResponse } from '@/@types/response';
import { ICommentLoginReturnType, ISigonganLoginReturnType, LoginToComment, LoginToSigongan } from '@/axios';
import AuthInput from '@/components/auth/AuthInput';
import BroadyButton from '@/components/common/BroadyButton';
import ContentsWrapper, { CenteredContentsWrapper } from '@/components/common/ContentsWrapper';
import FlexBox from '@/components/common/FlexBox';
import Margin from '@/components/common/Margin';
import PageHeader from '@/components/common/PageHeader';
import Typography from '@/components/common/Typography';
import { GET_MARGIN } from '@/constants/theme';
import { useAuthNavigation } from '@/hooks';
import { emailValidator, passwordValidator } from '@/library/auth/validator';
import { showErrorToast } from '@/library/toast/toast';
import { useUserState } from '@/providers';
import { SigonganUserState, fcmTokenState, loginFromState } from '@/states';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const AuthEmailSignInScreen = () => {
  const authNavigation = useAuthNavigation();
  const fcmToken = useRecoilValue(fcmTokenState);
  const { login } = useUserState();
  const loginFrom = useRecoilValue(loginFromState);

  const [form, setForm] = useState({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
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

    if (hasError) {
      return;
    }

    try {
      if (loginFrom === 'Comment') {
        const res = await LoginToComment(form.email, form.password, fcmToken);

        const {
          result: {
            commentUser: { createdAt, email, nickname },
            token,
          },
        } = res.data as ICommentLoginReturnType;

        login(token, 'Comment');

        if (!nickname) {
          authNavigation.navigate('nickname');
        } else {
          authNavigation.navigate('onBoarding');
        }
      } else if (loginFrom === 'Sigongan') {
        const res = await LoginToSigongan(form.email, form.password, fcmToken);

        const {
          result: { sigonganUser, token },
        } = res.data as ISigonganLoginReturnType;

        login(token, 'Sigongan');

        if (!sigonganUser.nickname) {
          authNavigation.navigate('nickname');
        } else {
          authNavigation.navigate('onBoarding');
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response?.data as CommonErrorResponse;
        console.log(res);

        if (res.result.errorCode === 1004) {
          showErrorToast('유저가 존재하지 않아요. 회원가입을 해주세요');
        } else {
          res.result.message && showErrorToast(res.result.message);
        }
      }
    }
  };

  const onChangeText = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value, [`${key}Error`]: '' }));
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <PageHeader title="이메일로 로그인하기" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <FlexBox styles={{ flex: 1 }} direction="column" justifyContent="space-between">
            <ContentsWrapper>
              <Margin margin={20}></Margin>
              <CenteredContentsWrapper>
                <Typography size="body_md" weight="light">
                  아직 브로디 회원이 아니신가요?
                </Typography>
              </CenteredContentsWrapper>
              <Margin margin={GET_MARGIN('h3')}></Margin>
              <BroadyButton
                variant="secondary"
                text="회원가입"
                onPress={() => authNavigation.push('broadyEmailRegister')}
              />
              <Margin margin={GET_MARGIN('layout_lg')}></Margin>
              <AuthInput
                inputText={form.email}
                initialType="email"
                placeholder="이메일"
                onChangeText={(value) => {
                  onChangeText('email', value);
                }}
                errorMessage={form.emailError}
                label="이메일"
              ></AuthInput>
              <Margin margin={GET_MARGIN('layout_md')}></Margin>
              <AuthInput
                inputText={form.password}
                initialType="password"
                placeholder="패스워드"
                onChangeText={(value) => {
                  onChangeText('password', value);
                }}
                errorMessage={form.passwordError}
                label="패스워드"
              ></AuthInput>
            </ContentsWrapper>
            <ContentsWrapper>
              <Margin margin={150}></Margin>
              <BroadyButton variant="secondary" text="로그인" onPress={onSubmit} />
              <Margin margin={GET_MARGIN('layout_sm')}></Margin>
            </ContentsWrapper>
          </FlexBox>
        </ScrollView>
      </KeyboardAvoidingView>
      <Margin margin={GET_MARGIN('layout_xl')}></Margin>
    </View>
  );
};

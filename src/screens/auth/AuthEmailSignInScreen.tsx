import { CommonErrorResponse } from '@/@types/response';
import { ICommentLoginReturnType, ISigonganLoginReturnType, LoginToComment, LoginToSigongan } from '@/axios';
import AuthInput from '@/components/auth/AuthInput';
import BroadyButton from '@/components/common/BroadyButton';
import BroadyTextInput from '@/components/common/BroadyTextInput';
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
import { CommentUserState, SigonganUserState, fcmTokenState, loginFromState } from '@/states';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useTheme } from 'styled-components/native';

export const AuthEmailSignInScreen = () => {
  const authNavigation = useAuthNavigation();
  const fcmToken = useRecoilValue(fcmTokenState);
  const { login, setCurrentUser } = useUserState();
  const loginFrom = useRecoilValue(loginFromState);

  const theme = useTheme();

  const [form, setForm] = useState({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  });

  const onSubmit = async () => {
    let hasError = false;

    if (emailValidator(form.email) !== '') {
      showErrorToast(emailValidator(form.email));

      // setForm((prev) => ({ ...prev, emailError: emailValidator(form.email) }));
      hasError = true;
    }

    if (passwordValidator(form.password) !== '') {
      showErrorToast(passwordValidator(form.password));
      // setForm((prev) => ({ ...prev, passwordError: passwordValidator(form.password) }));
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
            commentUser,
            token,
          },
        } = res.data as ICommentLoginReturnType;

        login(token, 'Comment');

        setCurrentUser(commentUser);

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

        setCurrentUser(sigonganUser);

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
      <FlexBox
        direction="column"
        justifyContent="center"
        styles={{
          flex: 1,
        }}
      >
        <ContentsWrapper>
          <FlexBox direction="column" gap={GET_MARGIN('h3') - 5}>
            <BroadyTextInput
              variant="gray"
              initialType="email"
              text={form.email}
              placeholder="이메일"
              onChangeText={(value) => {
                onChangeText('email', value);
              }}
            ></BroadyTextInput>
            <BroadyTextInput
              text={form.password}
              variant="gray"
              initialType="password"
              placeholder="패스워드"
              onChangeText={(value) => {
                onChangeText('password', value);
              }}
            ></BroadyTextInput>
            <BroadyButton variant="grey" text="로그인" onPress={onSubmit} />
          </FlexBox>
        </ContentsWrapper>
      </FlexBox>

      <ContentsWrapper>
        <CenteredContentsWrapper>
          <Typography size="body_md" weight="light" color={theme.COLOR.GRAY_700} textDecorations="underline">
            아직 브로디 회원이 아니신가요?
          </Typography>
        </CenteredContentsWrapper>
        <Margin margin={GET_MARGIN('h4')}></Margin>
        <BroadyButton variant="grey" text="회원가입" onPress={() => authNavigation.push('broadyEmailRegister')} />
      </ContentsWrapper>

      <Margin margin={GET_MARGIN('layout_xl')}></Margin>
    </View>
  );
};

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

const CheckBoxForm = ({ onPress, text, checked }: { onPress?: () => void; text: string; checked: boolean }) => {
  return (
    <FlexBox
      alignItems="center"
      styles={{
        paddingVertical: GET_PADDING('P5'),
      }}
    >
      <Pressable onPress={onPress}>
        <CheckBox checked={checked} />
      </Pressable>
      <Margin direction="horizontal" margin={GET_MARGIN('h3')} />
      <View
        style={{
          flex: 1,
        }}
      >
        <Typography size="body_md" color={THEME.COLOR.FONT.CONTENT}>
          {text}
        </Typography>
      </View>
      <Icons type="material" name="chevron-right" size={24} color="black" onPress={onPress} />
    </FlexBox>
  );
};

export const AuthEmailSignUpScreen = () => {
  const authNavigation = useAuthNavigation();
  const fcmToken = useRecoilValue(fcmTokenState);
  const loginFrom = useRecoilValue(loginFromState);
  const { login } = useUserState();

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
          },
        } = res.data;

        login(token, 'Comment');

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
            token,
          },
        } = res.data;

        login(token, 'Sigongan');

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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <FlexBox
            styles={{
              flex: 1,
            }}
            justifyContent="space-between"
            direction="column"
          >
            <ContentsWrapper>
              <Margin margin={GET_MARGIN('layout_lg')}></Margin>
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
              <Margin margin={GET_MARGIN('layout_lg')}></Margin>
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
              <Margin margin={GET_MARGIN('layout_sm')}></Margin>
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
            </ContentsWrapper>
            <Margin margin={GET_MARGIN('layout_xl') + 100}></Margin>
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
              <BroadyButton text="다음" variant="primary" onPress={onSubmit} />
              <Margin margin={GET_MARGIN('layout_sm')}></Margin>
            </ContentsWrapper>
          </FlexBox>
        </ScrollView>
      </KeyboardAvoidingView>
      <Margin margin={GET_MARGIN('layout_xl')} />
    </View>
  );
};

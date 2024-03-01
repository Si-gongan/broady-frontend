import { CommonErrorResponse } from '@/@types/response';
import { CheckNickname, SetNickname } from '@/axios';
import AuthInput from '@/components/auth/AuthInput';
import BroadyButton from '@/components/common/BroadyButton';
import BroadyTextInput from '@/components/common/BroadyTextInput';
import ContentsWrapper from '@/components/common/ContentsWrapper';
import FlexBox from '@/components/common/FlexBox';
import Margin from '@/components/common/Margin';
import PageHeader from '@/components/common/PageHeader';
import { GET_MARGIN } from '@/constants/theme';
import { useAuthNavigation } from '@/hooks';
import { showErrorToast } from '@/library/toast/toast';
import { SigonganUserState, authTokenState, loginFromState } from '@/states';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export const AuthNicknameSetUpScreen = () => {
  const navigation = useAuthNavigation();
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  const token = useRecoilValue(authTokenState);

  const onPressChangeButton = async () => {
    if (nickname === '') {
      setNicknameError('닉네임을 입력해주세요.');
      return;
    }
    try {
      const {
        result: { isPossible },
      } = (await CheckNickname(nickname, token)).data;

      if (isPossible) {
        const response = await SetNickname(nickname, token);
        navigation.navigate('onBoarding');
      } else {
        setNicknameError('이미 사용중인 닉네임입니다.');
        return;
      }
    } catch (e) {
      console.log(e.response.data);

      if (e instanceof AxiosError) {
        const {
          result: { errorCode },
        } = e.response?.data as CommonErrorResponse;

        if (errorCode === 1003) {
          showErrorToast('이미 사용중인 닉네임입니다.');
          return;
        }
      }

      showErrorToast('닉네임 설정에 실패했습니다. 다시 시도해주세요');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title="브로디 닉네임 설정하기" headerLeftShown={true} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <FlexBox styles={{ flex: 1 }} justifyContent="space-between" alignItems="stretch" direction="column">
          <ContentsWrapper>
            <Margin margin={GET_MARGIN('layout_xl')} />
            {/* <AuthInput
              initialType="email"
              inputText={nickname}
              onChangeText={(text) => {
                console.log('text', text);

                setNicknameError('');
                setNickname(text);
              }}
              errorMessage={nicknameError}
              label="활동할 닉네임을 작성해주세요."
              placeholder="닉네임 입력"
              variant="Border"
            ></AuthInput> */}
            <TextInput
              onChangeText={(text) => {
                console.log('text', text);

                setNicknameError('');
                setNickname(text);
              }}
              value={nickname}
              style={{
                padding: 20,
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 10,
              }}
            ></TextInput>
          </ContentsWrapper>
          <ContentsWrapper>
            <BroadyButton variant="primary" text="시작하기" onPress={onPressChangeButton}></BroadyButton>
            <Margin margin={GET_MARGIN('layout_sm')} />
          </ContentsWrapper>
        </FlexBox>
      </KeyboardAvoidingView>
      <Margin margin={GET_MARGIN('layout_xl')} />
    </View>
  );
};

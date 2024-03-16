import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useAuthNavigation } from '../../hooks/navigations';
import { useUserState } from '../../providers';
import BroadyTextInput from '@/components/common/BroadyTextInput';
import BroadyButton from '@/components/common/BroadyButton';
import { THEME } from '@/constants/theme';
import styled from 'styled-components/native';
import AuthInput from '@/components/auth/AuthInput';
import Margin from '@/components/common/Margin';
import { useSetRecoilState } from 'recoil';
import { loginFromState } from '@/states';
import Typography from '@/components/common/Typography';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-left: ${THEME.SPACING.MARGIN.h3}px;
  padding-right: ${THEME.SPACING.MARGIN.h3}px;
`;

export const AuthInitialScreen = () => {
  const authNavigation = useAuthNavigation();

  const { login, logout } = useUserState();

  const setLoginFrom = useSetRecoilState(loginFromState);

  const onPressCommentReceive = () => {
    setLoginFrom('Sigongan');
    authNavigation.push('broadyEmailLogin');
  };

  const onPressCommentSend = () => {
    setLoginFrom('Comment');
    authNavigation.push('broadyEmailLogin');
  };

  return (
    <Container>
      <Image source={require('@/../assets/images/Logo.png')} accessible accessibilityLabel="브로디 로고 이미지" />
      <Margin margin={60} />
      <BroadyButton
        onPress={onPressCommentReceive}
        variant="secondary"
        text="사진 해설 받기"
        accessibilityLabel="사진 해설 받기 버튼"
      />
      <Margin margin={THEME.SPACING.MARGIN.h3} />
      <BroadyButton
        onPress={onPressCommentSend}
        variant="primary"
        text="사진 해설 하기"
        accessibilityLabel="사진 해설 하기 버튼"
      />
    </Container>
    // <View
    //   style={{
    //     padding: THEME.SPACING.MARGIN.h3,
    //   }}
    // >
    //   <Text>AuthInitialScreen</Text>
    //   <Text onPress={() => authNavigation.push('broadyEmailLogin')}>이메일 로그인 화면 이동</Text>

    //   <Text onPress={() => loginToSigongan()}>시각장애인 플로우 이동</Text>

    //   <Text onPress={() => loginToComment('authToken')}>해설자 플로우 이동</Text>

    //   <Text onPress={() => logout()}>로그아웃</Text>

    //   <BroadyTextInput initialType="password" variant="Border" onChangeText={() => {}} text="dfdf"></BroadyTextInput>
    //   <BroadyTextInput
    //     initialType="password"
    //     placeholder="입력하세요"
    //     variant="gray"
    //     onChangeText={() => {}}
    //     text="dfdf"
    //   ></BroadyTextInput>
    //   <BroadyTextInput initialType="password" variant="gray" onChangeText={() => {}} text="dfdf"></BroadyTextInput>

    //   <BroadyButton onPress={() => {}} variant="primary" text="다음" />
    //   <BroadyButton onPress={() => {}} variant="secondary" text="안녕하세요" />
    //   <BroadyButton onPress={() => {}} variant="borderButton" text="안녕하세요" />
    //   <BroadyButton onPress={() => {}} variant="darkButton" text="고객 센터 연결하기" />
    //   <AuthInput initialType="password" onChangeText={() => {}} inputText="dfdf" label="아이디" />
    //   <AuthInput initialType="password" onChangeText={() => {}} inputText="dfdf" label="비밀번호" />
    //   <AuthInput
    //     initialType="password"
    //     errorMessage="올바른 번호를 입력하세요"
    //     onChangeText={() => {}}
    //     variant="gray"
    //     inputText="dfdf"
    //     label="입력하세요"
    //   />
    // </View>
  );
};

import { View, Text } from 'react-native';
import React from 'react';
import { useAuthNavigation } from '../../hooks/navigations';
import { useUserState } from '../../providers';
import BroadyTextInput from '@/components/common/BroadyTextInput';
import BroadyButton from '@/components/common/BroadyButton';
import { THEME } from '@/constants/theme';
import InputWithText from '@/components/auth/InputWithText';
import styled from 'styled-components/native';

export const AuthInitialScreen = () => {
  const authNavigation = useAuthNavigation();

  const { loginToComment, loginToSigongan, logout } = useUserState();

  return (
    <View
      style={{
        padding: THEME.SPACING.MARGIN.h3,
      }}
    >
      <Text>AuthInitialScreen</Text>
      <Text onPress={() => authNavigation.push('broadyEmailLogin')}>이메일 로그인 화면 이동</Text>

      <Text onPress={() => loginToSigongan()}>시각장애인 플로우 이동</Text>

      <Text onPress={() => loginToComment('authToken')}>해설자 플로우 이동</Text>

      <Text onPress={() => logout()}>로그아웃</Text>

      <BroadyTextInput variant="Border" onChangeText={() => {}} text="dfdf"></BroadyTextInput>
      <BroadyTextInput variant="gray" onChangeText={() => {}} text="dfdf"></BroadyTextInput>
      <BroadyButton onPress={() => {}} variant="primary" text="다음" />
      <BroadyButton onPress={() => {}} variant="secondary" text="안녕하세요" />
      <BroadyButton onPress={() => {}} variant="borderButton" text="안녕하세요" />
      <BroadyButton onPress={() => {}} variant="darkButton" text="고객 센터 연결하기" />
      <InputWithText onChangeText={() => {}} inputText="dfdf" label="아이디" />
      <InputWithText onChangeText={() => {}} inputText="dfdf" label="비밀번호" />
      <InputWithText onChangeText={() => {}} variant="gray" inputText="dfdf" label="입력하세요" />
    </View>
  );
};

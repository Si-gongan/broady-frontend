import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CommonButton, CustomTextInput } from '../../components/auth';

import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigations';
import { AuthColor, AuthFont } from '../../components/auth/styles';

export const EmailSignUpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <CustomTextInput text="이메일" value={email} onChangeValue={setEmail} />
        <CustomTextInput text="비밀번호" value={password} onChangeValue={setPassword} />
        <CustomTextInput text="비밀번호 확인" value={password2} onChangeValue={setPassword2} />
      </View>

      <View style={styles.signUpWrapper}>
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? AuthColor.secondary.backgroundColor : undefined}
        />

        <Text style={[AuthFont.teritary, AuthColor.contentPrimary]}>이용약관을 숙지했으며, 이에 동의합니다.</Text>
      </View>

      <View style={{ marginTop: 14 }}>
        <CommonButton text="회원가입" />
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
  signUpWrapper: {
    width: 343,
    flexDirection: 'row',

    gap: 14,
    marginTop: 36,
  },
});

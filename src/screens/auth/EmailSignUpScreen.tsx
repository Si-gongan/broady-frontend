import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomTextInput } from '../../components/auth';

export const EmailSignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <CustomTextInput text="이메일" value={email} onChangeValue={setEmail} />

        <CustomTextInput text="비밀번호" value={password} onChangeValue={setPassword} />

        <CustomTextInput text="비밀번호 확인" value={password2} onChangeValue={setPassword2} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  formWrapper: {
    marginTop: 19,

    gap: 22,
    alignItems: 'center',
  },
});

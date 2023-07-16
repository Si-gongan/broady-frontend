import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonButton, CustomTextInput } from '../../components/auth';

export const EmailSignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <CustomTextInput text="이메일" value={email} onChangeValue={setEmail} />
        <CustomTextInput text="비밀번호" value={password} onChangeValue={setPassword} />
      </View>

      <View style={{ marginTop: 36 }}>
        <CommonButton text="로그인" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 19,

    alignItems: 'center',
  },
  formWrapper: {
    gap: 22,
  },
});

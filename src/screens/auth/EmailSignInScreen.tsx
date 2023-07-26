import { useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { CommonButton, CommonHeader, CustomTextInput } from '../../components/auth';
import { useUserState } from '../../providers';
import { Login } from '../../api/axios';
import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';
import { AuthFont } from '../../components/auth/styles';
import { AUTH_TOKEN, USER_STATE, storeData } from '../../components/common/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigations';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';

type ILoginForm = {
  email: string;
  password: string;
};

export const EmailSignInScreen = () => {
  const fcmToken = useRecoilValue(fcmTokenState);

  const { loginToComment } = useUserState();

  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const passwordRef = useRef<TextInput>(null);

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit = async (data: ILoginForm) => {
    const { email, password } = data;

    try {
      setLoading(true);
      const res = await Login(email, password, fcmToken);
      const authToken = res.data.result.token;

      loginToComment(authToken);
    } catch {
      Alert.alert('알림', '존재하지 않는 정보입니다.', [{ text: '확인', style: 'default' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommonHeader text="이메일로 로그인" onBackButtonPress={() => navigation.goBack()} />

      <Spinner visible={loading} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <View style={styles.container}>
          <View style={styles.formWrapper}>
            <View style={styles.inputWrapper}>
              <Controller
                control={control}
                rules={{
                  required: '이메일을 입력해주세요.',
                  pattern: {
                    value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: '이메일 형식을 지켜주세요.',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextInput
                    text="이메일"
                    value={value}
                    onBlur={onBlur}
                    onChangeValue={onChange}
                    onSubmitEditing={() => passwordRef.current?.focus()}
                  />
                )}
                name="email"
              />
              {errors.email && <Text style={[AuthFont.quaternary, { color: 'red' }]}>{errors.email?.message}</Text>}
            </View>

            <View style={styles.inputWrapper}>
              <Controller
                control={control}
                rules={{
                  required: '비밀번호를 입력해주세요.',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextInput
                    text="비밀번호"
                    inputRef={passwordRef}
                    value={value}
                    onBlur={onBlur}
                    onChangeValue={onChange}
                    secureTextEntry
                  />
                )}
                name="password"
              />
              {errors.password && (
                <Text style={[AuthFont.quaternary, { color: 'red' }]}>{errors.password?.message}</Text>
              )}
            </View>
          </View>

          <View style={{ marginTop: 36 }}>
            <CommonButton text="로그인" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,

    alignItems: 'center',
  },
  inputWrapper: {
    gap: 5,
  },
  formWrapper: {
    gap: 22,
  },
});

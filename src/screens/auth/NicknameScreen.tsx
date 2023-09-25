import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthStackParamList } from '../../navigations';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthInput, Fonts, Header, LongButton, PaddingHorizontal } from '../../components/renewal';
import { useForm, Controller } from 'react-hook-form';

type INicknameForm = {
  nickname: string;
};

export const NicknameScreen = () => {
  const {
    params: { type },
  } = useRoute<RouteProp<AuthStackParamList, '닉네임 입력'>>();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<INicknameForm>();

  // for upload-nickname
  const onSubmit = async (data: INicknameForm) => {
    const { nickname } = data;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <SafeAreaView style={styles.container}>
        <Header text="이메일로 로그인" isBottomBorder />

        <PaddingHorizontal value={20}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.inputsWrapper}>
              <View style={styles.inputItem}>
                <Controller
                  control={control}
                  rules={{
                    required: '닉네임을 입력해주세요.',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AuthInput
                      text="사용하실 닉네임을 입력해주세요."
                      value={value}
                      onBlur={onBlur}
                      onChangeValue={onChange}
                    />
                  )}
                  name="nickname"
                />
                {errors.nickname && <Text style={[Fonts.Regular14, { color: 'red' }]}>{errors.nickname?.message}</Text>}
              </View>
            </View>

            <View style={styles.startWrapper}>
              <LongButton text="봄자국 시작하기" theme="secondary" />
            </View>
          </ScrollView>
        </PaddingHorizontal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputsWrapper: {
    marginTop: 30,

    gap: 20,
  },
  inputItem: {
    gap: 5,
  },
  startWrapper: {
    marginTop: 30,
  },
});

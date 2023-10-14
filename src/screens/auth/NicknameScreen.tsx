import { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigations';

import { useForm, Controller } from 'react-hook-form';

import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';

import {
  AuthInput,
  BomCheckBox,
  Fonts,
  BomHeader,
  BomButton,
  PaddingHorizontal,
  TERMS_OF_USE,
  Utils,
  Colors,
  Notice,
} from '../../components/renewal';
import { useLoading, useUserState } from '../../providers';

import * as WebBrowser from 'expo-web-browser';

type INicknameForm = {
  nickname: string;
};

export const NicknameScreen = () => {
  const fcmToken = useRecoilValue(fcmTokenState);

  const {
    params: { type, token },
  } = useRoute<RouteProp<AuthStackParamList, '닉네임 입력'>>();

  const { loginToSigongan, loginToComment, changeNickname } = useUserState();
  const { changeLoading } = useLoading();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<INicknameForm>();

  // for term-of-use
  const [isChecked, setChecked] = useState(false);

  // submit nickname
  const onSubmit = async (data: INicknameForm) => {
    const { nickname } = data;

    // 시각장애인 로그인
    if (type === 'Sigongan') {
      loginToSigongan(nickname);
      return;
    }

    // 해설자 로그인
    if (type === 'Comment') {
      try {
        changeLoading(true);

        await changeNickname('Comment', nickname, fcmToken, token);

        loginToComment(token ?? '', nickname);
      } catch {
        Notice('이미 존재하는 닉네임입니다.');
      } finally {
        changeLoading(false);
      }

      return;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <SafeAreaView style={styles.container}>
        <BomHeader text="닉네임 설정" isBottomBorder />

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
              {type === 'Sigongan' && (
                <View style={styles.checkWrapper}>
                  <BomCheckBox
                    value={isChecked}
                    onValueChange={setChecked}
                    accessibilityLabel="이용약관 숙지 체크박스"
                  />

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => WebBrowser.openBrowserAsync(TERMS_OF_USE)}
                      accessible
                      accessibilityLabel="이용약관, 이 버튼을 누르면 이용약관을 볼 수 있습니다."
                      hitSlop={{ top: 5, bottom: 5, right: 10 }}
                    >
                      <Text
                        style={[
                          Fonts.Regular14,
                          Utils.fontColor(Colors.Font.primary),
                          { textDecorationLine: 'underline' },
                          { marginBottom: 1 },
                        ]}
                      >
                        이용약관
                      </Text>
                    </TouchableOpacity>

                    <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>
                      을 숙지했으며, 이에 동의합니다.
                    </Text>
                  </View>
                </View>
              )}

              <BomButton
                text="봄자국 시작하기"
                theme="secondary"
                onPress={handleSubmit(onSubmit)}
                disabled={(type === 'Sigongan' && !isChecked) || isSubmitting}
              />
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

    gap: 10,

    alignItems: 'center',
  },
  checkWrapper: {
    flexDirection: 'row',

    gap: 10,
  },
});

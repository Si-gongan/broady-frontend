import { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SigonganStackParamList } from '../../navigations';

import { useRecoilValue } from 'recoil';
import { fcmTokenState, nicknameState } from '../../states';
import { useUserState } from '../../providers';

import { BomButton, BomHeader, Colors, Fonts, PaddingHorizontal, Utils } from '../../components/renewal';

export const PutNicknameScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SigonganStackParamList>>();

  const nickname = useRecoilValue(nicknameState);
  const fcmToken = useRecoilValue(fcmTokenState);
  const [text, setText] = useState(nickname);

  const { changeNickname } = useUserState();

  const onSubmit = async () => {
    await changeNickname('Sigongan', text, fcmToken);
    navigation.goBack();
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
            <View style={styles.textContainer}>
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>
                사용하실 닉네임을 입력해주세요.
              </Text>
            </View>

            <TextInput
              style={[
                styles.input,
                Utils.borderColor(Colors.Font.secondary),
                Fonts.Regular16,
                Utils.fontColor(Colors.Font.secondary),
              ]}
              value={text}
              onChangeText={setText}
            />

            <View style={{ marginTop: 50 }}>
              <BomButton text="설정 완료하기" theme="secondary" onPress={onSubmit} />
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
  textContainer: {
    marginTop: 30,

    alignItems: 'center',
  },
  input: {
    marginTop: 20,

    paddingVertical: 16,
    paddingHorizontal: 10,

    borderRadius: 12,
  },
});

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import { AuthStackParamList } from '../../navigations';
import { CommonButton } from '../../components/auth';

export const StartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <View style={styles.container}>
      <CommonButton text="이메일로 계속하기" onPress={() => navigation.push('이메일 회원가입')} />
      <CommonButton text="카카오톡으로 계속하기" disabled />
      <CommonButton text="애플로 계속하기" disabled />
      <CommonButton text="구글로 계속하기" disabled />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    gap: 14,
  },
});

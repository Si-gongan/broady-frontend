import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import { AuthStackParamList } from '../../navigations';
import { CommonButton, CommonHeader } from '../../components/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export const StartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <SafeAreaView style={styles.headerContainer}>
      <CommonHeader text="시작하기" onBackButtonPress={() => navigation.goBack()} />

      <View style={styles.container}>
        <CommonButton text="이메일로 계속하기" onPress={() => navigation.push('이메일 회원가입')} />
        <CommonButton text="카카오톡으로 계속하기" disabled />
        <CommonButton text="애플로 계속하기" disabled />
        <CommonButton text="구글로 계속하기" disabled />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    gap: 14,
  },
});

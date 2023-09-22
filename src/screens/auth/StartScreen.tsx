import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, LongButton } from '../../components/renewal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigations';

export const StartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <Header text="시작하기" isBottomBorder />

      <View style={styles.buttonWrapper}>
        <LongButton text="이메일로 계속하기" theme="secondary" onPress={() => navigation.push('이메일 회원가입')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

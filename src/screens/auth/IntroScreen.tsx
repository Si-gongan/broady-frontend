import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LongButton } from '../../components/renewal';

export const IntroScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LongButton text="회원가입" theme="primary" />
      <LongButton text="로그인" theme="secondary" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

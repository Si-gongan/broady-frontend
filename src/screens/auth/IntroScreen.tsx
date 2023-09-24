import { Image, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LongButton } from '../../components/renewal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigations';

const LOGO_URL = '../../../assets/intro-icon2.png';

export const IntroScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={require(LOGO_URL)} style={styles.image} accessible accessibilityLabel="봄자국 로고 이미지" />
      </View>

      <View style={styles.button1}>
        <LongButton
          text="사진 해설이 필요해요"
          theme="primary"
          onPress={() => navigation.push('이메일 회원가입', { type: 'sigongan' })}
        />
      </View>

      <View style={styles.button2}>
        <LongButton
          text="해설자로 활동할게요"
          theme="secondary"
          onPress={() => navigation.push('이메일 회원가입', { type: 'comment' })}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,
  },
  imageWrapper: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    marginBottom: 50,
  },
  button1: {
    marginBottom: 20,
  },
  button2: {
    marginBottom: 250,
  },
});

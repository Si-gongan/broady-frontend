import { Image, View, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigations';

import { BomButton, PaddingHorizontal } from '../../components/renewal';

const LOGO_URL = '../../../assets/intro-icon2.png';

export const IntroScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <PaddingHorizontal value={20}>
        <View style={styles.imageWrapper}>
          <Image source={require(LOGO_URL)} style={styles.image} accessible accessibilityLabel="봄자국 로고 이미지" />
        </View>

        <View style={styles.button1}>
          <BomButton
            text="사진 해설이 필요해요"
            theme="primary"
            onPress={() => navigation.push('닉네임 입력', { type: 'sigongan' })}
          />
        </View>

        <View style={styles.button2}>
          <BomButton text="해설자로 활동할게요" theme="secondary" onPress={() => navigation.push('이메일 회원가입')} />
        </View>
      </PaddingHorizontal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

import { Image, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IntroPopup, LongButton } from '../../components/renewal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigations';
import { useState } from 'react';

export const IntroScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [isShowPopup, setShowPopup] = useState(false);
  const [isChecked, setChecked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={require('../../../assets/intro-icon2.png')} style={styles.image} />
      </View>

      <View style={styles.button1}>
        <LongButton text="사진 해설이 필요해요" theme="primary" onPress={() => setShowPopup(true)} />
      </View>

      <View style={styles.button2}>
        <LongButton text="해설자로 활동할게요" theme="secondary" onPress={() => navigation.push('시작하기')} />
      </View>

      {isShowPopup && <IntroPopup isChecked={isChecked} setChecked={setChecked} />}
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

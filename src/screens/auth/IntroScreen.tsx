import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthStackParamList } from '../../navigations';
import { useUserState } from '../../providers';
import { AuthColor, AuthDesign } from '../../components/auth/styles';

export const IntroScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  // TODO: device id 처리
  const { changeUserState } = useUserState();

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={require('../../../assets/intro-icon.png')} style={styles.image} />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button1, AuthDesign.buttonColor1]}
        onPress={() => changeUserState('Sigongan')}
      >
        <Text style={[AuthDesign.bigFont, AuthColor.contentSecondary]}>시각지원이 필요해요</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button2, AuthDesign.buttonColor2]}
        onPress={() => navigation.push('시작하기')}
      >
        <Text style={[AuthDesign.bigFont, AuthColor.contentSecondary]}>해설자로 활동할게요</Text>
      </TouchableOpacity>
    </View>
  );
};

const commonStyles = StyleSheet.create({
  button: {
    width: 343,
    borderRadius: 10,
    paddingVertical: 38,

    alignItems: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 100,
  },
  button1: {
    ...commonStyles.button,
    marginBottom: 22,
  },
  button2: {
    ...commonStyles.button,
    marginBottom: 75,
  },
});

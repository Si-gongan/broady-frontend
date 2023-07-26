import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { AuthStackParamList } from '../../navigations';
import { useUserState } from '../../providers';
import { AuthColor, AuthDesign, AuthResponsive } from '../../components/auth/styles';
import { USER_STATE, storeData } from '../../components/common/async-storage';

export const IntroScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  // TODO: device id 처리
  const { loginToSigongan } = useUserState();

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={require('../../../assets/intro-icon.png')} style={styles.image} />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button1, AuthDesign.buttonColor1]}
        onPress={loginToSigongan}
        accessible
        accessibilityLabel="시각 지원받기 버튼"
      >
        <Text style={[AuthDesign.bigFont, AuthColor.contentSecondary]}>시각지원이 필요해요</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button2, AuthDesign.buttonColor2]}
        onPress={() => navigation.push('시작하기')}
        accessible
        accessibilityLabel="해설자 활동 버튼"
      >
        <Text style={[AuthDesign.bigFont, AuthColor.contentSecondary]}>해설자로 활동할게요</Text>
      </TouchableOpacity>
    </View>
  );
};

const commonStyles = StyleSheet.create({
  button: {
    width: AuthResponsive.dynamicWidth(),
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

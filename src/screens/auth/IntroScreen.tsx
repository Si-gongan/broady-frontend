import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthStackParamList } from '../../navigations';
import { useUserState } from '../../providers';
import { AuthColor, AuthDesign, AuthFont, AuthResponsive } from '../../components/auth/styles';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import * as WebBrowser from 'expo-web-browser';
import { CommonButton } from '../../components/auth';
import { SigonganShadow } from '../../components/sigongan/styles';

export const IntroScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [isShowPopup, setShowPopup] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const { loginToSigongan } = useUserState();

  const onCheckBoxClicked = async () => {
    if (isChecked) {
      setChecked(false);
      return;
    }

    // await WebBrowser.openBrowserAsync('https://sites.google.com/view/sigongan-useterm/홈');

    setChecked((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={require('../../../assets/intro-icon.png')} style={styles.image} />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button1, AuthDesign.buttonColor1]}
        onPress={() => setShowPopup(true)}
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

      {isShowPopup && (
        <View style={styles.popup}>
          <View style={[styles.popupContent, AuthColor.primary]}>
            <TouchableOpacity activeOpacity={0.8} onPress={onCheckBoxClicked}>
              <View style={styles.checkWraaper}>
                <Checkbox
                  value={isChecked}
                  onValueChange={onCheckBoxClicked}
                  color={isChecked ? AuthColor.secondary.backgroundColor : undefined}
                  accessible
                  accessibilityLabel="이용약관 숙지 체크박스"
                  accessibilityLabelledBy="checkBox"
                  accessibilityState={{ checked: isChecked }}
                />

                <Text nativeID="checkBox" style={[AuthFont.teritary, AuthColor.contentPrimary]}>
                  이용약관을 숙지했으며, 이에 동의합니다.
                </Text>
              </View>
            </TouchableOpacity>

            <View style={{ marginTop: 14 }}>
              <CommonButton text="사용 시작" onPress={loginToSigongan} disabled={!isChecked} />
            </View>
          </View>
        </View>
      )}
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
  popup: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 9,

    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  popupContent: {
    ...SigonganShadow.shadowBottomHigh,

    width: '100%',
    alignItems: 'center',

    paddingVertical: 16,
  },
  checkWraaper: {
    width: AuthResponsive.dynamicWidth(),
    flexDirection: 'row',

    gap: 14,
  },
});

import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { BomCheckBox } from '../common/BomCheckBox';
import { LongButton } from '../common';
import * as WebBrowser from 'expo-web-browser';

import { Colors, Fonts, Utils } from '../styles';
import { useUserState } from '../../../providers';

import { TERMS_OF_USE } from '../constants';

type IIntroPopupProps = {
  isChecked: boolean;
  setChecked: (b: boolean) => void;
};

export const IntroPopup = ({ isChecked, setChecked }: IIntroPopupProps) => {
  const { loginToSigongan } = useUserState();

  return (
    <View style={styles.popup}>
      <View style={[styles.popupContent, Utils.backgroundColor(Colors.None.Lighten400)]}>
        <View style={styles.checkWrapper}>
          <BomCheckBox value={isChecked} onValueChange={setChecked} accessibilityLabel="이용약관 숙지 체크박스" />

          <TouchableOpacity
            activeOpacity={0.8}
            accessible
            accessibilityLabel="이용약관을 숙지했으며, 이에 동의합니다. 이용약관 보러가기"
            onPress={() => WebBrowser.openBrowserAsync(TERMS_OF_USE)}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Text style={[Fonts.Regular14, { textDecorationLine: 'underline' }]}>이용약관</Text>
            <Text style={Fonts.Regular14}>을 숙지했으며, 이에 동의합니다.</Text>
          </TouchableOpacity>
        </View>

        <LongButton text="사용 시작" theme="secondary" onPress={loginToSigongan} disabled={!isChecked} />
      </View>
    </View>
  );
};

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  popupContent: {
    width: '100%',
    alignItems: 'center',

    paddingVertical: 15,
    gap: 10,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  checkWrapper: {
    width: width - 40,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 15,
  },
});

import { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, findNodeHandle, AccessibilityInfo } from 'react-native';

import { BottomSheet } from 'react-native-btr';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { pickImage, takePhoto } from '../../../../library';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SigonganStackParamList } from '../../../../navigations';
import Svg, { Path } from 'react-native-svg';
import { PaddingHorizontal } from '../../design';
import { Colors, Fonts, Utils } from '../../styles';
import { BomButton } from '../../common';
import { delay } from '../../utils';

export type IImageMethodPopupHandler = {
  open: () => void;
  close: () => void;
};

type IImageMethodPopupProps = {
  aiChat?: {
    onImageSubmit: (url: string) => void;
  };
};

const DELAY_TIME = 500;

// eslint-disable-next-line
export const ImageMethodPopup = forwardRef<IImageMethodPopupHandler, IImageMethodPopupProps>(({ aiChat }, ref) => {
  const insets = useSafeAreaInsets();

  const topTextRef = useRef<Text>(null);

  const navigation = useNavigation<NativeStackNavigationProp<SigonganStackParamList>>();

  const [visible, setVisible] = useState(false);

  const onClose = () => setVisible(false);

  useImperativeHandle(
    ref,
    () => ({
      open: async () => {
        setVisible(true);

        await delay(DELAY_TIME);

        const reactTag = findNodeHandle(topTextRef.current);

        if (reactTag) {
          AccessibilityInfo.setAccessibilityFocus(reactTag);
        }
      },
      close: () => setVisible(false),
    }),
    []
  );

  const onPressTakePhoto = async () => {
    const result = await takePhoto();

    if (result?.canceled) {
      return;
    }

    onClose();

    const url = result?.assets[0].uri;

    if (aiChat) {
      aiChat.onImageSubmit(url ?? '');
    } else {
      navigation.navigate('해설의뢰', { url });
    }
  };

  const onPressPickImage = async () => {
    const result = await pickImage();

    if (result?.canceled) {
      return;
    }

    onClose();

    const url = result?.assets[0].uri;

    if (aiChat) {
      aiChat.onImageSubmit(url ?? '');
    } else {
      navigation.navigate('해설의뢰', { url });
    }
  };

  return (
    <BottomSheet visible={visible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <View
        style={[
          styles.container,
          Utils.backgroundColor(Colors.None.Lighten400),
          Utils.safePaddingBottom(insets.bottom),
        ]}
      >
        <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]} ref={topTextRef}>
          사진 선택
        </Text>

        <PaddingHorizontal value={30} noflex>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, Utils.borderBottomColor(Colors.Blue.Lighten400)]}
            onPress={onPressTakePhoto}
            accessible
            accessibilityLabel="직접 촬영 버튼"
          >
            <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>직접 촬영</Text>

            <Svg width="9" height="16" viewBox="0 0 9 16" fill="none">
              <Path
                d="M6.13379 7.9999L0.383789 2.2499L1.70107 0.932617L8.76835 7.9999L1.70107 15.0672L0.383789 13.7499L6.13379 7.9999Z"
                fill={Colors.Font.primary}
              />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={onPressPickImage}
            accessible
            accessibilityLabel="갤러리에서 선택 버튼"
          >
            <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>갤러리에서 선택</Text>

            <Svg width="9" height="16" viewBox="0 0 9 16" fill="none">
              <Path
                d="M6.13379 7.9999L0.383789 2.2499L1.70107 0.932617L8.76835 7.9999L1.70107 15.0672L0.383789 13.7499L6.13379 7.9999Z"
                fill={Colors.Font.primary}
              />
            </Svg>
          </TouchableOpacity>

          <BomButton text="취소" theme="primary" onPress={onClose} />
        </PaddingHorizontal>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,

    alignItems: 'center',

    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  button: {
    paddingVertical: 16,

    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
  },
});

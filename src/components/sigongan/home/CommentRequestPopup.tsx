import { useState, useImperativeHandle, forwardRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { BottomSheet } from 'react-native-btr';
import { SigonganColor, SigonganDesign, SigonganFont, SigonganShadow } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { pickImage, takePhoto } from '../media';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SigonganStackParamList } from '../../../navigations';

export type ICommentRequestPopupHandler = {
  open: () => void;
  close: () => void;
};

// eslint-disable-next-line
export const CommentRequestPopup = forwardRef<ICommentRequestPopupHandler, any>((_, ref) => {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<NativeStackNavigationProp<SigonganStackParamList>>();

  const [visible, setVisible] = useState(false);

  const onClose = () => setVisible(false);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setVisible(true),
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
    navigation.navigate('해설의뢰', { url });
  };

  const onPressPickImage = async () => {
    const result = await pickImage();

    if (result?.canceled) {
      return;
    }

    onClose();

    const url = result?.assets[0].uri;
    navigation.navigate('해설의뢰', { url });
  };

  return (
    <BottomSheet visible={visible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <View style={[styles.container, SigonganColor.backgroundPrimary]}>
        <View style={styles.titleWrapper}>
          <Text style={SigonganFont.primary}>사진 선택</Text>
        </View>

        <View style={SigonganDesign.borderOpaque} />

        <View style={[styles.itemWrapper, { paddingBottom: insets.bottom || 16 }]}>
          <TouchableOpacity
            style={styles.item}
            onPress={onPressTakePhoto}
            accessible
            accessibilityLabel="직접 촬영 버튼"
          >
            <Text style={SigonganFont.secondary}>직접 촬영</Text>
            <MaterialIcons name="arrow-forward-ios" style={[styles.itemIcon, SigonganColor.iconPrimary]} />
          </TouchableOpacity>

          <View style={SigonganDesign.borderOpaque} />

          <TouchableOpacity
            style={styles.item}
            onPress={onPressPickImage}
            accessible
            accessibilityLabel="갤러리에서 선택 버튼"
          >
            <Text style={SigonganFont.secondary}>갤러리에서 선택</Text>
            <MaterialIcons name="arrow-forward-ios" style={[styles.itemIcon, SigonganColor.iconPrimary]} />
          </TouchableOpacity>

          <View style={SigonganDesign.borderOpaque} />

          <TouchableOpacity style={styles.item} onPress={() => onClose()}>
            <Text style={SigonganFont.secondary} accessible accessibilityLabel="취소 버튼">
              취소
            </Text>
            <MaterialIcons name="arrow-forward-ios" style={[styles.itemIcon, SigonganColor.iconPrimary]} />
          </TouchableOpacity>

          <View style={SigonganDesign.borderOpaque} />
        </View>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    paddingTop: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,

    ...SigonganShadow.shadowTopHigh,
  },
  titleWrapper: {
    width: '100%',
    alignItems: 'center',

    paddingVertical: 12,
  },
  itemWrapper: {
    width: '100%',

    paddingLeft: 25,
    paddingRight: 9,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 12,
  },
  itemIcon: {
    fontSize: 16,

    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

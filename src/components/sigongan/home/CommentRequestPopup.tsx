import { useState, useImperativeHandle, forwardRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { BottomSheet } from 'react-native-btr';
import { SigonganColor, SigonganDesign, SigonganFont } from '../styles';

export type ICommentRequestPopupHandler = {
  open: () => void;
  close: () => void;
};

// eslint-disable-next-line
export const CommentRequestPopup = forwardRef<ICommentRequestPopupHandler, any>((_, ref) => {
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

  return (
    <BottomSheet visible={visible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <View style={[styles.container, SigonganColor.backgroundPrimary]}>
        <View style={styles.titleWrapper}>
          <Text style={SigonganFont.primary}>사진 선택</Text>
        </View>

        <View style={SigonganDesign.borderOpaque} />

        <View style={styles.itemWrapper}>
          <TouchableOpacity style={styles.item}>
            <Text style={SigonganFont.secondary}>직접 촬영</Text>
            <MaterialIcons name="arrow-forward-ios" style={[styles.itemIcon, SigonganColor.iconPrimary]} />
          </TouchableOpacity>

          <View style={SigonganDesign.borderOpaque} />

          <TouchableOpacity style={styles.item}>
            <Text style={SigonganFont.secondary}>갤러리에서 선택</Text>
            <MaterialIcons name="arrow-forward-ios" style={[styles.itemIcon, SigonganColor.iconPrimary]} />
          </TouchableOpacity>

          <View style={SigonganDesign.borderOpaque} />

          <TouchableOpacity style={styles.item} onPress={() => onClose()}>
            <Text style={SigonganFont.secondary}>취소</Text>
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
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
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

    marginBottom: 16,
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

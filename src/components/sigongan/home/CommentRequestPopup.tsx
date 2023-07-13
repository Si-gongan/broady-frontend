import { useState, useImperativeHandle, forwardRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { BottomSheet } from 'react-native-btr';
import { SigonganColor } from '../styles';

export type ICommentRequestPopupHandler = {
  open: () => void;
  close: () => void;
};

// eslint-disable-next-line react/display-name
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
      <View style={styles.container}>
        <Text style={styles.title}>사진 선택</Text>

        <View style={styles.divider} />

        <View style={styles.itemWrapper}>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>직접 촬영</Text>
            <MaterialIcons name="arrow-forward-ios" style={styles.itemIcon} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>갤러리에서 선택</Text>
            <MaterialIcons name="arrow-forward-ios" style={styles.itemIcon} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.item} onPress={() => onClose()}>
            <Text style={styles.itemText}>취소</Text>
            <MaterialIcons name="arrow-forward-ios" style={styles.itemIcon} />
          </TouchableOpacity>

          <View style={styles.divider} />
        </View>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    backgroundColor: SigonganColor.popupBackground,

    paddingTop: 8,
    borderRadius: 16,
  },
  title: {
    color: SigonganColor.popupText,
    fontSize: 18,
    fontStyle: 'italic',

    paddingVertical: 12,
  },
  divider: {
    backgroundColor: SigonganColor.popupDivider,
    width: '100%',
    height: 1,
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
  itemText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  itemIcon: {
    fontSize: 16,
    color: SigonganColor.popupNextIcon,

    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

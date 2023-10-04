import { useState, useImperativeHandle, forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { BottomSheet } from 'react-native-btr';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Fonts, Utils } from '../../styles';

import { BomButton } from '../../common';

export type IDeleteCheckPopupHandler = {
  open: () => void;
  close: () => void;
};

type IDeleteCheckPopupProps = {
  onprevPopupClose: () => void;
  onDelete: () => void;
};

// eslint-disable-next-line
export const DeleteCheckPopup = forwardRef<IDeleteCheckPopupHandler, IDeleteCheckPopupProps>(
  ({ onprevPopupClose, onDelete }, ref) => {
    const insets = useSafeAreaInsets();

    const [visible, setVisible] = useState(false);

    const onClose = () => {
      setVisible(false);
      onprevPopupClose();
    };

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
        <View
          style={[
            styles.container,
            Utils.backgroundColor(Colors.None.Lighten400),
            Utils.safePaddingBottom(insets.bottom),
          ]}
        >
          <View style={[styles.topWrapper, Utils.borderBottomColor(Colors.Blue.Lighten400)]}>
            <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>질문 삭제</Text>
          </View>

          <View style={styles.textWrapper}>
            <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>질문을 삭제하시겠습니까?</Text>
            <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>
              대화 내용은 복구가 불가능합니다.
            </Text>
          </View>

          <View style={styles.buttonWrapper}>
            <BomButton text="돌아가기" theme="primary" isShort onPress={onClose} />

            <BomButton
              text="질문 삭제하기"
              theme="secondary"
              isShort
              onPress={() => {
                onClose();
                onDelete();
              }}
            />
          </View>
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  topWrapper: {
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 16,
  },
  textWrapper: {
    width: '100%',

    marginTop: 30,

    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginTop: 30,
    marginBottom: 20,

    flexDirection: 'row',

    gap: 10,
  },
});

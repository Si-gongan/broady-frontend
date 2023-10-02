import { useState, useImperativeHandle, forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { BottomSheet } from 'react-native-btr';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Fonts, Utils } from '../../styles';

import { LongButton } from '../../common';

export type IReportPopupHandler = {
  open: () => void;
  close: () => void;
};

type IReportPopupProps = object;

// eslint-disable-next-line
export const ReportPopup = forwardRef<IReportPopupHandler, IReportPopupProps>(({}, ref) => {
  const insets = useSafeAreaInsets();

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
      <View
        style={[
          styles.container,
          Utils.backgroundColor(Colors.None.Lighten400),
          Utils.safePaddingBottom(insets.bottom),
        ]}
      >
        <View style={[styles.topButtonWrapper, Utils.borderBottomColor(Colors.Blue.Lighten400)]}>
          <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>질문 삭제</Text>
        </View>

        <View style={styles.textWrapper}>
          <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>질문을 삭제하시겠습니까?</Text>
          <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>대화 내용은 복구가 불가능합니다.</Text>
        </View>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  topButtonWrapper: {
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
  buttons: {
    marginTop: 30,
    marginBottom: 20,

    flexDirection: 'row',

    gap: 10,
  },
});

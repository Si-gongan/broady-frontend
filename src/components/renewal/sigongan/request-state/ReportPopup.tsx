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
        <View style={[styles.topWrapper, Utils.borderBottomColor(Colors.Blue.Lighten400)]}>
          <Text style={[Fonts.Medium16, Utils.fontColor(Colors.Font.primary)]}>신고</Text>
        </View>

        <View style={styles.textWrapper}>
          <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>해설 신고사유를 알려주세요.</Text>
          <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>
            운영진이 검토 후, 해당 해설자에게 제재가 부여됩니다.
          </Text>
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
  topWrapper: {
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',

    paddingTop: 20,
    paddingBottom: 10,
  },
  textWrapper: {
    width: '100%',

    marginTop: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

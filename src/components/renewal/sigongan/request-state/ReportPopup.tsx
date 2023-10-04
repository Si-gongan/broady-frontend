import { useState, useImperativeHandle, forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { BottomSheet } from 'react-native-btr';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Fonts, Utils } from '../../styles';

import { BomCheckBox, BomButton } from '../../common';

export type IReportPopupHandler = {
  open: () => void;
  close: () => void;
};

type ReportOption = 'first' | 'second' | 'third' | 'none';

// eslint-disable-next-line
export const ReportPopup = forwardRef<IReportPopupHandler, any>((_, ref) => {
  const insets = useSafeAreaInsets();

  const [visible, setVisible] = useState(false);

  const [option, setOption] = useState<ReportOption>('none');
  const changeOption = (data: ReportOption) => {
    if (data === option) {
      setOption('none');
    } else {
      setOption(data);
    }
  };

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

        <View style={styles.checkWrapper}>
          <View style={styles.checkItem}>
            <BomCheckBox value={option === 'first'} onValueChange={() => changeOption('first')} />
            <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>
              해설에 부적절한 내용이 포함돼있습니다.
            </Text>
          </View>
          <View style={styles.checkItem}>
            <BomCheckBox value={option === 'second'} onValueChange={() => changeOption('second')} />
            <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>불성실한 해설입니다.</Text>
          </View>
          <View style={styles.checkItem}>
            <BomCheckBox value={option === 'third'} onValueChange={() => changeOption('third')} />
            <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>기타</Text>
          </View>
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
  checkWrapper: {
    width: '100%',

    paddingHorizontal: 30,

    paddingTop: 20,
    gap: 10,
  },
  checkItem: {
    flexDirection: 'row',

    gap: 15,
  },
});

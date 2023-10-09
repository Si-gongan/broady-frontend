import { useState, useImperativeHandle, forwardRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { BottomSheet } from 'react-native-btr';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Fonts, Utils } from '../../../styles';

import { useKeyboard } from '../../../../../hooks';
import { PaddingHorizontal } from '../../../design';
import { CheckGroup, ReportOption } from './CheckGroup';
import { ReportInput } from './ReportInput';
import { BomButton } from '../../../common';

export type IReportPopupHandler = {
  open: () => void;
  close: () => void;
};

// eslint-disable-next-line
export const ReportPopup = forwardRef<IReportPopupHandler, any>((_, ref) => {
  const insets = useSafeAreaInsets();

  const [visible, setVisible] = useState(false);

  const [option, setOption] = useState<ReportOption>('none');
  const [text, setText] = useState('');

  const { isKeyboardVisible, keyboardHeight } = useKeyboard();

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

        <ScrollView style={{ paddingBottom: isKeyboardVisible ? keyboardHeight : 0 }}>
          <PaddingHorizontal value={20} noflex>
            <View style={styles.textWrapper}>
              <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>해설 신고사유를 알려주세요.</Text>
              <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>
                운영진이 검토 후, 해당 해설자에게 제재가 부여됩니다.
              </Text>
            </View>

            <View style={styles.checkWrapper}>
              <CheckGroup option={option} setOption={setOption} />
            </View>

            <View style={styles.inputWrapper}>
              <ReportInput value={text} onChangeText={setText} />
            </View>

            <View style={styles.buttonWrapper}>
              <BomButton text="취소하기" theme="primary" isShort onPress={onClose} />

              <BomButton text="신고하기" theme="secondary" isShort />
            </View>
          </PaddingHorizontal>
        </ScrollView>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  topWrapper: {
    alignItems: 'center',

    paddingTop: 20,
    paddingBottom: 10,
  },
  textWrapper: {
    alignItems: 'center',

    marginTop: 20,
    gap: 3,
  },
  checkWrapper: {
    marginTop: 20,

    marginLeft: 5,
  },
  inputWrapper: {
    marginTop: 20,
  },
  buttonWrapper: {
    marginTop: 30,

    flexDirection: 'row',
    justifyContent: 'center',

    gap: 10,
  },
});

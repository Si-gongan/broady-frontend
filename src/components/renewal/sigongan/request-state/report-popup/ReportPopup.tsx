import { useState, useImperativeHandle, forwardRef, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { BottomSheet } from 'react-native-btr';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Fonts, Utils } from '../../../styles';

import { useKeyboard } from '../../../../../hooks';
import { PaddingHorizontal } from '../../../design';
import { CheckGroup, ReportOption } from './CheckGroup';
import { ReportInput } from './ReportInput';
import { BomButton } from '../../../common';

import { IReqeustListItem, ReportPost } from '../../../../../api/axios';
import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../../../../states';
import { Notice, NoticeError } from '../../../utils';
import { ReportText } from './constants';

export type IReportPopupHandler = {
  open: (_user: IReqeustListItem['requestedUser'][0]) => void;
  close: () => void;
};

type IReportPopupProps = {
  item: IReqeustListItem;
};

// eslint-disable-next-line
export const ReportPopup = forwardRef<IReportPopupHandler, IReportPopupProps>(({ item }, ref) => {
  const insets = useSafeAreaInsets();

  const fcmToken = useRecoilValue(fcmTokenState);
  const [user, setUser] = useState<IReqeustListItem['requestedUser'][0]>();

  const [visible, setVisible] = useState(false);

  const [option, setOption] = useState<ReportOption>('none');
  const [text, setText] = useState('');

  const scrollViewRef = useRef<ScrollView>(null);

  // const { changeLoading } = useLoading();

  const { isKeyboardVisible, keyboardHeight } = useKeyboard();

  useEffect(() => {
    if (isKeyboardVisible) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [isKeyboardVisible]);

  const onClose = () => {
    setOption('none');
    setText('');

    setVisible(false);
  };

  const onReport = async () => {
    if (option === 'none') {
      Notice('신고 유형을 선택해주세요.');
      return;
    }

    if (option === 'third' && text.length === 0) {
      Notice('신고 사유를 입력해주세요.');
      return;
    }

    try {
      onClose();

      await ReportPost(
        item.id,
        ReportText[option],
        option === 'third' ? text : '없음',
        user?.text ?? '',
        user?.userId ?? '',
        fcmToken
      );

      Notice('신고를 완료했습니다!');
    } catch {
      NoticeError();
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      open: (_user) => {
        setVisible(true);
        setUser(_user);
      },
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

        <ScrollView style={{ paddingBottom: isKeyboardVisible ? keyboardHeight : 0 }} ref={scrollViewRef}>
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
              <ReportInput value={text} onChangeText={setText} disabled={option !== 'third'} />
            </View>

            <View style={styles.buttonWrapper}>
              <BomButton text="취소하기" theme="primary" fixedWidth={150} onPress={onClose} />

              <BomButton text="신고하기" theme="secondary" fixedWidth={150} onPress={onReport} />
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

import { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, findNodeHandle, AccessibilityInfo } from 'react-native';

import Share from 'react-native-share';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { BottomSheet } from 'react-native-btr';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Svg, { Path } from 'react-native-svg';

import { PaddingHorizontal } from '../../design';
import { Colors, Fonts, Utils } from '../../styles';
import { GetRequestSummary } from '../../../../api/axios';

import { BomButton } from '../../common';
import { DeleteCheckPopup, IDeleteCheckPopupHandler } from './DeleteCheckPopup';
import { delay } from '../../utils';

export type ISettingPopupHandler = {
  open: () => void;
  close: () => void;
};

type ISettingPopupProps = {
  onDelete: () => void;
  imgUrl: string;
  chat: any;
  answered: boolean;
};

// eslint-disable-next-line
export const SettingPopup = forwardRef<ISettingPopupHandler, ISettingPopupProps>(({ onDelete, imgUrl, chat, answered }, ref) => {
  const insets = useSafeAreaInsets();

  const topButtonRef = useRef<TouchableOpacity>(null);

  const [visible, setVisible] = useState(false);

  const DeleteCheckPopupRef = useRef<IDeleteCheckPopupHandler>(null);

  const onClose = () => setVisible(false);

  useImperativeHandle(
    ref,
    () => ({
      open: async () => {
        setVisible(true);

        await delay(500);

        const reactTag = findNodeHandle(topButtonRef.current);

        if (reactTag) {
          AccessibilityInfo.setAccessibilityFocus(reactTag);
        }
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
        <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>메뉴</Text>

        <PaddingHorizontal value={30} noflex>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button]}
            onPress={async () => {
              let summary = '[Broady]';
              if (answered){
                const response = await GetRequestSummary(chat);
                summary += '\n';
                summary += response.data.summary;
              } else {
                // nothing
              }
              ReactNativeBlobUtil.fetch(
                'GET',
                imgUrl
              )
                .then(res => {
                  let status = res.info().status;
                  if (status === 200) {
                    let base64Str = res.base64();
                    let options = {
                      message: summary,
                      url: `data:image/jpeg;base64,${base64Str}`,
                    };
                    Share.open(options)
                      .then(r => {
                        console.log(r);
                      })
                      .catch(e => {
                        e && console.log(e);
                      });
                  } else {
                    // handle other status codes
                  }
                })
                // Something went wrong:
                .catch(err => {
                  // error handling
                  console.log(err);
                });

            }}
            accessible
            accessibilityLabel="사진 공유하기 버튼"
            ref={topButtonRef}
          >
            <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>사진 공유하기</Text>

            <Svg width="9" height="16" viewBox="0 0 9 16" fill="none">
              <Path
                d="M6.13379 7.9999L0.383789 2.2499L1.70107 0.932617L8.76835 7.9999L1.70107 15.0672L0.383789 13.7499L6.13379 7.9999Z"
                fill={Colors.Font.primary}
              />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button]}
            onPress={() => {
              DeleteCheckPopupRef.current?.open();
            }}
            accessible
            accessibilityLabel="질문 삭제하기 버튼"
            ref={topButtonRef}
          >
            <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>질문 삭제하기</Text>

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

      <DeleteCheckPopup ref={DeleteCheckPopupRef} onprevPopupClose={onClose} onDelete={onDelete} />
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

import { toastConfig } from '@/config/toast';
import { GET_MARGIN } from '@/constants/theme';
import { logError } from '@/library/axios';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useTheme } from 'styled-components/native';
import CheckBox from '../auth/CheckBox';
import BottomModal from '../common/BottomModal';
import BroadyButton from '../common/BroadyButton';
import BroadyTextInput from '../common/BroadyTextInput';
import ContentsWrapper, { CenteredContentsWrapper } from '../common/ContentsWrapper';
import FlexBox from '../common/FlexBox';
import Typography from '../common/Typography';
import { showCheckToast } from '@/library/toast/toast';
import { set } from 'react-native-reanimated';

const CheckBoxForm = ({ checked, text, onPress }: { checked: boolean; text: string; onPress: () => void }) => {
  return (
    <FlexBox alignItems="center" gap={GET_MARGIN('h4')}>
      <Pressable onPress={onPress}>
        <CheckBox checked={checked} type="selectedCheckBox" />
      </Pressable>
      <Typography size="body_lg">{text}</Typography>
    </FlexBox>
  );
};

const reasonEnum = {
  부적절: '해설에 부적절한 내용이 포함되어 있어요.' as const,
  불성실: '불성실한 해설이에요.' as const,
  기타: '기타' as const,
};

export default function PostChatReportModal({
  isVisible,
  setIsVisible,
  reportChat,
  afterReport,
}: {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  reportChat: (reason: string) => Promise<void>;
  afterReport?: () => void;
}) {
  const [reason, setReason] = useState('');
  const [checkIndex, setCheckIndex] = useState(null);
  const [isReportLoading, setIsReportLoading] = useState(false);

  const theme = useTheme();

  const onPressConfirm = () => {
    setIsVisible(false);
    setReason('');
    setCheckIndex(null);
  };

  // reason은 enum.1 이거나, enum.2 이거나, 아니면 사용자 직접입력이거나.
  //

  const textInputBorder = checkIndex === 2 ? theme.COLOR.MINT_2 : undefined;

  const onPressReport = async () => {
    setIsReportLoading(true);
    try {
      await reportChat(reason);
      afterReport && afterReport();
    } catch (e) {
      logError(e);
    } finally {
      setIsReportLoading(false);
      setReason('');
    }
  };

  const onChangeReason = (reason: string) => {
    if (checkIndex !== 2) return;
    if (reason.length > 100) return;
    setReason(reason);
  };

  return (
    <BottomModal
      onBackdropPress={() => {
        setIsVisible(false);
      }}
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      headerText={'신고'}
    >
      <ContentsWrapper>
        <FlexBox direction="column" gap={GET_MARGIN('h3') + 5}>
          <View />
          <CenteredContentsWrapper>
            <Typography size="body_lg" color={theme.COLOR.FONT.SUB_CONTENT}>
              해설 신고사유를 알려주세요.
            </Typography>
            <Typography size="body_lg" color={theme.COLOR.FONT.SUB_CONTENT}>
              운영진이 검토 후, 해당 해설자에게 제재가 부여됩니다.
            </Typography>
          </CenteredContentsWrapper>
          <FlexBox direction="column" gap={GET_MARGIN('h5')}>
            <CheckBoxForm
              checked={checkIndex === 0}
              text={reasonEnum.부적절}
              onPress={() => {
                setCheckIndex(0);
                setReason(reasonEnum.부적절);
              }}
            />
            <CheckBoxForm
              checked={checkIndex === 1}
              text={reasonEnum.불성실}
              onPress={() => {
                setCheckIndex(1);
                setReason(reasonEnum.불성실);
              }}
            />
            <CheckBoxForm
              checked={checkIndex === 2}
              text={reasonEnum.기타}
              onPress={() => {
                setCheckIndex(2);
                setReason('');
              }}
            />
          </FlexBox>
          <FlexBox direction="column" alignItems="flex-end" gap={GET_MARGIN('h5')}>
            <Typography size="body_sm" color={theme.COLOR.FONT.SUB_CONTENT}>
              {reason.length.toString()} / 100
            </Typography>
            <BroadyTextInput
              variant="Border"
              text={reason}
              onChangeText={onChangeReason}
              borderColor={textInputBorder}
              placeholder="운영진이 참고했으면 하는 내용을 적어주세요"
              multiline
            ></BroadyTextInput>
          </FlexBox>

          <FlexBox direction="row" alignItems="center" gap={GET_MARGIN('h4')}>
            <BroadyButton
              isLoading={isReportLoading}
              onPress={onPressReport}
              flex={1}
              variant="alert"
              text="신고하기"
            />
            <BroadyButton onPress={onPressConfirm} flex={1} variant="grey" text="취소하기" />
          </FlexBox>
          <View></View>
        </FlexBox>
      </ContentsWrapper>
      <Toast position="bottom" config={toastConfig} />
    </BottomModal>
  );
}

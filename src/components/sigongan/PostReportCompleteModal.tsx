import React from 'react';
import CenteredModal from '../common/CenteredModal';
import Typography from '../common/Typography';
import { useTheme } from 'styled-components/native';
import BroadyButton from '../common/BroadyButton';
import Margin from '../common/Margin';
import FlexBox from '../common/FlexBox';

export default function PostReportCompleteModal({
  isVisible,
  setIsVisible,
  requestAgain,
}: {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  requestAgain: () => Promise<void>;
}) {
  const theme = useTheme();

  const onPressRequestAgain = async () => {
    setIsVisible(false);
    requestAgain();
  };

  return (
    <CenteredModal isVisible={isVisible} closeModal={() => setIsVisible(false)}>
      <CenteredModal.TextBox>
        <Typography size="body_xl" weight="medium">
          신고접수 완료
        </Typography>
        <Typography size="body_lg" weight="regular" color={theme.COLOR.FONT.SUB_CONTENTDIM}>
          다른 해설자에게 다시 질문하시겠어요?
        </Typography>
      </CenteredModal.TextBox>
      <FlexBox direction="row" alignItems="center" gap={theme.SPACING.MARGIN.h4}>
        <BroadyButton
          variant="grey"
          text="닫기"
          flex={1}
          onPress={() => {
            setIsVisible(false);
          }}
        ></BroadyButton>
        <BroadyButton flex={1} variant="primary" text="다시 질문하기" onPress={onPressRequestAgain}></BroadyButton>
      </FlexBox>
    </CenteredModal>
  );
}

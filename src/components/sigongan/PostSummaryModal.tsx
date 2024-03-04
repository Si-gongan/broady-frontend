import { View, Text } from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/config/toast';
import FlexBox from '../common/FlexBox';
import BroadyButton from '../common/BroadyButton';
import { GET_MARGIN } from '@/constants/theme';
import BottomModal from '../common/BottomModal';
import ContentsWrapper, { CenteredContentsWrapper } from '../common/ContentsWrapper';
import Margin from '../common/Margin';
import Typography from '../common/Typography';

export default function PostSummaryModal({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}) {
  const onPressConfirm = () => {
    setIsVisible(false);
  };

  const onPressPinPost = () => {
    setIsVisible(false);
  };

  return (
    <BottomModal
      onBackdropPress={() => {
        setIsVisible(false);
      }}
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      headerText={'사진 해설 전체 요약'}
    >
      <ContentsWrapper>
        <FlexBox direction="column" gap={GET_MARGIN('h3')}>
          <View></View>
          <CenteredContentsWrapper>
            <Typography size="body_md" color="primary">
              요약된 해설이 여기 표출됩니다.
            </Typography>
          </CenteredContentsWrapper>
          <FlexBox direction="row" alignItems="center" gap={GET_MARGIN('h4')}>
            <BroadyButton flex={1} onPress={onPressConfirm} variant="grey" text="확인" />
            <BroadyButton flex={1} onPress={onPressPinPost} variant="primary" text="해설 찜하기" />
          </FlexBox>
          <View></View>
        </FlexBox>
      </ContentsWrapper>

      <Toast position="bottom" config={toastConfig} />
    </BottomModal>
  );
}
3;

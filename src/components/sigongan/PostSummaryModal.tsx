import { View, Text, ActivityIndicator } from 'react-native';
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
import { useTheme } from 'styled-components/native';

export default function PostSummaryModal({
  isVisible,
  setIsVisible,
  isSummaryLoading,
  onPressPinPostOnSummary,
  summary,
}: {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onPressPinPostOnSummary: () => void;
  isSummaryLoading: boolean;
  summary: string;
}) {
  const onPressConfirm = () => {
    setIsVisible(false);
  };

  const theme = useTheme();

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
          <View />
          <View
            style={{
              paddingHorizontal: 20,
            }}
          >
            <CenteredContentsWrapper>
              {isSummaryLoading ? (
                <ActivityIndicator size="large" />
              ) : (
                <Typography size="body_lg" color={theme.COLOR.FONT.SUB_CONTENTDIM}>
                  {summary}
                </Typography>
              )}
            </CenteredContentsWrapper>
          </View>
          <FlexBox direction="row" alignItems="center" gap={GET_MARGIN('h4')}>
            <BroadyButton flex={1} onPress={onPressConfirm} variant="grey" text="확인" />
            <BroadyButton flex={1} onPress={onPressPinPostOnSummary} variant="primary" text="해설 찜하기" />
          </FlexBox>
          <View></View>
        </FlexBox>
      </ContentsWrapper>
      <Toast position="bottom" config={toastConfig} />
    </BottomModal>
  );
}
3;

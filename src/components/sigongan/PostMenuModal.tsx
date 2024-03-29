import { View, Text, TouchableOpacity, AccessibilityInfo } from 'react-native';
import React, { useState } from 'react';
import BottomModal from '../common/BottomModal';
import ContentsWrapper, { CenteredContentsWrapper } from '../common/ContentsWrapper';
import Margin from '../common/Margin';
import FlexBox from '../common/FlexBox';
import { GET_MARGIN } from '@/constants/theme';
import BroadyButton from '../common/BroadyButton';
import Typography from '../common/Typography';
import { useTheme } from 'styled-components/native';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/config/toast';
import { useSigonganNavigation } from '@/hooks';
import { SCREENS } from '@/constants/screens';
import { deletePostApi } from '@/axios';
import { authTokenState } from '@/states';
import { useRecoilValue } from 'recoil';
import { showErrorToast } from '@/library/toast/toast';
import { logError } from '@/library/axios';

export default function PostMenuModal({
  isVisible,
  setIsVisible,
  sharePhoto,
  selectedPostId,
}: {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  selectedPostId: string | null;
  sharePhoto: () => Promise<void>;
}) {
  const [isDeletePressed, setIsDeletePressed] = useState(false);

  const navigation = useSigonganNavigation();

  const token = useRecoilValue(authTokenState);

  const headerText = isDeletePressed ? '삭제하기' : '메뉴';

  const onPressSharePhoto = async () => {
    await sharePhoto();
    // setIsVisible(false);
  };

  const onPressDeletePostFirst = () => {
    setIsDeletePressed(true);
  };

  const onPressDeletePostSecond = async () => {
    //selectedPostId가 없을때는 지우지 않는다.

    if (selectedPostId) {
      try {
        const response = await deletePostApi(selectedPostId, token);
      } catch (e) {
        logError(e);
        showErrorToast('채팅방 삭제에 실패했습니다.');
      }
    }

    AccessibilityInfo.announceForAccessibility('채팅방을 삭제했습니다. 홈화면으로 돌아갑니다.');
    navigation.navigate('MainTab');
  };

  const onPressBackToMenu = () => {
    setIsDeletePressed(false);
  };

  const theme = useTheme();

  return (
    <BottomModal
      onBackdropPress={() => {
        setIsDeletePressed(false);
      }}
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      headerText={headerText}
    >
      <ContentsWrapper>
        <Margin margin={GET_MARGIN('h2')} />
        <FlexBox direction="column" gap={GET_MARGIN('h2')}>
          {isDeletePressed ? (
            <>
              <CenteredContentsWrapper accessible>
                <Typography size="body_lg" weight="semibold" color={theme.COLOR.FONT.SUB_CONTENTDIM}>
                  질문을 삭제하면
                </Typography>
                <Typography size="body_lg" weight="semibold" color={theme.COLOR.FONT.SUB_CONTENTDIM}>
                  질문 내용을 다시 볼 수 없어요.
                </Typography>
              </CenteredContentsWrapper>
              <FlexBox direction="row" alignItems="center" gap={GET_MARGIN('h4')}>
                <BroadyButton flex={1} onPress={onPressDeletePostSecond} variant="darkButton" text="질문 삭제하기" />
                <BroadyButton flex={1} onPress={onPressBackToMenu} variant="grey" text="돌아가기" />
              </FlexBox>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={onPressSharePhoto} hitSlop={20}>
                <Typography
                  color={theme.COLOR.FONT.SUB_CONTENTDIM}
                  size="body_xl"
                  weight="medium"
                  accessiblityLabel="사진 공유하기 버튼"
                >
                  사진 공유하기
                </Typography>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressDeletePostFirst} hitSlop={20}>
                <Typography
                  color={theme.COLOR.FONT.SUB_CONTENTDIM}
                  size="body_xl"
                  weight="medium"
                  accessiblityLabel="질문 삭제하기 버튼"
                >
                  질문 삭제하기
                </Typography>
              </TouchableOpacity>
              <BroadyButton
                variant="grey"
                text="취소"
                onPress={() => {
                  setIsVisible(false);
                }}
              ></BroadyButton>
            </>
          )}
        </FlexBox>
      </ContentsWrapper>
      <Toast position="bottom" config={toastConfig} />
    </BottomModal>
  );
}

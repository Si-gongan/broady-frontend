import { View, Text } from 'react-native';
import React from 'react';
import { GET_MARGIN } from '@/constants/theme';
import { useTheme } from 'styled-components/native';
import ContentsWrapper from '../common/ContentsWrapper';
import BottomModal from '../common/BottomModal';
import Typography from '../common/Typography';
import FlexBox from '../common/FlexBox';
import BroadyButton from '../common/BroadyButton';
import Margin from '../common/Margin';
import { pickImage, takePhoto } from '@/library';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { showErrorToast } from '@/library/toast/toast';
import { useSigonganNavigation } from '@/hooks';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/config/toast';

export default function ImagePickerModal({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}) {
  const theme = useTheme();

  const navigation = useSigonganNavigation();

  const onPressTakePhoto = async () => {
    try {
      const result = await takePhoto();

      if (result?.canceled) {
        return;
      }

      setIsVisible(false);

      const url = result?.assets[0].uri;
    } catch (e) {
      showErrorToast('사진을 가져오는데 실패했습니다.');
    }

    // if (aiChat) {
    //   aiChat.onImageSubmit(url ?? '');
    // } else {
    //   navigation.navigate('해설의뢰', { url });
    // }
  };

  const onPressPickImage = async () => {
    try {
      const result = await pickImage();

      if (result?.canceled) {
        return;
      }

      setIsVisible(false);

      const url = result?.assets[0].uri;

      if (!url) {
        return;
      }

      navigation.navigate('Post', { url });
    } catch (e) {
      showErrorToast('사진을 가져오는데 실패했습니다.');
    }

    // if (aiChat) {
    //   aiChat.onImageSubmit(url ?? '');
    // } else {
    //   navigation.navigate('해설의뢰', { url });
    // }
  };

  return (
    <BottomModal isModalVisible={isVisible} setIsModalVisible={setIsVisible} headerText="사진 선택">
      <ContentsWrapper>
        <Margin margin={GET_MARGIN('h2')} />
        <FlexBox direction="column" gap={GET_MARGIN('h2')}>
          <TouchableOpacity onPress={onPressTakePhoto} hitSlop={20}>
            <Typography color={theme.COLOR.FONT.SUB_CONTENTDIM} size="body_xl" weight="medium">
              직접 촬영
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressPickImage} hitSlop={20}>
            <Typography color={theme.COLOR.FONT.SUB_CONTENTDIM} size="body_xl" weight="medium">
              갤러리에서 선택
            </Typography>
          </TouchableOpacity>
          <BroadyButton
            variant="secondary"
            text="취소"
            onPress={() => {
              setIsVisible(false);
            }}
          ></BroadyButton>
        </FlexBox>
      </ContentsWrapper>
      <Toast position="bottom" config={toastConfig} />
    </BottomModal>
  );
}

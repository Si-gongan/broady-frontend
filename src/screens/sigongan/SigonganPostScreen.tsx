import BroadyButton from '@/components/common/BroadyButton';
import BroadyTextInput from '@/components/common/BroadyTextInput';
import FlexBox from '@/components/common/FlexBox';
import Icons from '@/components/common/Icons';
import PageHeader from '@/components/common/PageHeader';
import ImagePickerModal from '@/components/sigongan/ImagePickerModal';
import React from 'react';
import { Image, KeyboardAvoidingView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const ImageBox = styled.View`
  aspect-ratio: 1;
  /* padding-bottom: 100%; */
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.STYLES.RADIUS.md}px;
  background-color: ${({ theme }) => theme.COLOR.GRAY_50};
`;

const MainContents = styled.ScrollView`
  /* flex: 1; */
  /* padding-bottom: 100; */
`;

const PostWrapper = styled.View`
  padding-left: ${({ theme }) => theme.SPACING.MARGIN.h2}px;
  padding-right: ${({ theme }) => theme.SPACING.MARGIN.h2}px;
`;

const InputBox = styled.View<{ bottom: number }>`
  width: 100%;
  padding: ${({ theme }) => theme.SPACING.PADDING.P5}px ${({ theme }) => theme.SPACING.PADDING.P3}px
    ${({ theme }) => theme.SPACING.PADDING.P5}px;
  background-color: ${({ theme }) => theme.COLOR.WHITE};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.COLOR.BD_4};
`;

export default function SigonganPostScreen({ route, navigation }) {
  const url = route.params?.url;

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const openImagePickerModal = () => {
    setIsModalVisible(true);
  };

  const closeImagePickerModal = () => {
    setIsModalVisible(false);
  };

  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <PageHeader title="시공간" headerRight={<Icons type="materialIcons" name="menu" size={30}></Icons>} />
        <MainContents>
          <PostWrapper>
            <FlexBox direction="column" alignItems="center" gap={20}>
              <ImageBox>
                <Image
                  resizeMode="cover"
                  source={{ uri: url }}
                  style={{
                    aspectRatio: 1,
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: 12,
                  }}
                />
              </ImageBox>
              <BroadyButton onPress={openImagePickerModal} variant="secondary" text="사진 다시 선택하기" />
            </FlexBox>
            <View style={{ height: 100 }}></View>
          </PostWrapper>
        </MainContents>
        <InputBox bottom={bottom}>
          <FlexBox direction="row" alignItems="center" gap={10}>
            <BroadyTextInput placeholder="내용을 입력해주세요" variant="Border" paddingVariant="small" />
            <Image source={require('@/../assets/images/send_icon.png')} style={{ width: 30, height: 30 }} />
          </FlexBox>
        </InputBox>
        <ImagePickerModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
      </KeyboardAvoidingView>
    </View>
  );
}

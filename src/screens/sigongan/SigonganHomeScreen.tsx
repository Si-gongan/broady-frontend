import BroadyButton from '@/components/common/BroadyButton';
import ContentsWrapper from '@/components/common/ContentsWrapper';
import FlexBox from '@/components/common/FlexBox';
import Margin from '@/components/common/Margin';
import Typography from '@/components/common/Typography';
import ChatListItem from '@/components/sigongan/ChatListItem';
import SearchBar from '@/components/sigongan/SearchBar';
import { GET_MARGIN } from '@/constants/theme';
import { useSearchKeyword } from '@/hooks/useSearchKeyword';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useSigonganNavigation } from '@/hooks';
import { usePostLists } from '@/hooks/usePostLists';
import { useState } from 'react';
import Modal from 'react-native-modal';
import BottomModal from '@/components/common/BottomModal';
import { pickImage, takePhoto } from '@/library';
import ImagePickerModal from '@/components/sigongan/ImagePickerModal';
import { showErrorToast } from '@/library/toast/toast';

export const SigonganHomeScreen = () => {
  const navigation = useSigonganNavigation();
  const theme = useTheme();

  const { searchKeyword, onChangeSearchKeyword, onPressSearch, onPressDelete } = useSearchKeyword();

  const { postList, setSelectedPostItem, getPostList } = usePostLists();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onPressChatListItem = (id: string | null) => {
    setSelectedPostItem(id);
    navigation.navigate('Post');
  };

  const toggleImageUploadModal = () => {
    setIsModalVisible(true);
  };

  const onPressTakePhoto = async () => {
    const result = await takePhoto();

    if (result?.canceled) {
      return;
    }

    setIsModalVisible(false);

    const url = result?.assets[0].uri;

    // if (aiChat) {
    //   aiChat.onImageSubmit(url ?? '');
    // } else {
    //   navigation.navigate('해설의뢰', { url });
    // }
  };

  const onPressPickImage = async () => {
    const result = await pickImage();

    if (result?.canceled) {
      return;
    }

    setIsModalVisible(false);

    const url = result?.assets[0].uri;

    // if (aiChat) {
    //   aiChat.onImageSubmit(url ?? '');
    // } else {
    //   navigation.navigate('해설의뢰', { url });
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Margin margin={GET_MARGIN('h3')} />
        <ContentsWrapper>
          <FlexBox direction="column" gap={theme.SPACING.MARGIN.h3}>
            <BroadyButton
              variant="primary"
              onPress={toggleImageUploadModal}
              text="새로운 사진 해설 받기"
            ></BroadyButton>
            <SearchBar
              onPressSearch={onPressSearch}
              onPressDelete={onPressDelete}
              text={searchKeyword}
              onChangeText={onChangeSearchKeyword}
              placeholder="검색어를 입력해주세요."
            />
          </FlexBox>
        </ContentsWrapper>
        {postList.length === 0 ? (
          <FlexBox
            direction="column"
            gap={theme.SPACING.MARGIN.h5}
            styles={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography size="body_lg" weight="semibold" color={theme.COLOR.GRAY_500}>
              아직 해설받은 사진이 없어요.
            </Typography>
            <Typography size="body_lg" weight="semibold" color={theme.COLOR.GRAY_500}>
              궁금한 사진을 질문해 보세요!
            </Typography>
          </FlexBox>
        ) : (
          <ScrollView>
            {postList.map((item, index) => (
              <ChatListItem
                key={index}
                imageSrc={item.photo}
                mainText={item.title}
                subText={item.lastChat}
                time={item.updatedAt}
                unreadPostCount={item.unreadPostCount}
                onPress={() => {
                  onPressChatListItem(item.id);
                }}
              />
            ))}
          </ScrollView>
        )}
      </View>
      <ImagePickerModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
    </SafeAreaView>
  );
};

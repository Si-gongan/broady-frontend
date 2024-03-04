import { readPostApi } from '@/axios';
import BroadyButton from '@/components/common/BroadyButton';
import ContentsWrapper from '@/components/common/ContentsWrapper';
import FlexBox from '@/components/common/FlexBox';
import Margin from '@/components/common/Margin';
import Typography from '@/components/common/Typography';
import ImagePickerModal from '@/components/sigongan/ImagePickerModal';
import PostListItem from '@/components/sigongan/PostListItem';
import SearchBar from '@/components/sigongan/SearchBar';
import { GET_MARGIN } from '@/constants/theme';
import { useSigonganNavigation } from '@/hooks';
import { usePostLists } from '@/hooks/usePostLists';
import { useSearchKeyword } from '@/hooks/useSearchKeyword';
import { logError } from '@/library/axios';
import { authTokenState } from '@/states';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { useTheme } from 'styled-components/native';

export const SigonganHomeScreen = () => {
  const navigation = useSigonganNavigation();
  const theme = useTheme();
  const token = useRecoilValue(authTokenState);

  const { searchKeyword, onChangeSearchKeyword, onPressSearch, onPressDelete } = useSearchKeyword();

  const { postList, getInitialPostList, setSelectedPostId } = usePostLists();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onPressPostListItem = async (id: string | null) => {
    if (!id) return;

    setSelectedPostId(id);

    navigation.navigate('Post');

    try {
      await readPostApi(id, token);
    } catch (error) {
      logError(error);
    }
  };

  const toggleImageUploadModal = () => {
    setIsModalVisible(true);
  };

  const onFocusEffect = async () => {
    await getInitialPostList();
  };

  useFocusEffect(
    useCallback(() => {
      onFocusEffect();
    }, [])
  );

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
              <PostListItem
                key={index}
                imageSrc={item.photo}
                mainText={item.title}
                subText={item.lastChat}
                time={item.updatedAt}
                unreadPostCount={item.unreadPostCount}
                onPress={() => {
                  onPressPostListItem(item.id);
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

import { getPostListApi, readPostApi } from '@/axios';
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
import { logError } from '@/library/axios';
import { authTokenState, selectedPostIdAtom, syncPostListAtom } from '@/states';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, View, AccessibilityInfo, findNodeHandle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useRecoilValue } from 'recoil';
import { useTheme } from 'styled-components/native';

export const SigonganHomeScreen = () => {
  const navigation = useSigonganNavigation();
  const theme = useTheme();
  const token = useRecoilValue(authTokenState);

  const flatListRef = useRef<FlatList | null>(null);
  const noResultRef = useRef<View | null>(null);

  const {
    postList,
    isFetching,
    searchKeyword,
    getInitialPostList,
    setSelectedPostId,
    getMorePostList,
    onDeleteSearchKeyword,
    onChangeSearchKeyword,
    resetPage,
  } = usePostLists({
    postListFetcher: getPostListApi,
    postListAtom: syncPostListAtom,
    selectedPostIdAtom: selectedPostIdAtom,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onPressPostListItem = async (id: string | null) => {
    if (!id) return;

    setSelectedPostId(id);

    navigation.navigate('Post', {
      assets: undefined,
      fromDeletedPostId: undefined,
      postListAtom: syncPostListAtom,
    });

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

  const onPressSearchKeyword = () => {
    const currentRef = postList.length === 0 ? noResultRef : flatListRef;

    if (!currentRef.current) return;

    const nodeValue = findNodeHandle(currentRef.current);

    if (nodeValue === null) return;

    // AccessibilityInfo.setAccessibilityFocus(nodeValue);
    // AccessibilityInfo.setAccessibilityFocus(nodeValue);
  };

  useFocusEffect(
    useCallback(() => {
      resetPage();
      onFocusEffect();
    }, [])
  );

  useEffect(() => {
    return () => {
      resetPage();
    };
  }, []);

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(searchKeyword);
  }, [searchKeyword]);

  const onReachBottom = () => {
    getMorePostList();
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
              onPressSearch={onPressSearchKeyword}
              onPressDelete={onDeleteSearchKeyword}
              text={searchKeyword}
              onChangeText={(text) => {
                onChangeSearchKeyword(text);
              }}
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
            {isFetching ? (
              <ActivityIndicator size="large" />
            ) : searchKeyword ? (
              <View
                accessible
                ref={(ref) => {
                  noResultRef.current = ref;
                }}
              >
                <Typography size="body_lg" weight="semibold" color={theme.COLOR.GRAY_500}>
                  검색결과에 일치하는 해설이 없어요
                </Typography>
              </View>
            ) : (
              <>
                <Typography size="body_lg" weight="semibold" color={theme.COLOR.GRAY_500}>
                  아직 해설받은 사진이 없어요.
                </Typography>
                <Typography size="body_lg" weight="semibold" color={theme.COLOR.GRAY_500}>
                  궁금한 사진을 질문해 보세요!
                </Typography>
              </>
            )}
          </FlexBox>
        ) : (
          <>
            <FlatList
              ref={(ref) => {
                flatListRef.current = ref;
              }}
              data={postList}
              renderItem={({ item }) => (
                <PostListItem
                  imageSrc={item.photo}
                  mainText={item.title}
                  subText={item.lastChat}
                  time={item.updatedAt}
                  unreadPostCount={item.unreadPostCount}
                  onPress={() => {
                    onPressPostListItem(item.id);
                  }}
                />
              )}
              style={{
                flex: 1,
              }}
              keyExtractor={(item) => item.id + Math.random()}
              onEndReached={onReachBottom}
            ></FlatList>
            <Margin margin={GET_MARGIN('h3')} />
            {isFetching && <ActivityIndicator size="large" />}
          </>
        )}
      </View>
      <ImagePickerModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        setSelectedPostId={setSelectedPostId}
      />
    </SafeAreaView>
  );
};

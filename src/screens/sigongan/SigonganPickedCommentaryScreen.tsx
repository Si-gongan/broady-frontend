import { getPinnedPostListApi, getPostListApi, readPostApi } from '@/axios';
import ContentsWrapper, { CenteredContentsWrapper } from '@/components/common/ContentsWrapper';
import FlexBox from '@/components/common/FlexBox';
import Margin from '@/components/common/Margin';
import Typography from '@/components/common/Typography';
import PostListItem from '@/components/sigongan/PostListItem';
import SearchBar from '@/components/sigongan/SearchBar';
import { GET_MARGIN } from '@/constants/theme';
import { useSigonganNavigation } from '@/hooks';
import { usePostLists } from '@/hooks/usePostLists';
import { logError } from '@/library/axios';
import { useUserState } from '@/providers';
import { authTokenState, pinnedPostListAtom, selectedPostIdAtom, syncPostListAtom } from '@/states';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef } from 'react';
import { View, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { useRecoilValue } from 'recoil';
import { useTheme } from 'styled-components/native';

export const SigonganPickedCommentaryScreen = () => {
  const theme = useTheme();

  const flatListRef = useRef<FlatList | null>(null);
  const noResultRef = useRef<View | null>(null);

  const navigation = useSigonganNavigation();

  const token = useRecoilValue(authTokenState);

  const { currentUser } = useUserState();

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
    postListFetcher: getPinnedPostListApi,
    postListAtom: pinnedPostListAtom,
    selectedPostIdAtom: selectedPostIdAtom,
  });

  const onReachBottom = () => {
    getMorePostList();
  };

  const onFocusEffect = async () => {
    await getInitialPostList();
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

  const onPressPostListItem = async (id: string) => {
    setSelectedPostId(id);

    navigation.navigate('Post', {
      assets: undefined,
      fromDeletedPostId: undefined,
      postListAtom: pinnedPostListAtom,
    });

    try {
      await readPostApi(id, token);
    } catch (error) {
      logError(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Margin margin={GET_MARGIN('h2')} />
        <FlexBox justifyContent="space-between">
          <View></View>
          <FlexBox accessible>
            <Typography size="body_xl" weight="bold" color={theme.COLOR.MINT_2}>
              {currentUser?.nickname || '브로디'}
            </Typography>
            <Typography size="body_xl" weight="bold">
              님의 찜한 해설
            </Typography>
          </FlexBox>
          <View></View>
        </FlexBox>
        <Margin margin={GET_MARGIN('h2')} />
        <ContentsWrapper>
          <SearchBar
            onChangeText={onChangeSearchKeyword}
            text={searchKeyword}
            onPressDelete={onDeleteSearchKeyword}
            onPressSearch={() => {}}
            placeholder="찜한 해설을 검색해보세요."
          />
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
                  아직 찜한 해설이 없어요.
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
    </SafeAreaView>
  );
};

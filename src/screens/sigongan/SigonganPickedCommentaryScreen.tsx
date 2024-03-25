import { getPinnedPostListApi, readPostApi } from '@/axios';
import BroadyButton from '@/components/common/BroadyButton';
import ContentsWrapper from '@/components/common/ContentsWrapper';
import FlexBox from '@/components/common/FlexBox';
import Margin from '@/components/common/Margin';
import Typography from '@/components/common/Typography';
import PostListItem from '@/components/sigongan/PostListItem';
import SearchBar from '@/components/sigongan/SearchBar';
import { GET_MARGIN } from '@/constants/theme';
import { useSigonganNavigation } from '@/hooks';
import { useManageSelectedPost } from '@/hooks/useManageSelectedPost';
import { usePostLists } from '@/hooks/usePostLists';
import { logError } from '@/library/axios';
import { useUserState } from '@/providers';
import { authTokenState, pinnedPostListAtom, selectedPostIdAtom } from '@/states';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import styled, { useTheme } from 'styled-components/native';

const SelectBtn = styled.Pressable`
  padding: 8px 15px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.COLOR.GRAY_50};
`;

const InvisibleSelectBtn = styled(SelectBtn)`
  background-color: transparent;
  touch-action: none;
  width: 50px;
`;

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

  const {
    isSelectMode,
    onPressCancelSelectMode,
    onPressSelectMode,
    onPressSelectPost,
    isSelectedPost,
    onPressDeleteSelectedPost,
    selectedArrayLength,
  } = useManageSelectedPost({
    onDeletePostFinished: async () => {
      await getInitialPostList();
    },
  });

  const onPressSelectBtn = () => {
    if (isSelectMode) {
      onPressCancelSelectMode();
    } else {
      onPressSelectMode();
    }
  };

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

  const onPressPostListItem = useCallback(
    async (id: string) => {
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
    },
    [navigation, token]
  );

  const onPressSelectItem = useCallback(
    (postId: string) => {
      onPressSelectPost(postId);
    },
    [onPressSelectPost]
  );

  const onPress = useCallback(
    (postId: string) => {
      onPressPostListItem(postId);
    },
    [onPressPostListItem]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Margin margin={GET_MARGIN('h2')} />
        <ContentsWrapper>
          <FlexBox justifyContent="space-between" alignItems="center">
            <View></View>
            <View></View>
            <FlexBox accessible>
              <Typography size="body_xl" weight="bold" color={theme.COLOR.MINT_2}>
                {currentUser?.nickname || '브로디'}
              </Typography>
              <Typography size="body_xl" weight="bold">
                님의 찜한 해설
              </Typography>
            </FlexBox>
            <SelectBtn onPress={onPressSelectBtn}>
              <Typography size="body_lg" weight="bold" color={theme.COLOR.FONT.SUB_CONTENT}>
                {isSelectMode ? '취소' : '선택'}
              </Typography>
            </SelectBtn>
          </FlexBox>
        </ContentsWrapper>

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
          <View
            style={{
              flex: 1,
            }}
          >
            <FlatList
              ref={(ref) => {
                flatListRef.current = ref;
              }}
              data={postList}
              renderItem={({ item }) => (
                <PostListItem
                  onPressSelectItem={() => {
                    onPressSelectItem(item.id);
                  }}
                  onPress={() => {
                    onPress(item.id);
                  }}
                  isChecked={isSelectMode && isSelectedPost(item.id)}
                  isSelectMode={isSelectMode}
                  imageSrc={item.photo}
                  mainText={item.title}
                  subText={item.lastChat}
                  time={item.updatedAt}
                  unreadPostCount={item.unreadPostCount}
                />
              )}
              style={{
                flex: 1,
              }}
              keyExtractor={(item) => item.id + Math.random()}
              onEndReached={onReachBottom}
            ></FlatList>
            {isSelectMode && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  width: '100%',
                  zIndex: 100,
                }}
              >
                <ContentsWrapper>
                  <BroadyButton
                    text="찜 삭제하기"
                    variant="primary"
                    disabled={selectedArrayLength <= 0}
                    onPress={onPressDeleteSelectedPost}
                  ></BroadyButton>
                </ContentsWrapper>
              </View>
            )}

            <Margin margin={GET_MARGIN('h3')} />
            {isFetching && <ActivityIndicator size="large" />}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

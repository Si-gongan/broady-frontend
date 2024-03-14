import { View, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { CommentUserState, authTokenState } from '@/states';
import Margin from '@/components/common/Margin';
import { GET_MARGIN, GET_PADDING, THEME } from '@/constants/theme';
import ContentsWrapper from '@/components/common/ContentsWrapper';
import FlexBox from '@/components/common/FlexBox';
import { useCommentNavigation } from '@/hooks';
import { useRecoilValue } from 'recoil';
import Typography from '@/components/common/Typography';
import { getPostAvailableApi, getPostTodayCompleteApi } from '@/axios';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { IPost } from '@/@types/post';
import { PostListItem } from '@/components/comment/PostListItem';

type PostListType = {
  result: {
    posts: IPost[];
  };
};

// TODO: 무한스크롤 구현
export const CommentHomeScreen = () => {
  const navigation = useCommentNavigation();
  const userInfo = useRecoilValue(CommentUserState);
  const theme = useTheme();
  const token = useRecoilValue(authTokenState);

  const [availablePostList, setAvailablePostList] = useState<PostListType>({ result: { posts: [] } });
  const [todayCompletePostList, setTodayCompletePostList] = useState<PostListType>({ result: { posts: [] } });

  useEffect(() => {
    if (selected === "해설 가능 의뢰") availablePosts();
    else todayCompletePosts();
  }, []);

  const availablePosts = async () => {
    try {
      const res = await getPostAvailableApi({ limit: 10, page: 1, token: token });
      console.log(res.data.result.posts);
      setAvailablePostList(res.data as PostListType);
    } catch (error) {
      console.log(error);
    }
  };

  const todayCompletePosts = async () => {
    try {
      const res = await getPostTodayCompleteApi({ limit: 10, page: 1, token: token });
      console.log(res.data.result.posts);
      setTodayCompletePostList(res.data as PostListType);
    } catch (error) {
      console.log(error);
    }
  };

  const [selected, setSelected] = useState("해설 가능 의뢰");

  const onPressPostListItem = async (post: IPost) => {
    if (!post) return;

    navigation.navigate('Post', {
      post: post,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <View style={{ flex: 1 }}>
        <Margin margin={GET_MARGIN('h1')} />
        <ContentsWrapper flex={1}>
          <FlexBox direction="column" styles={{ backgroundColor: theme.COLOR.MINT_2, borderRadius: theme.STYLES.RADIUS.lg, paddingVertical: theme.SPACING.PADDING.P3, paddingHorizontal: THEME.SPACING.PADDING.P2 }}>
              <Typography size="body_xl" weight="bold" color={theme.COLOR.WHITE}>
                세상을 넓게,{'\n'}새로운 시야 브로디
              </Typography>
              <Margin margin={GET_MARGIN('h4')} />
              <Typography size="body_lg" weight="medium" color={theme.COLOR.WHITE}>
                  반가워요, {userInfo?.nickname || ''} 님!
              </Typography>
          </FlexBox>
          <Margin margin={GET_MARGIN('h5')} />

          <FlexBox alignItems="center" gap={GET_MARGIN('h6') * 2} styles={{ paddingHorizontal: GET_PADDING('P4'), paddingVertical: GET_PADDING('P5') }}>
            <Typography size="body_xl" weight="extraBold" color="black">
              오늘의 의뢰
            </Typography>
            <Typography size="body_md" weight="regular" color="black">
              총 {availablePostList.result.posts.length.toString()}개
            </Typography>
          </FlexBox>
          <Margin margin={GET_MARGIN('h3')} />

          <FlexBox alignItems="center" justifyContent='space-between'>
            <Pressable onPress={() => setSelected('해설 가능 의뢰')} style={selected === "해설 가능 의뢰" ? { backgroundColor: theme.COLOR.WHITE, width:"50%", paddingVertical: 6, borderRadius: theme.STYLES.RADIUS.xl } : { width:"50%", paddingVertical: 6, borderRadius: theme.STYLES.RADIUS.xl}}>
              <Typography size="body_md" weight="regular" color="black" styles={selected === "해설 가능 의뢰" ? { color: theme.COLOR.MINT_2, fontWeight: "700", textAlign: "center", fontSize: 14 } : { color: 'gray', textAlign: "center", fontSize: 14, fontWeight: "400" }}>
                해설 가능 의뢰
              </Typography>
            </Pressable>
            <Pressable onPress={() => setSelected('완료된 의뢰')} style={selected === "완료된 의뢰" ? { backgroundColor: theme.COLOR.WHITE, width:"50%", paddingVertical: 6, borderRadius: theme.STYLES.RADIUS.xl } : { width:"50%", paddingVertical: 6, borderRadius: theme.STYLES.RADIUS.xl}}>
              <Typography size="body_md" weight="regular" color="black" styles={selected === "완료된 의뢰" ? { color: theme.COLOR.MINT_2, fontWeight: "700", textAlign: "center", fontSize: 14 } : { color: 'gray', textAlign: "center", fontSize: 14, fontWeight: "400" }}>
                완료된 의뢰
              </Typography>
            </Pressable>
          </FlexBox>
          <Margin margin={GET_MARGIN('h5') * 2} />
          
          {selected === "해설 가능 의뢰" ? (
            availablePostList.result.posts.length === 0 ? (
              <>
                <Margin margin={GET_MARGIN('h1') * 5} />
                <Typography size="body_sm" weight="medium" color={theme.COLOR.GRAY_500} styles={{ textAlign: 'center', lineHeight: 24 }}>
                  조금만 기다려주세요.{'\n'}곧 사진 의뢰가 도착할 거예요!
                </Typography>
              </>
            ) : (
              <ScrollView style={{ flex: 1 }}>
                {availablePostList.result.posts.map((post, index) => (
                  <PostListItem key={index} post={post} onPress={(post: IPost | null) => onPressPostListItem(post as IPost)} />
                ))}
              </ScrollView>
            )
          ) : (
            todayCompletePostList.result.posts.length === 0 ? (
              <>
                <Margin margin={GET_MARGIN('h1') * 5} />
                <Typography size="body_sm" weight="medium" color={theme.COLOR.GRAY_500} styles={{ textAlign: 'center', lineHeight: 24 }}>
                  아직 완료된 의뢰가 없어요.
                </Typography>
              </>
            ) : (
              <ScrollView style={{ flex: 1 }}>
                {todayCompletePostList.result.posts.map((post, index) => (
                  <PostListItem key={index} post={post} onPress={(post: IPost | null) => onPressPostListItem(post as IPost)} />
                ))}
              </ScrollView>
            )
          )}
        </ContentsWrapper>
      </View>
    </SafeAreaView>
  );
};

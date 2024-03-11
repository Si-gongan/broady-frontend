import { View, Text, SafeAreaView, Pressable } from 'react-native';
import { useUserState } from '../../providers';
import Margin from '@/components/common/Margin';
import { GET_MARGIN, GET_PADDING, THEME } from '@/constants/theme';
import ContentsWrapper from '@/components/common/ContentsWrapper';
import FlexBox from '@/components/common/FlexBox';
import { useCommentNavigation } from '@/hooks';
import BroadyButton from '@/components/common/BroadyButton';
import { useRecoilValue } from 'recoil';
import { CommentUserState } from '@/states';
import Typography from '@/components/common/Typography';
import { getPostAvailable } from '@/axios';
import { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';

export const CommentHomeScreen = () => {
  const navigation = useCommentNavigation();

  const user = useRecoilValue(CommentUserState);
  const nickname = user?.nickname || '';

  const [posts, setPosts] = useState([] as any[]);

  const availablePosts = async () => {
    try {
      const res = await getPostAvailable({ limit: 10, page: 1, token: "ADF" });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [selected, setSelected] = useState("해설 가능 의뢰");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Margin margin={GET_MARGIN('h1')} />
        <ContentsWrapper>
          <FlexBox direction="column" styles={{ backgroundColor: THEME.COLOR.MINT_2, borderRadius: THEME.STYLES.RADIUS.lg, paddingVertical: THEME.SPACING.PADDING.P3, paddingHorizontal: THEME.SPACING.PADDING.P2 }}>
              <Typography size="body_xl" weight="bold" color={THEME.COLOR.WHITE}>
                세상을 넓게,{'\n'}새로운 시야 브로디
              </Typography>
              <Margin margin={GET_MARGIN('h4')} />
              <Typography size="body_lg" weight="medium" color={THEME.COLOR.WHITE}>
                  반가워요, {nickname} 님!
              </Typography>
          </FlexBox>
          <Margin margin={GET_MARGIN('h5')} />

          {posts.length === 0 && (
            <FlexBox alignItems="center" gap={GET_MARGIN('h6') * 2} styles={{ paddingHorizontal: GET_PADDING('P4'), paddingVertical: GET_PADDING('P5') }}>
              <Typography size="body_xl" weight="extraBold" color="black">
                오늘의 의뢰
              </Typography>
              <Typography size="body_md" weight="regular" color="black">
                총 0개
              </Typography>
            </FlexBox>
          )}
          <Margin margin={GET_MARGIN('h3')} />

          <FlexBox alignItems="center" justifyContent='space-between'>
            <Pressable onPress={() => setSelected('해설 가능 의뢰')} style={selected === "해설 가능 의뢰" ? { backgroundColor: '#F2F2F2', width:"50%", paddingVertical: 6, borderRadius: THEME.STYLES.RADIUS.xl } : { width:"50%", paddingVertical: 6, borderRadius: THEME.STYLES.RADIUS.xl}}>
              <Typography size="body_md" weight="regular" color="black" styles={selected === "해설 가능 의뢰" ? { color: THEME.COLOR.MINT_2, fontWeight: "700", textAlign: "center", fontSize: 14 } : { color: 'gray', textAlign: "center", fontSize: 14, fontWeight: "400" }}>
                해설 가능 의뢰
              </Typography>
            </Pressable>
            <Pressable onPress={() => setSelected('완료된 의뢰')} style={selected === "완료된 의뢰" ? { backgroundColor: '#F2F2F2', width:"50%", paddingVertical: 6, borderRadius: THEME.STYLES.RADIUS.xl } : { width:"50%", paddingVertical: 6, borderRadius: THEME.STYLES.RADIUS.xl}}>
              <Typography size="body_md" weight="regular" color="black" styles={selected === "완료된 의뢰" ? { color: THEME.COLOR.MINT_2, fontWeight: "700", textAlign: "center", fontSize: 14 } : { color: 'gray', textAlign: "center", fontSize: 14, fontWeight: "400" }}>
                완료된 의뢰
              </Typography>
            </Pressable>
          </FlexBox>


        </ContentsWrapper>

        <Text>CommentHomeScreen</Text>
      </View>
    </SafeAreaView>
  );
};

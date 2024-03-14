import { getCommentUserPointApi } from '@/axios';
import { MyPageButton } from '@/components/comment/MyPageButton';
import { TopNavigation } from '@/components/comment/TopNavigation';
import ContentsWrapper from '@/components/common/ContentsWrapper';
import FlexBox from '@/components/common/FlexBox';
import Margin from '@/components/common/Margin';
import Typography from '@/components/common/Typography';
import { GET_MARGIN, GET_PADDING } from '@/constants/theme';
import { CommentUserState, authTokenState } from '@/states';
import { useEffect, useState } from 'react';
import { View, SafeAreaView, Image, Pressable, ScrollView } from 'react-native';
import { useRecoilValue } from 'recoil';
import { useTheme } from 'styled-components/native';
import { useCommentNavigation } from '@/hooks';

export const CommentMypageScreen = () => {
  const theme = useTheme();
  const navigation = useCommentNavigation();
  const token = useRecoilValue(authTokenState);
  const userInfo = useRecoilValue(CommentUserState);
  const [userPoint, setUserPoint] = useState(0);

  useEffect(() => {
    getCommentUserPointApi(token)
      .then(res => {
        setUserPoint(res.data.result.totalPoints);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  const onPressNickname = () => {
    navigation.navigate('MyPageNicknameSetting');
  };

  const onPressSeeProfile = () => {
    console.log('profile');
  };

  const onPressPoint = () => {
    console.log('point');
  };

  const onPressRefund = () => {
    navigation.navigate('MyPageRefund');
  };

  const onPressDonate = () => {
    navigation.navigate('MyPageDonation');
  };

  const onPressOneByOneAsk = () => {
    console.log('one by one ask');
  };

  const onPressFAQ = () => {
    console.log('faq');
  };

  const onPressGuide = () => {
    console.log('guide');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <ScrollView style={{ flex: 1 }}>
        <Margin margin={GET_MARGIN('h1')} />
        <ContentsWrapper flex={1}>
          <TopNavigation title="마이페이지" isButton={true} />
          <Margin margin={GET_MARGIN('h3')} />

          <Typography size="body_xl" weight="bold">나의 정보</Typography>
          <Pressable onPress={onPressNickname} style={{ flexDirection: "row", alignItems: "center", gap: 20, marginTop: GET_MARGIN('h5') * 2 }}>
            <Image source={require('../../../assets/images/comment/arrow-right-bg.png')} style={{ width: 74, height: 74, borderRadius: 999 }} />
            <Typography size="body_xl" weight='medium'>{userInfo?.nickname ?? ''} 님</Typography>
          </Pressable>
          <Margin margin={GET_MARGIN('h5') * 2} />
          <Pressable onPress={onPressSeeProfile} style={{ backgroundColor: theme.COLOR.WHITE, height: 44, paddingVertical: GET_PADDING("P5"), borderRadius: theme.STYLES.RADIUS.lg }}>
            <Typography size="body_md" weight="bold" color={theme.COLOR.GRAY_ICON} styles={{ textAlign: "center" }}>프로필 보기</Typography>
          </Pressable>
          <Margin margin={GET_MARGIN('h3') + GET_MARGIN('h6')} />

          <Typography size="body_xl" weight="bold">포인트</Typography>
          <Pressable onPress={onPressPoint} style={{ flexDirection: "column", gap: 8, marginTop: GET_MARGIN('h5') * 2, backgroundColor: theme.COLOR.WHITE, borderRadius: theme.STYLES.RADIUS.lg, padding: GET_PADDING('P3') }}>
            <View style={{ backgroundColor: theme.COLOR.MINT_2, width: 40, height: 26, borderRadius: theme.STYLES.RADIUS.sm, paddingVertical: GET_PADDING('P5') / 4, paddingHorizontal: GET_PADDING('P5') / 2, justifyContent: 'center', alignItems: 'center' }}>
              <Typography size="body_sm" weight='medium' color={theme.COLOR.WHITE}>확정</Typography>
            </View>
            <FlexBox justifyContent='space-between' alignItems='center'>
                <FlexBox direction='column'>
                    <Typography size="body_xl" weight="bold" color={theme.COLOR.GRAY_ICON} styles={{ lineHeight: 28 }}>내 포인트</Typography>
                    <Typography size="body_sm" color={theme.COLOR.GRAY_ICON} styles={{ lineHeight: 20 }}>{year.toString()}. {month.toString()}</Typography>
                </FlexBox>
                <FlexBox alignItems='center' gap={12}>
                  <Typography size="body_xl" weight="bold" color={theme.COLOR.MINT_2}>{userPoint.toString()}p</Typography>
                  <Image source={require('../../../assets/images/comment/arrow-right-bg.png')} style={{ width: 14, height: 14 }} />
                </FlexBox>
            </FlexBox>
          </Pressable>
          <Margin margin={GET_MARGIN('h3')} />

          <FlexBox alignItems='center' justifyContent='space-between'>
            <Pressable onPress={onPressRefund} style={{ justifyContent: "center", backgroundColor: theme.COLOR.MINT, width: "48%", height: 56, borderRadius: theme.STYLES.RADIUS.lg }}>
              <Typography size="body_lg" weight="bold" color={theme.COLOR.MINT_2} styles={{ textAlign: "center" }}>환급하기</Typography>
            </Pressable>
            <Pressable onPress={onPressDonate} style={{ justifyContent: "center", backgroundColor: theme.COLOR.MINT_2, width: "48%", height: 56, borderRadius: theme.STYLES.RADIUS.lg }}>
              <Typography size="body_lg" weight="bold" color={theme.COLOR.WHITE} styles={{ textAlign: "center" }}>기부하기</Typography>
            </Pressable>
          </FlexBox>
          <Margin margin={GET_MARGIN('h3') + GET_MARGIN('h6')} />

          <FlexBox direction="column" gap={16}>
            <MyPageButton image={require('../../../assets/images/comment/one-by-one-ask.png')} title="1 : 1 문의" onPress={onPressOneByOneAsk} />
            <MyPageButton image={require('../../../assets/images/comment/faq.png')} title="자주 묻는 질문" onPress={onPressFAQ} />
            <MyPageButton image={require('../../../assets/images/comment/guide.png')} title="서비스 가이드" onPress={onPressGuide} />
          </FlexBox>
          <Margin margin={GET_MARGIN('h3') + GET_MARGIN('h6')} />
        </ContentsWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

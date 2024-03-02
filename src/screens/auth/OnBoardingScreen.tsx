import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import PageHeader from '@/components/common/PageHeader';
import { GET_MARGIN, THEME } from '@/constants/theme';
import Typography from '@/components/common/Typography';
import Margin from '@/components/common/Margin';
import { useUserState } from '@/providers';
import { useRecoilValue } from 'recoil';
import { useAuthNavigation } from '@/hooks';
import { CommentUserState, SigonganUserState, authTokenState, loginFromState } from '@/states';
import { AUTH_TOKEN_KEY, USER_STATE_KEY, storeData } from '@/library';

export default function OnBoardingScreen() {
  const loginFrom = useRecoilValue(loginFromState);
  const navigation = useAuthNavigation();
  const { setUserState } = useUserState();

  const sigonganUser = useRecoilValue(SigonganUserState);
  const commentUser = useRecoilValue(CommentUserState);

  const authToken = useRecoilValue(authTokenState);

  const nickname = loginFrom === 'Comment' ? commentUser?.nickname || '' : sigonganUser?.nickname || '';

  useEffect(() => {
    if (!authToken) {
      navigation.navigate('IntroScreen');
    }

    setTimeout(() => {
      storeData(AUTH_TOKEN_KEY, authToken);

      if (loginFrom === 'Comment') {
        storeData(USER_STATE_KEY, 'Comment');
        setUserState('Comment');
      } else if (loginFrom === 'Sigongan') {
        storeData(USER_STATE_KEY, 'Sigongan');
        setUserState('Sigongan');
      } else {
        navigation.navigate('IntroScreen');
      }
    }, 1000);
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: GET_MARGIN('layout_md'),
        flex: 1,
        backgroundColor: THEME.COLOR.MINT,
      }}
    >
      <Margin margin={GET_MARGIN('layout_xl')} />
      <Margin margin={GET_MARGIN('layout_xl')} />

      <Typography size="h1" weight="bold" color={THEME.COLOR.WHITE}>
        세상을 넓게
      </Typography>
      <Typography size="h1" weight="bold" color={THEME.COLOR.WHITE}>
        새로운 시야
      </Typography>
      <Typography size="h1" weight="bold" color={THEME.COLOR.WHITE}>
        브로디
      </Typography>
      <Margin margin={GET_MARGIN('layout_xl') + GET_MARGIN('layout_xl')} />
      <Typography size="h3" weight="bold" color={THEME.COLOR.WHITE}>
        환영해요
      </Typography>
      <Typography size="h3" weight="bold" color={THEME.COLOR.WHITE}>
        {nickname}
        님!
      </Typography>
    </View>
  );
}

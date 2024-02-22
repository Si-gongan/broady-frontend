import { View, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import { GET_MARGIN, THEME } from '@/constants/theme';
import Typography from '@/components/common/Typography';
import Margin from '@/components/common/Margin';
import { useUserState } from '@/providers';
import { useRecoilValue } from 'recoil';
import { useAuthNavigation } from '@/hooks';
import { loginFromState } from '@/states';
import { USER_STATE_KEY, storeData } from '@/library';

export default function OnBoardingScreen() {
  const loginFrom = useRecoilValue(loginFromState);
  const navigation = useAuthNavigation();
  const { setUserState } = useUserState();

  const authToken = useRecoilValue(authTokenState);

  useEffect(() => {
    setTimeout(() => {
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: THEME.COLOR.BACKGROUND_ORANGE,
      }}
    >
      <View
        style={{
          paddingHorizontal: GET_MARGIN('layout_md'),
        }}
      >
        {/* <PageHeader title="브로디" /> */}
        <Margin margin={GET_MARGIN('layout_xl')} />
        <Typography size="h1" weight="bold" color={THEME.COLOR.ORANGE}>
          세상을 넓게
        </Typography>
        <Typography size="h1" weight="bold" color={THEME.COLOR.ORANGE}>
          새로운 시야
        </Typography>
        <Typography size="h1" weight="bold" color={THEME.COLOR.ORANGE}>
          브로디
        </Typography>
        <Margin margin={GET_MARGIN('layout_xl') + GET_MARGIN('layout_xl')} />
        <Typography size="h3" weight="bold" color={THEME.COLOR.ORANGE}>
          환영해요
        </Typography>
        <Typography size="h3" weight="bold" color={THEME.COLOR.ORANGE}>
          홍길동님!
        </Typography>
      </View>
    </SafeAreaView>
  );
}

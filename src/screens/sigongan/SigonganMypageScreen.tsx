import FlexBox from '@/components/common/FlexBox';
import Icons from '@/components/common/Icons';
import PageHeader from '@/components/common/PageHeader';
import Typography from '@/components/common/Typography';
import { useAuthNavigation, useSigonganNavigation } from '@/hooks';
import { useUserState } from '@/providers';
import { SigonganUserState } from '@/states';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, Pressable, Switch } from 'react-native';
import { useRecoilValue } from 'recoil';
import styled, { useTheme } from 'styled-components/native';

const Section = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACING.MARGIN.h4 + 5 + 'px'};
`;

const SectionTitle = ({ title }: { title: string }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        paddingLeft: theme.SPACING.PADDING.P4,
      }}
    >
      <Typography size="body_xl" weight="bold">
        {title}
      </Typography>
    </View>
  );
};

const SectionContent = styled.View`
  padding-left: ${({ theme }) => theme.SPACING.PADDING.P4 + 'px'};
  padding-right: ${({ theme }) => theme.SPACING.PADDING.P4 + 'px'};
  background-color: ${({ theme }) => theme.COLOR.WHITE};
`;

const MenuBox = styled.View`
  padding-top: ${({ theme }) => theme.SPACING.PADDING.P2 + 'px'};
  padding-bottom: ${({ theme }) => theme.SPACING.PADDING.P2 + 'px'};
  border-bottom-width: 0.2px;
  border-color: ${({ theme }) => theme.COLOR.GRAY_500};
`;

const NavigationItem = ({
  title,
  onPress,
  isShowArrow = true,
}: {
  title: string;
  onPress?: () => void;
  isShowArrow?: boolean;
}) => {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress}>
      <MenuBox>
        <FlexBox justifyContent="space-between">
          <Typography size="body_lg" color={theme.COLOR.FONT.SUB_CONTENTDIM} weight="bold">
            {title}
          </Typography>
          {isShowArrow && <Icons type="material" name="chevron-right" size={24} color="black" />}
        </FlexBox>
      </MenuBox>
    </Pressable>
  );
};

export const SigonganMypageScreen = () => {
  const theme = useTheme();

  const userInfo = useRecoilValue(SigonganUserState);
  const { logout } = useUserState();

  const sigonganNavigation = useSigonganNavigation();

  const nickname = userInfo?.nickname || '';

  const onPressChangeNickname = () => {
    sigonganNavigation.navigate('nickname');
  };

  const onPressLogout = () => {
    logout();
  };

  const onPressFrequentlyAskedQuestions = () => {
    sigonganNavigation.navigate('Faq');
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.COLOR.BACKGROUND_2 }}>
      <PageHeader headerLeftShown={false} title="마이페이지" />
      <ScrollView>
        <FlexBox direction="column" gap={theme.SPACING.MARGIN.h2}>
          <Section>
            <SectionTitle title={`${nickname}님 안녕하세요!`} />
            <SectionContent>
              <NavigationItem title="닉네임 설정" onPress={onPressChangeNickname} />
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle title="앱 설정" />
            <SectionContent>
              <MenuBox>
                <FlexBox alignItems="center" justifyContent="space-between">
                  <FlexBox direction="column" justifyContent="space-between" gap={theme.SPACING.MARGIN.h6}>
                    <Typography size="body_lg" weight="medium">
                      알림 설정
                    </Typography>
                    <Typography size="body_sm" color={theme.COLOR.GRAY_500}>
                      알림을 설정하고 관리합니다.
                    </Typography>
                  </FlexBox>
                  <Switch></Switch>
                </FlexBox>
              </MenuBox>
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle title="고객 지원" />
            <SectionContent>
              <NavigationItem title="1:1 문의" onPress={() => {}} />
              <NavigationItem title="사용설명서" onPress={() => {}} />
              <NavigationItem title="자주 묻는 질문" onPress={onPressFrequentlyAskedQuestions} />
              <NavigationItem title="개인정보 처리방침" onPress={() => {}} />
              <NavigationItem title="서비스 이용 약관" onPress={() => {}} />
            </SectionContent>
          </Section>
          <Section>
            <SectionContent>
              <NavigationItem isShowArrow={false} title="로그아웃" onPress={onPressLogout} />
              <NavigationItem isShowArrow={false} title="회원 탈퇴" onPress={() => {}} />
            </SectionContent>
          </Section>
        </FlexBox>
      </ScrollView>
    </View>
  );
};

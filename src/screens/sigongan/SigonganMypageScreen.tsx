import { changeAlarmStatusApi, resignUserApi } from '@/axios';
import CenteredModal from '@/components/common/CenteredModal';
import { CenteredContentsWrapper } from '@/components/common/ContentsWrapper';
import Divider from '@/components/common/Divider';
import FlexBox from '@/components/common/FlexBox';
import Icons from '@/components/common/Icons';
import Margin from '@/components/common/Margin';
import PageHeader from '@/components/common/PageHeader';
import Typography from '@/components/common/Typography';
import { GET_MARGIN } from '@/constants/theme';
import { useAuthNavigation, useSigonganNavigation } from '@/hooks';
import { useModal } from '@/hooks/useModal';
import { logError } from '@/library/axios';
import { useUserState } from '@/providers';
import { SigonganUserState, authTokenState } from '@/states';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, Pressable, Switch, SwitchChangeEvent } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
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
          {isShowArrow && (
            <Icons
              accessible={false}
              noAccessiblityLabel
              type="material"
              name="chevron-right"
              size={24}
              color="black"
            />
          )}
        </FlexBox>
      </MenuBox>
    </Pressable>
  );
};

const ModalBtn = styled.Pressable`
  flex: 1;
  padding-top: ${({ theme }) => theme.SPACING.PADDING.P3 + 5 + 'px'};
  padding-bottom: ${({ theme }) => theme.SPACING.PADDING.P3 + 5 + 'px'};
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-width: 0.2px;
`;

export const SigonganMypageScreen = () => {
  const theme = useTheme();

  const [userInfo, setUserInfo] = useRecoilState(SigonganUserState);
  const { logout } = useUserState();

  const sigonganNavigation = useSigonganNavigation();
  const token = useRecoilValue(authTokenState);

  const nickname = userInfo?.nickname || '';

  const onPressChangeNickname = () => {
    sigonganNavigation.navigate('MyPageNickname');
  };

  const switchValue = userInfo?.isAcceptNotification;

  const onChangeSwitch = async (event: SwitchChangeEvent) => {
    if (userInfo === null || !token) return;

    const changeToValue = event.nativeEvent.value;

    try {
      await changeAlarmStatusApi(changeToValue, token);

      setUserInfo({
        ...userInfo,
        isAcceptNotification: changeToValue,
      });
    } catch (e) {
      logError(e);
    }
  };

  const { isModalVisible: isLogoutModalVisible, setIsModalVisible: setIsLogoutModalVisible } = useModal();
  const { isModalVisible: isWithdrawalModalVisible, setIsModalVisible: setIsWithdrawalModalVisible } = useModal();

  const onPressLogout = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogout = () => {
    setIsLogoutModalVisible(false);
    logout();
  };

  const onPressWithdrawal = () => {
    setIsWithdrawalModalVisible(true);
  };

  const handleWithdrawal = async () => {
    setIsWithdrawalModalVisible(false);

    try {
      await resignUserApi(token);

      logout();
    } catch (e) {
      logError(e);
    }
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
                  <FlexBox
                    direction="column"
                    justifyContent="space-between"
                    gap={theme.SPACING.MARGIN.h6}
                    accessible={true}
                  >
                    <Typography size="body_lg" weight="medium">
                      알림 설정
                    </Typography>
                    <Typography size="body_sm" color={theme.COLOR.GRAY_500}>
                      알림을 설정하고 관리합니다.
                    </Typography>
                  </FlexBox>
                  <Switch
                    value={switchValue}
                    onChange={onChangeSwitch}
                    accessible
                    accessibilityLabel="알림 설정 스위치. 알림 설정을 변경하려면 더블 탭하세요."
                  ></Switch>
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
              <NavigationItem isShowArrow={false} title="회원 탈퇴" onPress={onPressWithdrawal} />
            </SectionContent>
          </Section>
        </FlexBox>
      </ScrollView>
      <CenteredModal noPadding isVisible={isLogoutModalVisible} closeModal={() => setIsLogoutModalVisible(false)}>
        <CenteredContentsWrapper>
          <Margin margin={GET_MARGIN('h1')} />
          <Typography size="body_xl" weight="bold">
            브로디
          </Typography>
          <Margin margin={GET_MARGIN('h3')} />
          <Typography size="body_lg" weight="light">
            로그아웃 하시겠습니까?
          </Typography>
          <Margin margin={GET_MARGIN('h2')} />
        </CenteredContentsWrapper>
        <FlexBox>
          <ModalBtn onPress={handleLogout}>
            <Typography size="body_xl" weight="regular">
              로그아웃하기
            </Typography>
          </ModalBtn>
          <Divider width={1} color={theme.COLOR.GRAY_500} direction="vertical" />
          <ModalBtn onPress={() => setIsLogoutModalVisible(false)}>
            <Typography size="body_xl" weight="regular">
              취소
            </Typography>
          </ModalBtn>
        </FlexBox>
      </CenteredModal>
      <CenteredModal
        noPadding
        isVisible={isWithdrawalModalVisible}
        closeModal={() => setIsWithdrawalModalVisible(false)}
      >
        <CenteredContentsWrapper>
          <Margin margin={GET_MARGIN('h1')} />
          <Typography size="body_xl" weight="bold">
            브로디
          </Typography>
          <Margin margin={GET_MARGIN('h3')} />
          <CenteredContentsWrapper>
            <Typography size="body_lg" weight="light">
              회원 탈퇴 하시겠습니까?
            </Typography>
            <Typography size="body_lg" weight="light">
              탈퇴 후에는 질문 내용을 보실 수 없어요.
            </Typography>
          </CenteredContentsWrapper>
          <Margin margin={GET_MARGIN('h2')} />
        </CenteredContentsWrapper>
        <FlexBox>
          <ModalBtn onPress={handleWithdrawal}>
            <Typography size="body_xl" weight="regular">
              탈퇴하기
            </Typography>
          </ModalBtn>
          <Divider width={1} color={theme.COLOR.GRAY_500} direction="vertical" />
          <ModalBtn onPress={() => setIsWithdrawalModalVisible(false)}>
            <Typography size="body_xl" weight="regular">
              취소
            </Typography>
          </ModalBtn>
        </FlexBox>
      </CenteredModal>
    </View>
  );
};

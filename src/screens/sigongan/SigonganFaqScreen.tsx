import { View, Text, ScrollView, Pressable } from 'react-native';
import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import ContentsWrapper, { CenteredContentsWrapper } from '@/components/common/ContentsWrapper';
import Typography from '@/components/common/Typography';
import styled, { useTheme } from 'styled-components/native';
import FlexBox from '@/components/common/FlexBox';
import { GET_MARGIN } from '@/constants/theme';
import Margin from '@/components/common/Margin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type MenuItemType = '앱이용' | '질문/답변' | '기타';

const FaqData: {
  title: string;
  description: string;
  type: MenuItemType;
}[] = [
  {
    title: '봄자국 서비스를 어떻게 이용하나요?',
    description:
      '봄자국은 궁금한 사진을 물어보면 AI와 사람 해설자가 답변을 제공하는 서비스이에요. 홈 화면의 해설자에게 질문하기 버튼을 눌러 구체적인 맞춤형 해설을, AI 해설 화면을 통해 빠른 해설을 받을 수 있어요.',
    type: '앱이용',
  },
  {
    title: '사람 해설자와 AI 해설의 차이가 무엇인가요?',
    description:
      '사람이 제공하는 해설은 기본적으로 AI보다 정교하고 정확합니다. 또한 추가적인 요청사항이 있을 경우 그에 맞추어서 전문적인 해설을 제공해드릴 수 있어요.',
    type: '앱이용',
  },
  {
    title: '해설이 도착하면 푸시 알림을 받고 싶어요.',
    description:
      '해설이 도착했을 때 알림을 받고 싶으시다면, 마이페이지의 알림 설정 버튼을 눌러주세요. AI와 사람 해설자의 해설 모두 알림을 받으실 수 있습니다.',
    type: '앱이용',
  },
  {
    title: '해설이 도착하면 푸시 알림을 받고 싶어요.',
    description:
      '해설이 도착했을 때 알림을 받고 싶으시다면, 마이페이지의 알림 설정 버튼을 눌러주세요. AI와 사람 해설자의 해설 모두 알림을 받으실 수 있습니다.',
    type: '앱이용',
  },
  {
    title: '해설이 도착하면 푸시 알림을 받고 싶어요.',
    description:
      '해설이 도착했을 때 알림을 받고 싶으시다면, 마이페이지의 알림 설정 버튼을 눌러주세요. AI와 사람 해설자의 해설 모두 알림을 받으실 수 있습니다.',
    type: '앱이용',
  },
];

const MenuData: {
  type: MenuItemType;
}[] = [
  {
    type: '앱이용',
  },
  {
    type: '질문/답변',
  },
  {
    type: '기타',
  },
];

const MenuList = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.SPACING.MARGIN.h4}px;
`;

const MenuItemBox = styled.Pressable<{ selected: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${({ theme }) => theme.SPACING.PADDING.P5}px;
  border-radius: 50px;
  background-color: ${({ theme, selected }) => (selected ? theme.COLOR.GRAY_50 : theme.COLOR.WHITE)};
`;

const MenuItem = ({ type, onPress, isSelected }: { type: MenuItemType; isSelected: boolean; onPress?: () => void }) => {
  const theme = useTheme();

  const textColor = isSelected ? theme.COLOR.MINT_2 : theme.COLOR.GRAY_500;
  return (
    <MenuItemBox
      selected={isSelected}
      onPress={onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={type}
      accessibilityState={{ selected: isSelected }}
    >
      <Typography size="body_md" weight="bold" color={textColor}>
        {type}
      </Typography>
    </MenuItemBox>
  );
};

const FaqBox = styled.View`
  padding: 20px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLOR.BD_5};
  border-radius: ${({ theme }) => theme.STYLES.RADIUS.md}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACING.MARGIN.h4}px;
`;

const FaqItem = ({ title, description }: { title: string; description: string }) => {
  const theme = useTheme();
  return (
    <FaqBox accessible>
      <Typography size="body_xl" weight="bold" accessiblityLabel={`제목 ${title}`}>
        {title}
      </Typography>
      <Typography color={theme.COLOR.GRAY_500} accessiblityLabel={`내용 ${description}`}>
        {description}
      </Typography>
    </FaqBox>
  );
};

export default function SigonganFaqScreen() {
  const theme = useTheme();

  const [selectedMenu, setSelectedMenu] = React.useState<MenuItemType>('앱이용');

  const { bottom } = useSafeAreaInsets();

  const filteredFaq = FaqData.filter((item) => item.type === selectedMenu);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <PageHeader title="자주 묻는 질문" />

      <ContentsWrapper flex={1}>
        <CenteredContentsWrapper>
          <Typography size="body_lg" color={theme.COLOR.GRAY_700}>
            질문을 터치해 답을 확인해보세요.
          </Typography>
          <Margin margin={GET_MARGIN('h3')} />
        </CenteredContentsWrapper>
        <MenuList>
          {MenuData.map((menu, index) => (
            <MenuItem
              key={index}
              type={menu.type}
              isSelected={selectedMenu === menu.type}
              onPress={() => setSelectedMenu(menu.type)}
            />
          ))}
        </MenuList>
        <Margin margin={GET_MARGIN('h1')} />
        <ScrollView>
          <FlexBox direction="column" gap={GET_MARGIN('h3')}>
            {filteredFaq.length === 0 ? (
              <CenteredContentsWrapper>
                <Typography size="body_lg" color={theme.COLOR.GRAY_700}>
                  해당 카테고리에 대한 질문이 없습니다.
                </Typography>
              </CenteredContentsWrapper>
            ) : (
              filteredFaq.map((faq, index) => <FaqItem key={index} title={faq.title} description={faq.description} />)
            )}
          </FlexBox>
        </ScrollView>
        <Margin margin={bottom} />
      </ContentsWrapper>
    </View>
  );
}

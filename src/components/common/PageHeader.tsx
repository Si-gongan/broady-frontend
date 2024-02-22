import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icons from './Icons';
import styled, { useTheme } from 'styled-components/native';
import { GET_MARGIN } from '@/constants/theme';
import Typography from './Typography';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View<{ notchTop: number }>`
  padding: ${(props) => props.notchTop + GET_MARGIN('h4')}px ${GET_MARGIN('h3')}px ${GET_MARGIN('h4')}px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: 'red';
`;

const Blank = styled.View`
  width: 35px;
  height: 35px;
`;

const PageHeader = ({
  headerLeftShown = true,
  headerRight,
  title,
}: {
  headerLeftShown?: boolean;
  headerRight?: React.ReactNode;
  title?: string;
}) => {
  const { top: NOTCH_TOP } = useSafeAreaInsets();
  const theme = useTheme();
  const navigation = useNavigation();

  const headerLeftColor = theme.COLOR.GRAY_ICON;

  const HeaderLeft = () => (
    <Icons
      type="feather"
      name="chevron-left"
      size={35}
      color={headerLeftColor}
      onPress={() => {
        console.log('navigation.goBack()');
        navigation.goBack();
      }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    />
  );

  return (
    <Container notchTop={NOTCH_TOP}>
      {headerLeftShown ? <HeaderLeft /> : <Blank />}
      {title && (
        <Typography size="body_xl" weight="regular">
          {title}
        </Typography>
      )}
      {headerRight ? headerRight : <Blank />}
    </Container>
  );
};

export default PageHeader;

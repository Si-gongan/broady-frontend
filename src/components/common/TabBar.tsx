import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';
import Icons, { IconType } from './Icons';

function TabBar({ children }: { children: React.ReactNode }) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: bottom, marginHorizontal: 20 }}>
      {children}
    </View>
  );
}

const TabItemBox = styled.TouchableOpacity`
  /* background-color: red; */
  flex: 1;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  padding: 10px 0 15px;
`;

const TabBarText = styled(Text)<{ active?: boolean }>`
  color: ${({ active, theme }) => (active ? theme.COLOR.FONT.CONTENT : theme.COLOR.FONT.CONTENTDIM)};
`;

function TabBarItem({
  isActive,
  onPress,
  iconName,
  iconType,
  text,
}: {
  onPress?: () => void;
  iconName: string;
  iconType: IconType;
  text: string;
  isActive?: boolean;
}) {
  const theme = useTheme();

  const color = isActive ? theme.COLOR.FONT.CONTENT : theme.COLOR.FONT.CONTENTDIM;

  return (
    <TabItemBox onPress={onPress}>
      <Icons name={iconName} size={24} type={iconType} color={color} />
      <TabBarText>{text}</TabBarText>
    </TabItemBox>
  );
}

TabBar.Item = TabBarItem;

export default TabBar;

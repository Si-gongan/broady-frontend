import { View, StyleSheet } from 'react-native';

const TABBAR_NAME = ['홈', 'AI 해설', '마이페이지'] as const;

type Indices<T extends readonly string[]> = Exclude<Partial<T>['length'], T['length']>;

type ITabBarProps = {
  index: Indices<typeof TABBAR_NAME>;
};

export const TabBar = ({ index }: ITabBarProps) => {
  return <View></View>;
};

const styles = StyleSheet.create({
  container: {
    height: 70,
  },
});

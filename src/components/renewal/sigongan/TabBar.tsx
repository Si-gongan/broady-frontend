import { View, StyleSheet, Text, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors, Fonts, Utils } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { SigonganMainTabParamList } from '../../../navigations';

// setting
const TABBAR_NAME = ['홈', 'AI 해설', '마이페이지'] as const;
const TABBAR_ICON_PATH: FixedLengthArray<string, (typeof TABBAR_NAME)['length']> = [
  'M6.875 24.375H11.5625V16.5625H18.4375V24.375H23.125V12.1875L15 6.09375L6.875 12.1875V24.375ZM5 26.25V11.25L15 3.75L25 11.25V26.25H16.5625V18.4375H13.4375V26.25H5Z',
  'M8.78125 22.5C8.48958 22.5 8.20312 22.3542 7.92188 22.0625C7.64062 21.7708 7.5 21.4792 7.5 21.1875V18.125H23.125V7.5H26.25C26.5417 7.5 26.8229 7.64583 27.0938 7.9375C27.3646 8.22917 27.5 8.53125 27.5 8.84375V27.4688L22.5312 22.5H8.78125ZM2.5 21.25V3.8125C2.5 3.52083 2.63542 3.22917 2.90625 2.9375C3.17708 2.64583 3.45833 2.5 3.75 2.5H19.9688C20.2812 2.5 20.5729 2.64062 20.8438 2.92188C21.1146 3.20312 21.25 3.5 21.25 3.8125V14.9375C21.25 15.2292 21.1146 15.5208 20.8438 15.8125C20.5729 16.1042 20.2812 16.25 19.9688 16.25H7.5L2.5 21.25ZM19.375 14.375V4.375H4.375V14.375H19.375Z',
  'M15 14.9687C13.625 14.9687 12.5 14.5312 11.625 13.6562C10.75 12.7812 10.3125 11.6562 10.3125 10.2812C10.3125 8.90625 10.75 7.78125 11.625 6.90625C12.5 6.03125 13.625 5.59375 15 5.59375C16.375 5.59375 17.5 6.03125 18.375 6.90625C19.25 7.78125 19.6875 8.90625 19.6875 10.2812C19.6875 11.6562 19.25 12.7812 18.375 13.6562C17.5 14.5312 16.375 14.9687 15 14.9687ZM5 25V22.0625C5 21.2708 5.19792 20.5937 5.59375 20.0312C5.98958 19.4687 6.5 19.0417 7.125 18.75C8.52083 18.125 9.85938 17.6562 11.1406 17.3437C12.4219 17.0312 13.7083 16.875 15 16.875C16.2917 16.875 17.5729 17.0365 18.8438 17.3594C20.1146 17.6823 21.4471 18.1479 22.8413 18.7561C23.4934 19.0504 24.0162 19.4771 24.4097 20.0362C24.8032 20.5954 25 21.2708 25 22.0625V25H5ZM6.875 23.125H23.125V22.0625C23.125 21.7292 23.026 21.4115 22.8281 21.1094C22.6302 20.8073 22.3854 20.5833 22.0938 20.4375C20.7604 19.7917 19.5417 19.349 18.4375 19.1094C17.3333 18.8698 16.1875 18.75 15 18.75C13.8125 18.75 12.6562 18.8698 11.5312 19.1094C10.4062 19.349 9.1875 19.7917 7.875 20.4375C7.58333 20.5833 7.34375 20.8073 7.15625 21.1094C6.96875 21.4115 6.875 21.7292 6.875 22.0625V23.125ZM15 13.0937C15.8125 13.0937 16.4844 12.8281 17.0156 12.2969C17.5469 11.7656 17.8125 11.0937 17.8125 10.2812C17.8125 9.46875 17.5469 8.79687 17.0156 8.26562C16.4844 7.73437 15.8125 7.46875 15 7.46875C14.1875 7.46875 13.5156 7.73437 12.9844 8.26562C12.4531 8.79687 12.1875 9.46875 12.1875 10.2812C12.1875 11.0937 12.4531 11.7656 12.9844 12.2969C13.5156 12.8281 14.1875 13.0937 15 13.0937Z',
];

const Color = {
  selected: Colors.Red.Lighten200,
  unSelected: Colors.Font.secondary,
};

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift';
type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> = Pick<
  TObj,
  Exclude<keyof TObj, ArrayLengthMutationKeys>
> & {
  readonly length: L;
  [I: number]: T;
  [Symbol.iterator]: () => IterableIterator<T>;
};
type Indices<T extends readonly string[]> = Exclude<Partial<T>['length'], T['length']>;

type ITabBarProps = {
  currentIndex: Indices<typeof TABBAR_NAME>;
};

export const TabBar = ({ currentIndex }: ITabBarProps) => {
  const navigation = useNavigation<BottomTabNavigationProp<SigonganMainTabParamList>>();

  return (
    <View style={styles.container}>
      {TABBAR_NAME.map((name, i) => (
        <Pressable key={i} style={styles.item} onPress={() => navigation.navigate(name)}>
          <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
            <Path d={TABBAR_ICON_PATH[i]} fill={currentIndex === i ? Color.selected : Color.unSelected} />
          </Svg>

          <Text style={[Fonts.Regular12, Utils.fontColor(currentIndex === i ? Color.selected : Color.unSelected)]}>
            {name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 5,

    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    width: 70,
    alignItems: 'center',
  },
});

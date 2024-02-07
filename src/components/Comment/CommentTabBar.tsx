import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors, Fonts, Utils } from '../renewal';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// setting
const TABBAR_NAME = ['홈', 'MY 의뢰', '마이페이지'];
const TABBAR_ICON_PATH = [
  'M6.875 24.375H11.5625V16.5625H18.4375V24.375H23.125V12.1875L15 6.09375L6.875 12.1875V24.375ZM5 26.25V11.25L15 3.75L25 11.25V26.25H16.5625V18.4375H13.4375V26.25H5Z',
  'M10 21.25C10.3542 21.25 10.651 21.1302 10.8906 20.8906C11.1302 20.651 11.25 20.3542 11.25 20C11.25 19.6458 11.1302 19.349 10.8906 19.1094C10.651 18.8698 10.3542 18.75 10 18.75C9.64583 18.75 9.34896 18.8698 9.10938 19.1094C8.86979 19.349 8.75 19.6458 8.75 20C8.75 20.3542 8.86979 20.651 9.10938 20.8906C9.34896 21.1302 9.64583 21.25 10 21.25ZM10 16.25C10.3542 16.25 10.651 16.1302 10.8906 15.8906C11.1302 15.651 11.25 15.3542 11.25 15C11.25 14.6458 11.1302 14.349 10.8906 14.1094C10.651 13.8698 10.3542 13.75 10 13.75C9.64583 13.75 9.34896 13.8698 9.10938 14.1094C8.86979 14.349 8.75 14.6458 8.75 15C8.75 15.3542 8.86979 15.651 9.10938 15.8906C9.34896 16.1302 9.64583 16.25 10 16.25ZM10 11.25C10.3542 11.25 10.651 11.1302 10.8906 10.8906C11.1302 10.651 11.25 10.3542 11.25 10C11.25 9.64583 11.1302 9.34896 10.8906 9.10938C10.651 8.86979 10.3542 8.75 10 8.75C9.64583 8.75 9.34896 8.86979 9.10938 9.10938C8.86979 9.34896 8.75 9.64583 8.75 10C8.75 10.3542 8.86979 10.651 9.10938 10.8906C9.34896 11.1302 9.64583 11.25 10 11.25ZM13.75 21.25H21.25V18.75H13.75V21.25ZM13.75 16.25H21.25V13.75H13.75V16.25ZM13.75 11.25H21.25V8.75H13.75V11.25ZM6.25 26.25C5.5625 26.25 4.97396 26.0052 4.48438 25.5156C3.99479 25.026 3.75 24.4375 3.75 23.75V6.25C3.75 5.5625 3.99479 4.97396 4.48438 4.48438C4.97396 3.99479 5.5625 3.75 6.25 3.75H23.75C24.4375 3.75 25.026 3.99479 25.5156 4.48438C26.0052 4.97396 26.25 5.5625 26.25 6.25V23.75C26.25 24.4375 26.0052 25.026 25.5156 25.5156C25.026 26.0052 24.4375 26.25 23.75 26.25H6.25ZM6.25 23.75H23.75V6.25H6.25V23.75Z',
  'M15 14.9687C13.625 14.9687 12.5 14.5312 11.625 13.6562C10.75 12.7812 10.3125 11.6562 10.3125 10.2812C10.3125 8.90625 10.75 7.78125 11.625 6.90625C12.5 6.03125 13.625 5.59375 15 5.59375C16.375 5.59375 17.5 6.03125 18.375 6.90625C19.25 7.78125 19.6875 8.90625 19.6875 10.2812C19.6875 11.6562 19.25 12.7812 18.375 13.6562C17.5 14.5312 16.375 14.9687 15 14.9687ZM5 25V22.0625C5 21.2708 5.19792 20.5937 5.59375 20.0312C5.98958 19.4687 6.5 19.0417 7.125 18.75C8.52083 18.125 9.85938 17.6562 11.1406 17.3437C12.4219 17.0312 13.7083 16.875 15 16.875C16.2917 16.875 17.5729 17.0365 18.8438 17.3594C20.1146 17.6823 21.4471 18.1479 22.8413 18.7561C23.4934 19.0504 24.0162 19.4771 24.4097 20.0362C24.8032 20.5954 25 21.2708 25 22.0625V25H5ZM6.875 23.125H23.125V22.0625C23.125 21.7292 23.026 21.4115 22.8281 21.1094C22.6302 20.8073 22.3854 20.5833 22.0938 20.4375C20.7604 19.7917 19.5417 19.349 18.4375 19.1094C17.3333 18.8698 16.1875 18.75 15 18.75C13.8125 18.75 12.6562 18.8698 11.5312 19.1094C10.4062 19.349 9.1875 19.7917 7.875 20.4375C7.58333 20.5833 7.34375 20.8073 7.15625 21.1094C6.96875 21.4115 6.875 21.7292 6.875 22.0625V23.125ZM15 13.0937C15.8125 13.0937 16.4844 12.8281 17.0156 12.2969C17.5469 11.7656 17.8125 11.0937 17.8125 10.2812C17.8125 9.46875 17.5469 8.79687 17.0156 8.26562C16.4844 7.73437 15.8125 7.46875 15 7.46875C14.1875 7.46875 13.5156 7.73437 12.9844 8.26562C12.4531 8.79687 12.1875 9.46875 12.1875 10.2812C12.1875 11.0937 12.4531 11.7656 12.9844 12.2969C13.5156 12.8281 14.1875 13.0937 15 13.0937Z',
];

const Color = {
  selected: Colors.Red.Lighten200,
  unSelected: Colors.Font.secondary,
};

type ITabBarProps = {
  currentIndex: number;
};

export const CommentTabBar = ({ currentIndex }: ITabBarProps) => {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom !== 0 ? 0 : 20;

  const navigation = useNavigation<any>();

  return (
    <LinearGradient
      colors={[Colors.None.Lighten400, Colors.Red.Lighten200]}
      style={styles.shadow}
      end={{ x: 0.5, y: 0.2 }}
    >
      <View style={[styles.container, Utils.backgroundColor(Colors.None.Lighten400), { paddingBottom }]}>
        {TABBAR_NAME.map((name, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.8}
            style={styles.item}
            onPress={() => navigation.navigate(name)}
            accessible
            accessibilityLabel={`${name} 화면으로 이동`}
          >
            <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
              <Path d={TABBAR_ICON_PATH[i]} fill={currentIndex === i ? Color.selected : Color.unSelected} />
            </Svg>

            <Text style={[Fonts.Regular12, Utils.fontColor(currentIndex === i ? Color.selected : Color.unSelected)]}>
              {name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  shadow: {
    paddingTop: 5,

    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  container: {
    paddingTop: 20,

    flexDirection: 'row',
    justifyContent: 'space-around',

    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  item: {
    width: 70,
    alignItems: 'center',
  },
});

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, Utils } from '../styles';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';

type IHeaderProps = {
  text: string;
  isBottomBorder?: boolean;

  hideBackButton?: boolean;

  rightIcon?: {
    path: string;
    onPress: () => void;
  };
};

const BACK_ARROW_PATH =
  'M9.21628 15.9374L16.3365 23.0577L15 24.3749L5.625 15L15 5.625L16.3365 6.94228L9.21628 14.0625H24.3749V15.9374H9.21628Z';

export const Header = ({ text, isBottomBorder, hideBackButton, rightIcon }: IHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, isBottomBorder && Utils.borderBottomColor(Colors.Red.Lighten400)]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={[styles.icon, { opacity: hideBackButton ? 0 : 1 }]}
        accessible
        accessibilityLabel="뒤로가기 버튼"
        disabled={hideBackButton}
      >
        <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <Path d={BACK_ARROW_PATH} fill={Colors.Font.secondary} />
        </Svg>
      </TouchableOpacity>

      <Text style={[Fonts.Regular20, Utils.fontColor(Colors.Font.primary)]}>{text}</Text>

      {rightIcon ? (
        <TouchableOpacity activeOpacity={0.8} onPress={() => rightIcon.onPress()} style={styles.icon2_real}>
          <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <Path d={rightIcon.path} fill={Colors.Font.secondary} />
          </Svg>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.icon2_fake} accessible={false}>
          <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <Path d={BACK_ARROW_PATH} fill={Colors.Font.secondary} />
          </Svg>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginLeft: 20,
  },
  icon2_real: {
    marginRight: 20,
  },
  icon2_fake: {
    marginRight: 20,

    opacity: 0,
  },
});

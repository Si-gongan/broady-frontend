import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts, Utils } from '../styles';
import { useNavigation } from '@react-navigation/native';

type IHeaderProps = {
  text: string;
  isBottomBorder?: boolean;

  hideBackButton?: boolean;
};

export const Header = ({ text, isBottomBorder, hideBackButton }: IHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, isBottomBorder && Utils.borderBottomColor(Colors.Red.Lighten400)]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={{ opacity: hideBackButton ? 0 : 1 }}
        accessible
        accessibilityLabel="뒤로가기 버튼"
        disabled={hideBackButton}
      >
        <Ionicons name="arrow-back" style={[styles.icon, Utils.fontColor(Colors.Font.secondary)]} />
      </TouchableOpacity>

      <Text style={[Fonts.Regular20, Utils.fontColor(Colors.Font.primary)]}>{text}</Text>

      <Ionicons name="arrow-back" style={styles.icon2} accessible={false} />
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
    fontSize: 30,
    marginLeft: 20,
  },
  icon2: {
    fontSize: 30,
    marginRight: 20,

    opacity: 0,
  },
});

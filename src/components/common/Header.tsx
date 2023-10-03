import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { commentFont } from '../Comment/styles';
import { Colors } from '../renewal';

interface IHeaderProps {
  isBack: boolean;
  children: string;
  type?: string;
  handleClick?: () => void;
}

const Header = ({ isBack, type, handleClick, children }: IHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {isBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left-thin" style={styles.headerBackIcon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.headerBlank}></View>
      )}
      <Text style={commentFont.HEADLINE}>{children}</Text>
      <View>
        <TouchableOpacity onPress={handleClick}>
          {type === 'home' ? (
            <MaterialCommunityIcons name="bell-outline" style={styles.headerSettingIcon} />
          ) : type === 'comment' ? (
            <MaterialCommunityIcons name="cog" style={styles.headerSettingIcon} />
          ) : (
            <View style={styles.headerBlank}></View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderBottomColor: Colors.Red.Lighten400,
    borderBottomWidth: 1,
  },
  headerBackIcon: {
    fontSize: 40,
  },
  headerSettingIcon: {
    fontSize: 30,
  },
  headerBlank: {
    width: 40,
    height: 40,
  },
});

export default Header;

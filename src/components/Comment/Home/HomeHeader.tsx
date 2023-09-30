import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../renewal';
import { commentFont } from '../styles';

const HomeHeader = ({ navigation }: any) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <MaterialCommunityIcons name="arrow-left-thin" style={styles.headerBackIcon} />
      </TouchableOpacity>
      <Text style={commentFont.HEADLINE}>홈</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Announce')}>
        <MaterialCommunityIcons name="bell-outline" style={styles.headerSettingIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingBottom: 25,
    borderBottomColor: Colors.Red.Lighten400,
    borderBottomWidth: 1,
  },
  headerBackIcon: {
    fontSize: 40,
    marginLeft: 10,
    color: 'white',
  },
  headerSettingIcon: {
    fontSize: 30,
    marginRight: 10,
    fontWeight: '400',
  },
});

export default HomeHeader;

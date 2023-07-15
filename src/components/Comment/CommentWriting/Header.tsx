import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({ navigation }: { navigation: any }) => {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left-thin" style={styles.headerBackIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>해설 작성</Text>
        <View>
          <MaterialCommunityIcons name="arrow-left-thin" style={styles.headerBlank} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
  headerBackIcon: {
    fontSize: 40,
    marginLeft: 5,
  },
  headerBlank: {
    fontSize: 40,
    color: 'white',
    marginRight: 5,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
});

export default Header;

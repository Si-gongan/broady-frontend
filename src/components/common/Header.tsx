import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IHeaderProps {
  navigation?: any;
  setIsMenuVisible?: any;
  children: string;
}

const Header = ({ navigation, setIsMenuVisible, children }: IHeaderProps) => {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left-thin" style={styles.headerBackIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{children}</Text>
        <View>
          {setIsMenuVisible ? (
            <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
              <MaterialCommunityIcons name="dots-vertical" style={styles.headerSettingIcon} />
            </TouchableOpacity>
          ) : (
            <MaterialCommunityIcons name="arrow-left-thin" style={styles.headerBlank} />
          )}
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
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
  },
  headerBackIcon: {
    fontSize: 40,
    marginLeft: 10,
  },
  headerSettingIcon: {
    fontSize: 30,
    marginRight: 10,
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

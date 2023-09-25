import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useUserState } from '../../../providers';
import { SigonganDesign } from '../../sigongan/styles';

const UserDeleteSection = () => {
  const { logout } = useUserState();

  return (
    <View style={[SigonganDesign.myPageGrid, styles.boxContainer]}>
      <TouchableOpacity onPress={logout}>
        <Text style={SigonganDesign.myPageContent}>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text style={styles.deleteUser}>회원 탈퇴</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    paddingVertical: 17,
    paddingHorizontal: 14,
    gap: 18,
  },
  deleteUser: {
    fontSize: 14,
    color: '#D40000',
  },
});

export default UserDeleteSection;

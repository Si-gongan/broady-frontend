import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useUserState } from '../../../providers';
import { commentFont } from '../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { deleteUser } from '../../../api/axios';
import { useRecoilValue } from 'recoil';
import { authTokenState, fcmTokenState } from '../../../states';

import { SigonganDesign } from '../styles';

const UserDeleteSection = () => {
  const { logout } = useUserState();
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const handleDeleteUser = async () => {
    try {
      await deleteUser(fcmToken, authToken);
      logout();
    } catch (err) {
      console.log('DELETE USER API:', err);
    }
  };

  return (
    <View style={[SigonganDesign.myPageGrid, styles.boxContainer]}>
      <TouchableOpacity style={styles.touchContainer} onPress={logout}>
        <Text style={commentFont.BODY1}>로그아웃</Text>
        <MaterialIcons name="arrow-forward-ios" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchContainer} onPress={handleDeleteUser}>
        <Text style={commentFont.BODY1}>회원 탈퇴</Text>
        <MaterialIcons name="arrow-forward-ios" />
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
  touchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteUser: {
    fontSize: 14,
    color: '#D40000',
  },
});

export default UserDeleteSection;

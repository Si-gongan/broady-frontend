import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Refund from '../../components/Comment/Mypage/Refund';
import CustomerService from '../../components/common/CustomerService';
import { SigonganDesign } from '../../components/sigongan/styles';

const MyPageScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Refund navigation={navigation} />
      <CustomerService />
      <View style={[SigonganDesign.myPageGrid, styles.boxContainer]}>
        <Text style={SigonganDesign.myPageContent}>로그아웃</Text>
        <Text style={styles.deleteUser}>회원 탈퇴</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 30,
    gap: 20,
    flex: 1,
  },
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

export default MyPageScreen;

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SigonganDesign } from '../../../components/sigongan/styles';
import { commentFont } from '../styles';

const Refund = ({ navigation, myPoint }: { navigation: any; myPoint: number }) => {
  return (
    <View>
      <Text style={[styles.pointText, commentFont.HEADER]}>내 포인트 {myPoint ? myPoint : '0'}P</Text>
      <View style={[SigonganDesign.myPageGrid, styles.boxContainer]}>
        <TouchableOpacity onPress={() => navigation.navigate('Refund')}>
          <Text style={commentFont.BODY1}>환급 신청</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pointText: {
    marginBottom: 10,
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

export default Refund;

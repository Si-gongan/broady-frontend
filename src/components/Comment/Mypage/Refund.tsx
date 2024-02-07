import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { commentFont } from '../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { SigonganDesign } from '../styles';

const Refund = ({ navigation, myPoint }: { navigation: any; myPoint: number }) => {
  return (
    <View>
      <Text style={[styles.pointText, commentFont.HEADER]}>내 포인트 {myPoint ? myPoint : '0'}P</Text>
      <View style={[SigonganDesign.myPageGrid, styles.boxContainer]}>
        <TouchableOpacity style={styles.touchContainer} onPress={() => navigation.navigate('Refund')}>
          <Text style={commentFont.BODY1}>환급 신청</Text>
          <MaterialIcons name="arrow-forward-ios" />
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

export default Refund;

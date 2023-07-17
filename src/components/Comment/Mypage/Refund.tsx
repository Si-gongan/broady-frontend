import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SigonganDesign } from '../../../components/sigongan/styles';

const Refund = () => {
  return (
    <View style={[SigonganDesign.myPageGrid, styles.boxContainer]}>
      <Text style={SigonganDesign.myPageTitle}>내 포인트 3200P</Text>
      <TouchableOpacity>
        <Text style={SigonganDesign.myPageContent}>환급 신청</Text>
      </TouchableOpacity>
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

export default Refund;

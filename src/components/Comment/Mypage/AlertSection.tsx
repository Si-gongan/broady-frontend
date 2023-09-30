import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SigonganDesign } from '../../sigongan/styles';
import { commentFont } from '../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AlertSection = ({ navigation }: any) => {
  return (
    <View style={[SigonganDesign.myPageGrid, styles.boxContainer]}>
      <Text style={commentFont.SMALL_TITLE}>앱 설정</Text>
      <TouchableOpacity style={styles.touchContainer} onPress={() => navigation.navigate('Alert')}>
        <Text style={commentFont.BODY1}>알림 설정</Text>
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
});

export default AlertSection;

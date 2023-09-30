import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SigonganDesign } from '../../sigongan/styles';
import { commentFont } from '../styles';

const AlertSection = ({ navigation }: any) => {
  return (
    <View style={[SigonganDesign.myPageGrid, styles.boxContainer]}>
      <Text style={commentFont.MYPAGE_TITLE}>앱 설정</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Alert')}>
        <Text style={commentFont.BODY1}>알림 설정</Text>
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
});

export default AlertSection;

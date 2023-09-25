import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SigonganDesign } from '../../sigongan/styles';

const AlertSection = ({ navigation }: any) => {
  return (
    <View style={[SigonganDesign.myPageGrid, styles.boxContainer]}>
      <Text style={SigonganDesign.myPageTitle}>앱 설정</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Alert')}>
        <Text style={SigonganDesign.myPageContent}>알림 설정</Text>
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

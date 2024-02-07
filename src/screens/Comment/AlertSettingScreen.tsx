import { View, StyleSheet, SafeAreaView } from 'react-native';
import AlertExtraQuestion from '../../components/Comment/Mypage/AlertExtraQuestion';
import AlertNewRequest from '../../components/Comment/Mypage/AlertNewRequest';
import { BomHeader, PaddingHorizontal } from '../../components/renewal';

const AlertSettingScreen = () => {
  return (
    <SafeAreaView>
      <BomHeader text="알림 설정" isBottomBorder />

      <View style={styles.bodyContainer}>
        <AlertExtraQuestion />
        <View style={styles.divisionLine} />
        <AlertNewRequest />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    alignItems: 'center',
  },
  divisionLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#E8E8E8',
  },
});

export default AlertSettingScreen;

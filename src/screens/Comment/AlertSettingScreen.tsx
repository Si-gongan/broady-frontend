import { View, StyleSheet } from 'react-native';
import AlertExtraQuestion from '../../components/Comment/Mypage/AlertExtraQuestion';
import AlertNewRequest from '../../components/Comment/Mypage/AlertNewRequest';
import Header from '../../components/common/Header';

const AlertSettingScreen = () => {
  return (
    <View>
      <Header isBack={true}>알림 설정</Header>
      <View style={styles.bodyContainer}>
        <AlertExtraQuestion />
        <View style={styles.divisionLine} />
        <AlertNewRequest />
      </View>
    </View>
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

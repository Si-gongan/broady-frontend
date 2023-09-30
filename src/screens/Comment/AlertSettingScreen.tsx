import { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useRecoilValue } from 'recoil';
import Header from '../../components/common/Header';
import { SigonganDesign } from '../../components/sigongan/styles';
import { authTokenState, fcmTokenState } from '../../states';

const AlertSettingScreen = ({ navigation }: { navigation: any }) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);
  const [isExtraQuestion, setIsExtraQuestion] = useState<boolean>(false);
  const [isNewRequest, setIsNewRequest] = useState<boolean>(false);

  const toggleExtraSwitch = () => {
    setIsExtraQuestion((prev) => !prev);
  };

  const toggleRequestSwitch = () => {
    setIsNewRequest((prev) => !prev);
  };

  return (
    <View>
      <Header navigation={navigation}>알림 설정</Header>
      <View style={styles.bodyContainer}>
        <View style={styles.alertContainer}>
          <View style={styles.toggleContainer}>
            <Text style={SigonganDesign.myPageTitle}>추가 질문 알림</Text>
            <Switch
              trackColor={{ false: '#767676', true: '#AEB8F4' }}
              thumbColor={isExtraQuestion ? '#fff' : '#fff'}
              ios_backgroundColor="#767676"
              onValueChange={toggleExtraSwitch}
              value={isExtraQuestion}
            />
          </View>
          <Text style={SigonganDesign.myPageContent}>
            내가 작성한 해설에 대해, 시각장애인의 추가 질문이 들어올 경우 푸시 알림을 수신합니다.
          </Text>
        </View>
        <View style={styles.alertContainer}>
          <View style={styles.toggleContainer}>
            <Text style={SigonganDesign.myPageTitle}>해설의뢰 알림</Text>
            <Switch
              trackColor={{ false: '#767676', true: '#AEB8F4' }}
              thumbColor={isNewRequest ? '#fff' : '#fff'}
              ios_backgroundColor="#767676"
              onValueChange={toggleRequestSwitch}
              value={isNewRequest}
            />
          </View>
          <Text style={SigonganDesign.myPageContent}>
            시각장애인의 새로운 사진 해설 의뢰가 업로드될 경우, 일정한 간격으로 푸시 알림을 수신합니다.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    alignItems: 'center',
  },
  alertContainer: {
    width: '80%',
    justifyContent: 'center',
    marginVertical: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
});

export default AlertSettingScreen;

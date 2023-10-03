import { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useRecoilValue } from 'recoil';
import { commentFont } from '../../components/Comment/styles';
import Header from '../../components/common/Header';
import { authTokenState, fcmTokenState } from '../../states';

const AlertSettingScreen = () => {
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
      <Header isBack={true}>알림 설정</Header>
      <View style={styles.bodyContainer}>
        <View style={styles.alertContainer}>
          <View style={styles.toggleContainer}>
            <Text style={commentFont.TITLE}>추가 질문 알림</Text>
            <Switch
              trackColor={{ false: '#767676', true: '#AEB8F4' }}
              thumbColor={isExtraQuestion ? '#fff' : '#fff'}
              ios_backgroundColor="#767676"
              onValueChange={toggleExtraSwitch}
              value={isExtraQuestion}
            />
          </View>
          <Text style={[commentFont.SMALL_TITLE, styles.blackText]}>
            내가 작성한 해설에 대해, 시각장애인의 추가 질문이{'\n'}들어올 경우 푸시 알림을 수신합니다.
          </Text>
        </View>
        <View style={styles.divisionLine} />
        <View style={styles.alertContainer}>
          <View style={styles.toggleContainer}>
            <Text style={commentFont.TITLE}>해설의뢰 알림</Text>
            <Switch
              trackColor={{ false: '#767676', true: '#AEB8F4' }}
              thumbColor={isNewRequest ? '#fff' : '#fff'}
              ios_backgroundColor="#767676"
              onValueChange={toggleRequestSwitch}
              value={isNewRequest}
            />
          </View>
          <Text style={[commentFont.SMALL_TITLE, styles.blackText]}>
            시각장애인의 새로운 사진 해설 의뢰가 업로드될 경우,{'\n'}일정한 간격으로 푸시 알림을 수신합니다.
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
    alignItems: 'center',
    paddingBottom: 15,
  },
  blackText: {
    color: 'black',
  },
  divisionLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#E8E8E8',
  },
});

export default AlertSettingScreen;

import { useEffect, useState } from 'react';
import { Alert, View, Text, Switch, StyleSheet, Linking } from 'react-native';
import { useRecoilValue } from 'recoil';
import { ChangeAlarmStatus, GetAlarmStatus } from '../../../api/axios';
import { fcmTokenState } from '../../../states';
import { getNotificationPermissions } from '../../../library';
import { commentFont } from '../styles';
import * as Notifications from 'expo-notifications';

const AlertExtraQuestion = () => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = async () => {
    const newState = !isEnabled;

    if (newState === false) {
      try {
        setIsEnabled(false);
        await ChangeAlarmStatus(false, fcmToken);
      } catch {
        setIsEnabled(true);
      }

      return;
    }

    try {
      setIsEnabled(true);

      const state = await getNotificationPermissions();

      if (state !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('알림', '설정에서 알림을 켜주세요.', [
            {
              text: '확인',
              style: 'default',
              onPress: () => Linking.openSettings(),
            },
          ]);
          throw new Error();
        }
      }

      await ChangeAlarmStatus(true, fcmToken);
    } catch {
      setIsEnabled(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const state = await GetAlarmStatus(fcmToken);
        setIsEnabled(state.data.result.isAccepted);
      } catch {
        setIsEnabled(false);
      }
    })();
  }, []);

  return (
    <View style={styles.alertContainer}>
      <View style={styles.toggleContainer}>
        <Text style={commentFont.TITLE}>추가 질문 알림</Text>
        <Switch
          trackColor={{ false: '#767676', true: '#AEB8F4' }}
          thumbColor={isEnabled ? '#fff' : '#fff'}
          ios_backgroundColor="#767676"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Text style={[commentFont.SMALL_TITLE, styles.blackText]}>
        내가 작성한 해설에 대해, 시각장애인의 추가 질문이{'\n'}들어올 경우 푸시 알림을 수신합니다.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default AlertExtraQuestion;

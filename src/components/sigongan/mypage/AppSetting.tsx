import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Switch, Alert } from 'react-native';
import { SigonganColor, SigonganDesign, SigonganFont } from '../styles';
import { getNotificationPermissions } from '../../common/notifications';
import { ChangeAlarmStatus, GetAlarmStatus } from '../../../api/axios';
import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../../states';

export const AppSetting = () => {
  const fcmToken = useRecoilValue(fcmTokenState);

  const [isEnabled, setIsEnabled] = useState(false);

  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  // const toggleSwitch = () => {
  //   Alert.alert('알림', '알림은 설정에서 바꿔주세요.', [
  //     {
  //       text: '확인',
  //       style: 'default',
  //     },
  //   ]);
  // };
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
        Alert.alert('알림', '설정에서 알림을 켜주세요.', [
          {
            text: '확인',
            style: 'default',
          },
        ]);

        throw Error();
      }

      await ChangeAlarmStatus(true, fcmToken);
    } catch {
      setIsEnabled(false);
    }
  };

  useEffect(() => {
    (async () => {
      // const state = await getNotificationPermissions();
      // setIsEnabled(state === 'granted');

      try {
        const state = await GetAlarmStatus(fcmToken);
        setIsEnabled(state.data.result.isAccepted);
      } catch {
        setIsEnabled(false);
      }
    })();
  }, []);

  return (
    <View style={[SigonganDesign.myPageGrid, styles.appSetting]}>
      <Text style={SigonganDesign.myPageTitle}>앱 설정</Text>

      <View style={styles.rowWrap}>
        <Text nativeID="Switch" style={SigonganDesign.myPageContent}>
          알림 설정
        </Text>

        <Switch
          trackColor={{ false: '#E8E8E8', true: '#000' }}
          thumbColor={isEnabled ? '#fff' : '#fff'}
          ios_backgroundColor="#E8E8E8"
          onValueChange={toggleSwitch}
          value={isEnabled}
          accessible
          accessibilityLabel="알림 설정 스위치 버튼"
          accessibilityLabelledBy="Switch"
          accessibilityState={{ checked: isEnabled }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appSetting: {
    marginTop: 10,

    paddingVertical: 13,
    paddingHorizontal: 14,

    gap: 15,
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

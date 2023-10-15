import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert, Linking, Pressable } from 'react-native';
import { BomSwitch } from '../../common';
import { Utils, Fonts, Colors } from '../../styles';
import { ChangeAlarmStatus, GetAlarmStatus } from '../../../../api/axios';
import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../../../states';
import { getNotificationPermissions } from '../../../common/notifications';

export const AlarmSetting = () => {
  const fcmToken = useRecoilValue(fcmTokenState);

  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    (async () => {
      // const state = await getNotificationPermissions();
      // setIsEnabled(state === 'granted');

      try {
        const state = await GetAlarmStatus(fcmToken);
        setChecked(state.data.result.isAccepted);
      } catch {
        setChecked(false);
      }
    })();
  }, []);

  const toggleSwitch = async () => {
    const newState = !isChecked;

    if (newState === false) {
      try {
        setChecked(false);
        await ChangeAlarmStatus(false, fcmToken);
      } catch {
        setChecked(true);
      }

      return;
    }

    try {
      setChecked(true);

      const state = await getNotificationPermissions();

      if (state !== 'granted') {
        Alert.alert('알림', '설정에서 알림을 켜주세요.', [
          {
            text: '확인',
            style: 'default',
            onPress: () => Linking.openSettings(),
          },
        ]);

        throw Error();
      }

      await ChangeAlarmStatus(true, fcmToken);
    } catch {
      setChecked(false);
    }
  };

  return (
    <View style={[styles.borderWrapper, Utils.borderColor(Colors.Red.Lighten300)]}>
      <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Red.Lighten100)]}>앱 설정</Text>

      <Pressable
        style={[styles.rowWrapper, { marginTop: 10 }]}
        accessible
        accessibilityLabel="알림 설정 토글"
        accessibilityValue={{ text: isChecked ? '켜짐' : '꺼짐' }}
        onPress={toggleSwitch}
      >
        <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>알림 설정</Text>

        <BomSwitch value={isChecked} onChangeValue={toggleSwitch} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  borderWrapper: {
    borderRadius: 12,

    padding: 20,
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
});

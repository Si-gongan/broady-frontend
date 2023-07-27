import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Switch, Alert } from 'react-native';
import { SigonganColor, SigonganDesign, SigonganFont } from '../styles';
import { getNotificationPermissions } from '../../common/notifications';

export const AppSetting = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleSwitch = () => {
    Alert.alert('알림', '알림은 설정에서 바꿔주세요.', [
      {
        text: '확인',
        style: 'default',
      },
    ]);
  };

  useEffect(() => {
    (async () => {
      const state = await getNotificationPermissions();
      setIsEnabled(state === 'granted');
    })();
  }, []);

  return (
    <View style={[SigonganDesign.myPageGrid, styles.appSetting]}>
      <Text style={SigonganDesign.myPageTitle}>앱 설정</Text>

      <View style={styles.rowWrap}>
        <Text style={SigonganDesign.myPageContent}>알림 설정</Text>

        <Switch
          trackColor={{ false: '#E8E8E8', true: '#000' }}
          thumbColor={isEnabled ? '#fff' : '#fff'}
          ios_backgroundColor="#E8E8E8"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appSetting: {
    marginTop: 40,

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

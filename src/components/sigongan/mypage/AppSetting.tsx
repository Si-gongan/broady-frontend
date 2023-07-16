import { useState } from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import { SigonganColor, SigonganDesign, SigonganFont } from '../styles';

export const AppSetting = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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

import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SigonganColor, SigonganFont, SigonganShadow } from '../styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { AddThanks, IReqeustListItem } from '../../../api/axios';
import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../../states';

type ThanksBoxProps = {
  item: IReqeustListItem;
  refresh: () => void;
};

export const ThanksBox = ({ item, refresh }: ThanksBoxProps) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  const addThanks = async () => {
    if (value.length === 0) {
      Alert.alert('알림', '감사인사를 입력해주세요.', [
        {
          text: '확인',
          style: 'default',
        },
      ]);

      return;
    }

    try {
      setLoading(true);

      // test 필요
      const _ = await AddThanks(item.id, item.responseUser[item.responseUser.length - 1].id, value, fcmToken);
      refresh();
    } catch (e) {
      Alert.alert('알림', '일시적인 오류가 발생했습니다.', [
        {
          text: '확인',
          style: 'default',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, SigonganColor.backgroundPrimary, { paddingBottom: insets.bottom || 22 }]}>
      <Spinner visible={loading} />

      <TextInput
        placeholder="감사 인사를 전하세요..."
        style={[styles.text, SigonganFont.secondary]}
        value={value}
        onChangeText={setValue}
      />

      <TouchableOpacity activeOpacity={0.8} onPress={addThanks}>
        <FontAwesome name="send" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...SigonganShadow.shadowTopHigh,

    paddingLeft: 17,
    paddingTop: 22,

    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  text: {
    flex: 1,

    paddingLeft: 11,
    paddingTop: 10,
    paddingBottom: 7,

    borderWidth: 0.5,
    borderColor: SigonganColor.contentSenary.color,

    borderRadius: 10,
  },
  icon: {
    paddingRight: 18,
    fontSize: 28,
  },
});

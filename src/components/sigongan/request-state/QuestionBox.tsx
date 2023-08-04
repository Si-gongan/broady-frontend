import { View, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SigonganColor, SigonganFont, SigonganShadow } from '../styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { AddQuestion, IReqeustListItem } from '../../../api/axios';
import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../../states';
import { useState } from 'react';

type QuestionBoxProps = {
  item: IReqeustListItem;
  refresh: () => void;
};

export const QuestionBox = ({ item, refresh }: QuestionBoxProps) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  const addQuestion = async () => {
    if (value.length === 0) {
      Alert.alert('알림', '질문을 입력해주세요.', [
        {
          text: '확인',
          style: 'default',
        },
      ]);

      return;
    }

    try {
      setLoading(true);

      const _ = await AddQuestion(item.id, value, fcmToken);
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
    <View style={[styles.container, SigonganColor.backgroundPrimary, { paddingBottom: insets.bottom || 16 }]}>
      <Spinner visible={loading} />

      <TextInput
        placeholder="질문을 입력해주세요..."
        style={[styles.text, SigonganFont.secondary]}
        value={value}
        onChangeText={setValue}
        accessible
        accessibilityLabel="질문 입력창"
      />

      <TouchableOpacity activeOpacity={0.8} onPress={addQuestion} accessible accessibilityLabel="질문 전송 버튼">
        <FontAwesome name="send" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...SigonganShadow.shadowTopHigh,

    paddingLeft: 17,
    paddingTop: 16,

    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  text: {
    flex: 1,

    paddingLeft: 11,
    paddingTop: 10,
    paddingBottom: 10,

    borderWidth: 0.5,
    borderColor: SigonganColor.contentSenary.color,

    borderRadius: 10,
  },
  icon: {
    paddingRight: 18,
    fontSize: 28,
  },
});

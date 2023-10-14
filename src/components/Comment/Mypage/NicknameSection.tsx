import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { authTokenState, fcmTokenState, nicknameState } from '../../../states';
import { SigonganDesign } from '../../sigongan/styles';
import { commentFont } from '../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getMyRequestAll } from '../../../api/axios';

const NicknameSection = ({ navigation }: any) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);
  const nickname = useRecoilValue(nicknameState);

  const [totalCompletedCount, setTotalCompletedCount] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      try {
        getMyRequestAll(fcmToken, authToken).then((requestList) => {
          const completeList = [...requestList].filter(
            (data) => data.isAvailable === false && data.isComplete === true
          );
          setTotalCompletedCount(completeList.length);
        });
      } catch (error) {
        console.log('getMyRequestAll API 오류:', error);
      }
    }
  }, [isFocused]);

  return (
    <View>
      <View style={styles.headerTextContainer}>
        <Text style={commentFont.HEADER}>
          <Text style={styles.bold}>{nickname}님</Text>은 오늘까지
        </Text>
        <Text style={commentFont.HEADER}>
          <Text style={styles.bold}>총 {totalCompletedCount}명</Text>의 시각장애인을 도왔어요!
        </Text>
      </View>
      <View style={[SigonganDesign.myPageGrid, styles.boxContainer]}>
        <TouchableOpacity style={styles.touchContainer} onPress={() => navigation.navigate('Nickname')}>
          <Text style={commentFont.BODY1}>닉네임 설정</Text>
          <MaterialIcons name="arrow-forward-ios" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTextContainer: {
    marginBottom: 10,
  },
  boxContainer: {
    paddingVertical: 17,
    paddingHorizontal: 14,
    gap: 18,
  },
  touchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nicknameText: {
    color: '#111E4F',
    fontSize: 16,
  },
  bold: {
    lineHeight: 25,
    color: '#F589A5',
  },
});

export default NicknameSection;

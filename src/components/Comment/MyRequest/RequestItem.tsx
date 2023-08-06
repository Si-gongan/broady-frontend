import { useState } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { useRecoilValue } from 'recoil';
import { getProceedRequest } from '../../../api/axios';
import useInterval from '../../../hooks/useInterval';
import { authTokenState, fcmTokenState } from '../../../states';
import { ICurrentRequest } from '../../../types/request';
import { getConvertDate, getExpiredMinute, getKoreanTime } from '../../../utils/time';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH * 0.9) / 2 - 30; // 부모컴포넌트 width:90%에 2개씩 렌더링. gap: 30

const RequestItem = ({
  request,
  setProceedRequest,
  status,
  navigation,
}: {
  request: ICurrentRequest;
  setProceedRequest: (value: React.SetStateAction<ICurrentRequest[]>) => void;
  status: number;
  navigation: any;
}) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const lastIndex: number = request.requestedUser.length - 1;
  /* 가장 최근 의뢰 질문을 기준으로 시간 계산 */
  const gapTime = getConvertDate(request.createdAt);

  const [commentTimer, setCommentTimer] = useState<number>(10);

  // 시간을 줄일수록 작성 중인 해설의 남은시간 계산속도가 빠름. 코스트 고려.
  useInterval(() => {
    if (request.expiredAt !== null) {
      if (getKoreanTime(new Date()) < new Date(request.expiredAt)) {
        const result = getExpiredMinute(request.expiredAt);
        setCommentTimer(result);
      } else {
        // MY의뢰화면에서 작성중인 의뢰가 시간이 지났을 때
        if (status === 0)
          getProceedRequest(fcmToken, authToken).then((data) => {
            const sortedList = [...data].sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1));
            setProceedRequest(sortedList);
          });
      }
    }
  }, 100);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Writing', {
          id: request.id,
        })
      }
    >
      <Shadow distance={3} sides={{ top: true, bottom: true, start: true, end: true }}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${process.env.EXPO_PUBLIC_AWS_BUCKET_BASE_URL}/${request.photo}` }}
            style={styles.image}
          />
          <View style={styles.imageTextContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.createdAtRequest}>{gapTime}</Text>
              {status === 0 ? (
                <Text style={{ fontSize: 12, color: '#CF0000' }}>{commentTimer}분 남음</Text>
              ) : (
                <Text></Text>
              )}
            </View>
            <Text style={styles.requestContent}>{request.requestedUser[lastIndex].text}</Text>
          </View>
        </View>
      </Shadow>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 200,
    width: ITEM_WIDTH,
    display: 'flex',
    borderRadius: 12,
    overflow: 'hidden',
    gap: 10,
    paddingBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  image: {
    width: '100%',
    height: '70%',
  },
  imageTextContainer: {
    flex: 1,
    marginHorizontal: 10,
    gap: 10,
  },
  createdAtRequest: {
    fontSize: 12,
    color: 'gray',
  },
  requestContent: {},
});

export default RequestItem;

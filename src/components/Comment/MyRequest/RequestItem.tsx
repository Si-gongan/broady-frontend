import { AWS_BUCKET_BASE_URL } from '@env';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { imagePath } from '../../../../assets/imagePath';
import useInterval from '../../../hooks/useInterval';
import { ICurrentRequest } from '../../../types/request';
import { getConvertDate, getExpiredMinute, getKoreanTime } from '../../../utils/time';

const RequestItem = ({
  request,
  status,
  navigation,
}: {
  request: ICurrentRequest;
  status: number;
  navigation: any;
}) => {
  const lastIndex: number = request.requestedUser.length - 1;
  /* 가장 최근 의뢰 질문을 기준으로 시간 계산 */
  const gapTime = getConvertDate(request.createdAt);

  const [commentTimer, setCommentTimer] = useState<number>(10);

  useInterval(() => {
    if (request.expiredAt !== null && getKoreanTime(new Date()) < new Date(request.expiredAt)) {
      const result = getExpiredMinute(request.expiredAt);
      setCommentTimer(result);
      console.log('MY의뢰 남은시간: ', result);
    }
  }, 1000);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Writing', {
          id: request.id,
        })
      }
    >
      <Shadow distance={3} sides={{ top: false, bottom: true, start: true, end: true }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: `${AWS_BUCKET_BASE_URL}/${request.photo}` }} style={styles.image} />
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
    width: 160,
    display: 'flex',
    borderRadius: 12,
    overflow: 'hidden',
    gap: 10,
    paddingBottom: 30,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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

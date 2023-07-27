import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { imagePath } from '../../../../assets/imagePath';
import { getConvertDate } from '../../../utils/time';

interface IRequestItem {
  id: string;
  text: string;
  createdAt: Date;
}

const RequestItem = ({ request, status, navigation }: { request: IRequestItem[]; status: number; navigation: any }) => {
  const lastIndex: number = request.length - 1;
  /* 가장 최근 의뢰 질문을 기준으로 시간 계산 */
  const gapTime = getConvertDate(request[lastIndex].createdAt);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Writing', {
          id: request[lastIndex].id,
        })
      }
    >
      <Shadow distance={3} sides={{ top: false, bottom: true, start: true, end: true }}>
        <View style={styles.imageContainer}>
          <Image source={imagePath.REQUEST} alt="" style={styles.image} />
          <View style={styles.imageTextContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.createdAtRequest}>{gapTime}</Text>
              {status === 0 ? <Text style={{ fontSize: 12, color: '#CF0000' }}>10분 남음</Text> : <Text></Text>}
            </View>
            <Text style={styles.requestContent}>{request[lastIndex].text}</Text>
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

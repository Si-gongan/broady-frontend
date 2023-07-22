import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { IRequest } from '../../../types/request';
import { getConvertDate } from '../../../utils/time';

const RequestItem = ({ request, navigation }: { request: IRequest; navigation: any }) => {
  const gapTime = getConvertDate(request.createdAt);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Writing', {
          id: request.id,
          content: request.content,
          status: request.status,
        })
      }
    >
      <Shadow distance={3} sides={{ top: false, bottom: true, start: true, end: true }}>
        <View style={styles.imageContainer}>
          <Image source={request.imgSrc} alt="" style={styles.image} />
          <View style={styles.imageTextContainer}>
            <View>
              <Text style={styles.createdAtRequest}>{gapTime}</Text>
              {request.status === 0 ? (
                <Text style={{ color: '#CF0000' }}>{request.commentTimer}분 남음</Text>
              ) : (
                <Text></Text>
              )}
            </View>
            <Text style={styles.requestContent}>{request.content}</Text>
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
    paddingBottom: 10,
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
    gap: 10,
    marginLeft: 10,
  },
  createdAtRequest: {
    fontSize: 12,
    color: 'gray',
  },
  requestContent: {},
});

export default RequestItem;

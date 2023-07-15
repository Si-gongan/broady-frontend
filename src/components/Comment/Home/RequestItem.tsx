import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { IRequest } from '../../../types/request';

const RequestItem = ({ request, navigation }: { request: IRequest; navigation: any }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Writing')}>
      <Shadow distance={3} sides={{ top: false, bottom: true, start: true, end: true }}>
        <View style={styles.imageContainer}>
          <Image source={request.imgSrc} alt="" style={styles.image} />
          <View style={styles.imageTextContainer}>
            <Text style={styles.createdAtRequest}>{request.createdAt}</Text>
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

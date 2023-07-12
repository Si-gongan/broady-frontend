import { View, Text, Image, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const RequestList = (props: any) => {
  const { requestList } = props;

  return (
    <View style={styles.cardContainer}>
      {requestList.map((question: any, idx: number) => (
        <Shadow key={idx} distance={3} sides={{ top: false, bottom: true, start: true, end: true }}>
          <View style={styles.imageContainer}>
            <Image source={question.imgSrc} alt="" style={styles.image} />
            <View style={styles.imageTextContainer}>
              <Text style={styles.createdAtRequest}>{question.createdAt}</Text>
              <Text style={styles.requestContent}>{question.content}</Text>
            </View>
          </View>
        </Shadow>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 30,
  },
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

export default RequestList;

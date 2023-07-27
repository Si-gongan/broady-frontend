import { View, Text, StyleSheet, Image } from 'react-native';
import ImageModal from 'react-native-image-modal';
import { AWS_BUCKET_BASE_URL } from '@env';
import { getFormattedTime } from '../../../utils/time';
import { useEffect } from 'react';

interface IRequestMessageProps {
  id: string;
  text: string;
  createdAt: Date;
}

const RequestMessage = ({ content, photo }: { content: IRequestMessageProps; photo: string }) => {
  const messageTime = getFormattedTime(content.createdAt);
  return (
    <>
      <View style={styles.imageContainer}>
        <ImageModal
          resizeMode="contain"
          style={styles.requestImage}
          source={{
            uri: `${AWS_BUCKET_BASE_URL}/${photo}`,
          }}
        />
      </View>
      <View style={styles.chatContainer}>
        <View>
          <Image source={require('../../../../assets/sample_request.png')} alt="" style={styles.chatImage} />
        </View>
        <View style={styles.chatText}>
          <Text>{content.text}</Text>
        </View>
        <View>
          <Text style={{ color: '#777' }}>{messageTime}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 30,
  },
  requestImage: {
    width: 415,
    height: 250,
    borderRadius: 30,
    marginBottom: 10,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '90%',
    gap: 10,
    height: 60,
    marginLeft: 20,
  },
  chatImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  chatText: {
    width: '60%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderColor: 'rgba(158, 150, 150, .5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RequestMessage;

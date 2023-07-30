import { View, Text, StyleSheet, Image } from 'react-native';
import { getFormattedTime } from '../../../utils/time';

interface IRequestMessageProps {
  id: string;
  text: string;
  createdAt: string;
}

const RequestMessage = ({ content }: { content: IRequestMessageProps }) => {
  const messageTime = getFormattedTime(content.createdAt);
  return (
    <>
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
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '90%',
    gap: 10,
    marginLeft: 20,
    marginTop: 20,
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

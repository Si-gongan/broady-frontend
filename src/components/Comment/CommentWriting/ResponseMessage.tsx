import { View, Text, StyleSheet } from 'react-native';
import { getFormattedTime } from '../../../utils/time';

interface IResponseMessageProps {
  id: string;
  text: string;
  userId?: string;
  createdAt: string;
  appreciated?: boolean;
  appreciatedText?: string;
}

const ResponseMessage = ({ comment }: { comment: IResponseMessageProps }) => {
  const messageTime = getFormattedTime(comment.createdAt);

  return (
    <>
      <View style={styles.chatContainer}>
        <View>
          <Text style={{ color: '#777' }}>{messageTime}</Text>
        </View>
        <View style={styles.chatText}>
          <Text style={{ color: 'white' }}>{comment.text}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 10,
    height: 60,
    marginRight: 20,
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
    borderBottomRightRadius: 0,
    borderColor: 'rgba(158, 150, 150, .5)',
    backgroundColor: '#3B4A89',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ResponseMessage;

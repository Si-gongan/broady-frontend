import { View, StyleSheet, Dimensions } from 'react-native';
import ImageModal from 'react-native-image-modal';
import { ICurrentRequest } from '../../../types/request';
import RequestMessage from './RequestMessage';
import ResponseMessage from './ResponseMessage';

interface IChat {
  id: string;
  text: string;
  userId?: string;
  createdAt: string;
  appreciated?: boolean;
  appreciatedText?: string;
}

// responseUser : 해설자 측
// requestedUser : 시각장애인 측

const SCREEN_WIDTH = Dimensions.get('window').width;

const MessageList = ({ request }: { request: ICurrentRequest }) => {
  const allMessageList = [...request.requestedUser, ...request.responseUser];
  const sortedMessageList = [...allMessageList].sort((a, b) =>
    new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
  );

  return (
    <>
      <View style={styles.imageContainer}>
        <View>
          <ImageModal
            resizeMode="contain"
            style={styles.requestImage}
            source={{
              uri: `${process.env.EXPO_PUBLIC_AWS_BUCKET_BASE_URL}/${request.photo}`,
            }}
          />
        </View>
      </View>
      {sortedMessageList.map((message: IChat, idx: number) => {
        // 감사 인사한 경우
        if (message.userId && message.appreciated && message.appreciatedText) {
          return (
            <>
              <ResponseMessage key={message.userId} comment={message} />
              <RequestMessage key={message.createdAt} content={{ ...message, text: message.appreciatedText }} />
            </>
          );
        }
        // 해설자 측 답변
        if (message.userId) return <ResponseMessage key={idx} comment={message} />;
        // 시각장애인 측 의뢰
        else return <RequestMessage key={idx} content={message} />;
      })}
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  requestImage: {
    width: SCREEN_WIDTH * 0.9,
    height: 250,
  },
});

export default MessageList;

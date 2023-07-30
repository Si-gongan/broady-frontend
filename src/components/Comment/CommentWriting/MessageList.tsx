import { AWS_BUCKET_BASE_URL } from '@env';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import ImageModal from 'react-native-image-modal';
import { ICurrentRequest } from '../../../types/request';
import { getFormattedTime } from '../../../utils/time';
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

const MessageList = ({ request }: { request: ICurrentRequest }) => {
  const allMessageList = [...request.requestedUser, ...request.responseUser];
  const sortedMessageList = [...allMessageList].sort((a, b) =>
    new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
  );

  return (
    <>
      <View style={styles.imageContainer}>
        <ImageModal
          resizeMode="contain"
          style={styles.requestImage}
          source={{
            uri: `${AWS_BUCKET_BASE_URL}/${request.photo}`,
          }}
        />
      </View>
      {sortedMessageList.map((message: IChat, idx: number) => {
        // 감사 인사한 경우
        if (message.userId && message.appreciated && message.appreciatedText) {
          return (
            <>
              <ResponseMessage key={idx} comment={message} />
              <RequestMessage key={idx} content={{ ...message, text: message.appreciatedText }} />
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
  },
  requestImage: {
    width: 415,
    height: 250,
    borderRadius: 30,
    marginBottom: 10,
  },
});

export default MessageList;

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
        if (message.userId) return <ResponseMessage key={idx} comment={message} />;
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

export default MessageList;

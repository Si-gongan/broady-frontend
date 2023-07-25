import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import ImageModal from 'react-native-image-modal';
import { AWS_BUCKET_BASE_URL } from '@env';
import { ICurrentRequest } from '../../../types/request';
import RequestMessage from './RequestMessage';
import ResponseMessage from './ResponseMessage';

const MessageList = ({ request }: { request: ICurrentRequest }) => {
  const allMessageList = [...request.requestedUser, request.responseUser];
  return (
    <>
      {/* TODO: 번갈아서 보낼 방법 or flag를 달아서 구분해야 할듯? */}
      <RequestMessage content={request.requestedUser[0]} />
      <ResponseMessage comment={request.responseUser[0]} />
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

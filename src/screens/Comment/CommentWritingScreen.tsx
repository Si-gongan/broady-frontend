import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import Footer from '../../components/Comment/CommentWriting/Footer';
import Header from '../../components/common/Header';
import RequestMessage from '../../components/Comment/CommentWriting/RequestMessage';
import { useRecoilState } from 'recoil';
import { requestListState } from '../../states/request';
import { useEffect, useState } from 'react';
import { IRequest } from '../../types/request';
import ResponseMessage from '../../components/Comment/CommentWriting/ResponseMessage';

interface IComment {
  id: number;
  content: string;
}

const CommentWritingScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const { id } = route.params;
  const [requestList, setRequestList] = useRecoilState(requestListState);
  const [currentRequest, setCurrentRequest] = useState<IRequest>({} as any);
  const [commentList, setCommentList] = useState<IComment[]>([]);

  const sendComment = (text: string) => {
    const newComment = { id: 3, content: text };
    setCommentList(commentList.concat(newComment));
    Keyboard.dismiss();
    console.log(text);
    console.log(commentList);
    // setText('');
  };

  const startComment = (id: number) => {
    setRequestList(requestList.map((request) => (request.id === id ? { ...request, status: 1 } : request)));
  };

  useEffect(() => {
    const result = requestList.filter((request) => request.id === id);
    setCurrentRequest(result[0]);
  }, [requestList]);

  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation}>해설 작성</Header>
      <ScrollView style={styles.bodyContainer}>
        <RequestMessage content={currentRequest.content} />
        {commentList.map((comment, idx) => (
          <ResponseMessage key={idx} comment={comment} />
        ))}
      </ScrollView>
      <Footer id={id} status={currentRequest.status} startComment={startComment} sendComment={sendComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 0.7,
  },
});

export default CommentWritingScreen;

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
  const [commentTimer, setCommentTimer] = useState<number>(1);

  let timerId: string | number | NodeJS.Timer | undefined;
  const startTimer = () => {
    timerId = setInterval(() => {
      setCommentTimer((prev) => prev - 1);
    }, 60000);
  };

  const sendComment = (text: string) => {
    const newComment = { id: ++commentList.length, content: text };
    setCommentList(commentList.concat(newComment));
    endComment();
    Keyboard.dismiss();
  };

  const startComment = (id: number) => {
    setRequestList(requestList.map((request) => (request.id === id ? { ...request, status: 0 } : request)));
    startTimer();
  };

  const endComment = () => {
    clearInterval(timerId);
    setRequestList(requestList.map((request) => (request.id === id ? { ...request, status: 1 } : request)));
  };

  const resetComment = () => {
    clearInterval(timerId);
    setRequestList(requestList.map((request) => (request.id === id ? { ...request, status: -1 } : request)));
    setCommentTimer(1);
  };

  useEffect(() => {
    if (commentTimer === 0) resetComment();
  }, [commentTimer]);

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
      <Footer
        id={id}
        status={currentRequest.status}
        startComment={startComment}
        sendComment={sendComment}
        commentTimer={commentTimer}
      />
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

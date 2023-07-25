import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import Footer from '../../components/Comment/CommentWriting/Footer';
import Header from '../../components/common/Header';
import RequestMessage from '../../components/Comment/CommentWriting/RequestMessage';
import { useRecoilState } from 'recoil';
import { commentTimerListState, requestListState } from '../../states/request';
import { useEffect, useState } from 'react';
import { IRequest } from '../../types/request';
import ResponseMessage from '../../components/Comment/CommentWriting/ResponseMessage';

interface IComment {
  id: number;
  content: string;
}

interface ITimer {
  id: number;
  timerId: string | number | NodeJS.Timer | undefined;
}

const CommentWritingScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const { id } = route.params;
  const [requestList, setRequestList] = useRecoilState(requestListState);
  const [currentRequest, setCurrentRequest] = useState<IRequest>({} as any);

  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [commentTimerList, setCommentTimerList] = useRecoilState(commentTimerListState);

  // let timerId: string | number | NodeJS.Timer | undefined;
  const startTimer = async () => {
    const timerId: ITimer['timerId'] = setInterval(() => {
      setRequestList(
        requestList.map((request) =>
          request.id === id ? { ...request, status: 0, commentTimer: --request.commentTimer } : request
        )
      );
    }, 10000);
    const newTimer = { id, timerId };
    setCommentTimerList(commentTimerList.concat(newTimer));
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
    const clear = commentTimerList.filter((timer) => timer.id === id);
    clearInterval(clear[0].timerId);
    setRequestList(
      requestList.map((request) => (request.id === id ? { ...request, status: 1, commentTimer: 10 } : request))
    );
  };

  const resetComment = () => {
    const clear = commentTimerList.filter((timer) => timer.id === id);
    clearInterval(clear[0].timerId);
    setRequestList(
      requestList.map((request) => (request.id === id ? { ...request, status: -1, commentTimer: 10 } : request))
    );
  };

  useEffect(() => {
    if (currentRequest.commentTimer === 0) resetComment();
  }, [requestList]);

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
        resetComment={resetComment}
        commentTimer={currentRequest.commentTimer}
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

import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import Footer from '../../components/Comment/CommentWriting/Footer';
import Header from '../../components/common/Header';
import RequestMessage from '../../components/Comment/CommentWriting/RequestMessage';
import { useRecoilState, useRecoilValue } from 'recoil';
import { requestListState } from '../../states/request';
import { useEffect, useState } from 'react';
import { ICurrentRequest, IRequest } from '../../types/request';
import { getRequest } from '../../api/axios';
import { authTokenState, fcmTokenState } from '../../states';
import MessageList from '../../components/Comment/CommentWriting/MessageList';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

interface IComment {
  id: number;
  content: string;
}

const CommentWritingScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const { id } = route.params;
  // const [requestList, setRequestList] = useRecoilState(requestListState);
  const [currentRequest, setCurrentRequest] = useState<ICurrentRequest>({} as any);
  // const [commentList, setCommentList] = useState<IComment[]>([]);
  // const [commentTimer, setCommentTimer] = useState<number>(1);

  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  // let timerId: string | number | NodeJS.Timer | undefined;
  // const startTimer = () => {
  //   timerId = setInterval(() => {
  //     setCommentTimer((prev) => prev - 1);
  //   }, 60000);
  // };

  // const sendComment = (text: string) => {
  //   const newComment = { id: ++commentList.length, content: text };
  //   setCommentList(commentList.concat(newComment));
  //   endComment();
  //   Keyboard.dismiss();
  // };

  // const startComment = (id: number) => {
  //   setRequestList(requestList.map((request) => (request.id === id ? { ...request, status: 0 } : request)));
  //   startTimer();
  // };

  // const endComment = () => {
  //   clearInterval(timerId);
  //   setRequestList(requestList.map((request) => (request.id === id ? { ...request, status: 1 } : request)));
  // };

  // const resetComment = () => {
  //   clearInterval(timerId);
  //   setRequestList(requestList.map((request) => (request.id === id ? { ...request, status: -1 } : request)));
  //   setCommentTimer(1);
  // };

  // useEffect(() => {
  //   if (commentTimer === 0) resetComment();
  // }, [commentTimer]);

  // useEffect(() => {
  //   const result = requestList.filter((request) => request.id === id);
  //   setCurrentRequest(result[0]);
  // }, [requestList]);

  const isFocused = useIsFocused();

  useEffect(() => {
    // TODO: postId 넘어오는 건 테스트 완료. 해설의뢰가 들어온 뒤에 테스트 가능
    if (isFocused) {
      getRequest(id, fcmToken, authToken).then((data) => setCurrentRequest(data));
    }
  }, [isFocused]);
  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation}>해설 작성</Header>
      <ScrollView style={styles.bodyContainer}>
        {Object.keys(currentRequest).length > 0 && <MessageList request={currentRequest} />}
        {/* <RequestMessage content={currentRequest.text} />
        {commentList.map((comment, idx) => (
          <ResponseMessage key={idx} comment={comment} />
        ))} */}
      </ScrollView>
      <Footer
        id={id}
        request={currentRequest}
        // status={currentRequest.status}
        // startComment={startComment}
        // sendComment={sendComment}
        // resetComment={resetComment}
        // commentTimer={commentTimer}
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

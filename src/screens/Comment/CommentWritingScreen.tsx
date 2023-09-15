import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Footer from '../../components/Comment/CommentWriting/Footer';
import Header from '../../components/common/Header';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { ICurrentRequest } from '../../types/request';
import { getRequest } from '../../api/axios';
import { authTokenState, fcmTokenState } from '../../states';
import MessageList from '../../components/Comment/CommentWriting/MessageList';
import { useIsFocused } from '@react-navigation/native';
import useInterval from '../../hooks/useInterval';
import { getExpiredMinute, getKoreanTime } from '../../utils/time';
import BottomMenu from '../../components/Comment/CommentWriting/BottomMenu';

const CommentWritingScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);
  const { id } = route.params;
  const [currentRequest, setCurrentRequest] = useState<ICurrentRequest>({} as ICurrentRequest);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    // TODO: postId 넘어오는 건 테스트 완료. 해설의뢰가 들어온 뒤에 테스트 가능
    if (isFocused) {
      getRequest(id, fcmToken, authToken).then((data) => setCurrentRequest(data));
    }
  }, [isFocused]);

  const [commentTimer, setCommentTimer] = useState<number>(7);

  useInterval(() => {
    if (currentRequest.expiredAt !== null && getKoreanTime(new Date()) < new Date(currentRequest.expiredAt)) {
      const result = getExpiredMinute(currentRequest.expiredAt);
      setCommentTimer(result);
    }
  }, 1000);

  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation} setIsMenuVisible={setIsMenuVisible}>
        해설 작성
      </Header>
      <ScrollView style={styles.bodyContainer}>
        {Object.keys(currentRequest).length > 0 && <MessageList request={currentRequest} />}
      </ScrollView>
      <Footer
        id={id}
        request={currentRequest}
        setRequest={setCurrentRequest}
        commentTimer={commentTimer}
        navigation={navigation}
      />
      {isMenuVisible && (
        <BottomMenu navigation={navigation} postId={id} visible={isMenuVisible} setVisible={setIsMenuVisible} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 0.7,
    marginBottom: 10,
  },
});

export default CommentWritingScreen;

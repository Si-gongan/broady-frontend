import { View, StyleSheet, ScrollView } from 'react-native';
import Footer from '../../components/Comment/CommentWriting/Footer';
import Header from '../../components/common/Header';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { ICurrentRequest } from '../../types/request';
import { getRequest } from '../../api/axios';
import { authTokenState, fcmTokenState } from '../../states';
import MessageList from '../../components/Comment/CommentWriting/MessageList';
import { useIsFocused } from '@react-navigation/native';
import MenuBottomSheet from '../../components/Comment/CommentWriting/BottomSheet/MenuBottomSheet';

const CommentWritingScreen = ({ navigation, route }: any) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);
  const { id } = route.params;
  const [currentRequest, setCurrentRequest] = useState<ICurrentRequest>({} as ICurrentRequest);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const isFocused = useIsFocused();

  const handleClickMenu = () => {
    setIsMenuVisible(true);
  };

  useEffect(() => {
    if (isFocused) {
      getRequest(id, fcmToken, authToken).then((data) => setCurrentRequest(data));
    }
  }, [isFocused]);

  return (
    <View style={styles.mainContainer}>
      <Header isBack={true} type="comment" handleClick={handleClickMenu}>
        해설 작성
      </Header>
      <ScrollView style={styles.bodyContainer}>
        {Object.keys(currentRequest).length > 0 && <MessageList request={currentRequest} />}
      </ScrollView>
      <Footer id={id} request={currentRequest} setRequest={setCurrentRequest} navigation={navigation} />
      {isMenuVisible && (
        <MenuBottomSheet navigation={navigation} postId={id} visible={isMenuVisible} setVisible={setIsMenuVisible} />
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

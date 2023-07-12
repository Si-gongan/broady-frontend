import { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  CommentRequestButton,
  CommentRequestPopup,
  ICommentRequestPopupHandler,
  RequestImageCard,
  RequestTextCard,
} from '../../components/sigongan';

export const HomeScreen = () => {
  const commentRequestPopupRef = useRef<ICommentRequestPopupHandler>(null);

  return (
    <View>
      <ScrollView>
        <View style={styles.topButton}>
          <CommentRequestButton onClick={() => commentRequestPopupRef.current?.open()} />
        </View>
        <View style={styles.requestList}>
          <View style={styles.requestItem}>
            <RequestImageCard imgUrl="" />
            <RequestTextCard date="" content="" />
          </View>

          <View style={styles.requestItem}>
            <RequestImageCard imgUrl="" />
            <RequestTextCard date="" content="" />
          </View>
        </View>
      </ScrollView>

      <CommentRequestPopup ref={commentRequestPopupRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  topButton: {
    marginTop: 27,
    alignItems: 'center',
  },
  requestList: {
    marginTop: 30,
    alignItems: 'center',

    gap: 14,
  },
  requestItem: {
    flexDirection: 'row',

    gap: 15,
  },
});

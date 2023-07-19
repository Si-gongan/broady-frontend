import { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {
  CommentRequestButton,
  CommentRequestPopup,
  ICommentRequestPopupHandler,
  RequestImageCard,
  RequestTextCard,
} from '../../components/sigongan/home';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation();

  const commentRequestPopupRef = useRef<ICommentRequestPopupHandler>(null);

  return (
    <View style={styles.container}>
      <CommentRequestButton onPress={() => commentRequestPopupRef.current?.open()} />

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.requestList}>
          <TouchableOpacity activeOpacity={0.8} accessible accessibilityLabel="~~라고 작성한 의뢰 상세보기">
            <View style={styles.requestItem}>
              <RequestImageCard imgUrl="" />
              <RequestTextCard date="" content="" />
            </View>
          </TouchableOpacity>

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
  container: {
    flex: 1,
    alignItems: 'center',
  },
  requestList: {
    alignItems: 'center',

    gap: 14,
  },
  requestItem: {
    flexDirection: 'row',

    gap: 15,
  },
});

import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  CommentRequestButton,
  CommentRequestPopup,
  RequestImageCard,
  RequestTextCard,
} from '../../components/sigongan';

export const HomeScreen = () => {
  return (
    <View>
      <ScrollView>
        <View style={styles.topButton}>
          <CommentRequestButton />
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

      <CommentRequestPopup />
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

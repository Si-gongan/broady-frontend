import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Comment/CommentWriting/Header';

const CommentWritingScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation} />
      <Text>해설 작성 페이지</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default CommentWritingScreen;

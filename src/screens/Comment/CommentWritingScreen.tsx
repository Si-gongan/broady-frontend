import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Header from '../../components/Comment/CommentWriting/Header';

const CommentWritingScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation} />
      <TouchableOpacity style={styles.imageContainer}>
        <Image source={require('../../../assets/sample_comment.png')} alt="" style={styles.requestImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
  },
  requestImage: {
    width: '90%',
    borderRadius: 30,
  },
});

export default CommentWritingScreen;

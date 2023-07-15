import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Footer from '../../components/Comment/CommentWriting/Footer';
import Header from '../../components/Comment/CommentWriting/Header';
import RequestMessage from '../../components/Comment/CommentWriting/RequestMessage';

const CommentWritingScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation} />
      <TouchableOpacity style={styles.imageContainer}>
        <Image source={require('../../../assets/sample_comment.png')} alt="" style={styles.requestImage} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.bodyContainer}>
        <RequestMessage />
      </ScrollView>
      <Footer />
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
  bodyContainer: {
    flex: 0.7,
  },
});

export default CommentWritingScreen;

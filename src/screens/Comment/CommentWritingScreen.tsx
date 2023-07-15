import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import Footer from '../../components/Comment/CommentWriting/Footer';
import Header from '../../components/Comment/CommentWriting/Header';

const CommentWritingScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation} />
      <TouchableOpacity style={styles.imageContainer}>
        <Image source={require('../../../assets/sample_comment.png')} alt="" style={styles.requestImage} />
      </TouchableOpacity>
      <ScrollView style={styles.bodyContainer}>
        <View>
          <View>
            <Text>이미지</Text>
          </View>
          <View>
            <Text>고양이가 어떤 모습인지 자세히 설명해주세요.</Text>
          </View>
          <View>
            <Text>오후 2:05</Text>
          </View>
        </View>
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
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  commentBtn: {
    backgroundColor: '#2C2C2C',
    width: '90%',
    height: '80%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentText: {
    color: 'white',
    fontSize: 22,
  },
});

export default CommentWritingScreen;

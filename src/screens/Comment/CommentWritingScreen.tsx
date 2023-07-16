import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Footer from '../../components/Comment/CommentWriting/Footer';
import Header from '../../components/Comment/CommentWriting/Header';
import RequestMessage from '../../components/Comment/CommentWriting/RequestMessage';

const CommentWritingScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const { content, status } = route.params;

  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.bodyContainer}>
        <RequestMessage content={content} />
      </ScrollView>
      <Footer status={status} />
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

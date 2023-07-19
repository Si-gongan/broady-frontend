import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

interface IComment {
  id: number;
  content: string;
}

const ResponseMessage = ({ comment }: { comment: IComment }) => {
  console.log('comment:', comment);
  return (
    <>
      <View style={styles.imageContainer}></View>
      <View style={styles.chatContainer}>
        <View>
          <Text style={{ color: '#777' }}>오후 2:20</Text>
        </View>
        <View style={styles.chatText}>
          <Text style={{ color: 'white' }}>{comment.content}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 30,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 10,
    height: 60,
    marginRight: 20,
  },
  chatImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  chatText: {
    width: '60%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderBottomRightRadius: 0,
    borderColor: 'rgba(158, 150, 150, .5)',
    backgroundColor: '#3B4A89',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ResponseMessage;

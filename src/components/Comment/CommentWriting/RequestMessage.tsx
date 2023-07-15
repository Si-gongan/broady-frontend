import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const RequestMessage = ({ content }: { content: string }) => {
  return (
    <View style={styles.chatContainer}>
      <View>
        <Image source={require('../../../../assets/sample_request.png')} alt="" style={styles.chatImage} />
      </View>
      <View style={styles.chatText}>
        <Text>{content}</Text>
      </View>
      <View>
        <Text style={{ color: '#777' }}>오후 2:05</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '90%',
    gap: 10,
    height: 70,
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
    borderBottomLeftRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RequestMessage;

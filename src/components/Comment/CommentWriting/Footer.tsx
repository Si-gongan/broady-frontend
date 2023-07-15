import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const Footer = () => {
  return (
    <Shadow
      distance={10}
      containerStyle={{ flex: 0.2 }}
      style={{ width: '100%', height: '100%' }}
      sides={{ top: true, bottom: false, start: false, end: false }}
    >
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.commentBtn}>
          <Text style={styles.commentText}>해설하기</Text>
        </TouchableOpacity>
      </View>
    </Shadow>
  );
};

const styles = StyleSheet.create({
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

export default Footer;

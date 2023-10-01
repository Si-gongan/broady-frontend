import { View, Text, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { Colors } from '../../renewal';

const AfterCommentFooter = () => {
  return (
    <>
      <Shadow
        distance={10}
        containerStyle={{ flex: 0.15 }}
        style={{ width: '100%', height: '100%' }}
        sides={{ top: true, bottom: false, start: false, end: false }}
      >
        <View style={styles.footerContainer}>
          <View style={styles.commentEndBtn}>
            <Text style={styles.commentText}>해설하기</Text>
          </View>
        </View>
      </Shadow>
    </>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  commentEndBtn: {
    backgroundColor: Colors.Red.Lighten300,
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

export default AfterCommentFooter;

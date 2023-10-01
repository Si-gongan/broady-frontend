import { View, Text, StyleSheet, Platform } from 'react-native';
import { Colors } from '../../renewal';
import EndCommentBottomSheet from './BottomSheet/EndCommentBottomSheet';

interface IAfterCommentFooterProps {
  isEndComment: boolean;
  setIsEndComment: React.Dispatch<React.SetStateAction<boolean>>;
}

const AfterCommentFooter = ({ isEndComment, setIsEndComment }: IAfterCommentFooterProps) => {
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.footerContainer}>
        <View style={styles.commentEndBtn}>
          <Text style={styles.commentText}>해설하기</Text>
        </View>
      </View>
      {isEndComment && <EndCommentBottomSheet visible={isEndComment} setVisible={setIsEndComment} />}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 0.15,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: Colors.Red.Default,
        shadowOffset: {
          width: 5,
          height: -5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      android: {
        elevation: 7,
      },
    }),
  },
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

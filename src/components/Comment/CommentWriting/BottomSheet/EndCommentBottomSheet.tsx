import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { Colors } from '../../../renewal';
import { commentFont } from '../../styles';

interface IEndCommentBottomSheetProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const EndCommentBottomSheet = ({ visible, setVisible }: IEndCommentBottomSheetProps) => {
  const onClose = () => setVisible(false);

  return (
    <BottomSheet visible={visible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={commentFont.BUTTON_TEXT}>해설 완료</Text>
        </View>
        <View style={styles.divisionLine} />
        <View style={styles.itemWrapper}>
          <Text style={commentFont.BODY1}>해설이 성공적으로 완료되었습니다!</Text>
          <Text style={commentFont.BODY1}>50P를 지급해드렸어요.</Text>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.commentBtn} onPress={onClose}>
            <Text style={[commentFont.BUTTON_TEXT, styles.commentText]}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  titleWrapper: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  divisionLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#E8E8E8',
  },
  titleText: {
    fontSize: 18,
  },
  itemWrapper: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerContainer: {
    alignItems: 'center',
  },
  commentBtn: {
    backgroundColor: Colors.Red.Default,
    width: '90%',
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentText: {
    color: 'white',
  },
});

export default EndCommentBottomSheet;

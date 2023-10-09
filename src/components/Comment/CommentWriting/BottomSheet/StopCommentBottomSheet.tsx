import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { Colors } from '../../../renewal';
import { commentFont } from '../../styles';

interface IStopCommentBottomSheetProps {
  handleClickStopComment: () => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const StopCommentBottomSheet = ({ handleClickStopComment, visible, setVisible }: IStopCommentBottomSheetProps) => {
  const onClose = () => setVisible(false);

  return (
    <BottomSheet visible={visible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={commentFont.BUTTON_TEXT}>해설 넘기기</Text>
        </View>
        <View style={styles.divisionLine} />
        <View style={styles.itemWrapper}>
          <Text style={commentFont.BODY1}>해설을 그만두고 다른 해설자에게 넘길 경우</Text>
          <Text style={commentFont.BODY1}>10P가 차감됩니다.</Text>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={[commentFont.BUTTON_TEXT, styles.closeText]}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commentBtn} onPress={handleClickStopComment}>
            <Text style={[commentFont.BUTTON_TEXT, styles.commentText]}>해설 넘기기</Text>
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
    fontWeight: '500',
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  closeBtn: {
    backgroundColor: 'white',
    width: '40%',
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.Red.Default,
  },
  commentBtn: {
    backgroundColor: Colors.Red.Default,
    width: '40%',
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: Colors.Red.Default,
  },
  commentText: {
    color: 'white',
  },
});

export default StopCommentBottomSheet;

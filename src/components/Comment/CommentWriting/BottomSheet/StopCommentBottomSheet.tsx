import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { SigonganColor, SigonganDesign, SigonganShadow } from '../../../sigongan/styles';

interface IStopCommentBottomSheetProps {
  handleClickStopComment: () => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const StopCommentBottomSheet = ({ handleClickStopComment, visible, setVisible }: IStopCommentBottomSheetProps) => {
  const onClose = () => setVisible(false);

  return (
    <BottomSheet visible={visible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <View style={[styles.container, SigonganColor.backgroundPrimary]}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>해설 넘기기</Text>
        </View>
        <View style={SigonganDesign.borderOpaque} />
        <View style={styles.itemWrapper}>
          <Text style={{ fontSize: 18 }}>해설을 그만두고 다른 해설자에게 넘길 경우</Text>
          <Text style={{ fontSize: 18 }}>10P가 차감됩니다.</Text>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.commentBtn} onPress={handleClickStopComment}>
            <Text style={styles.commentText}>해설 넘기기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    paddingTop: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    ...SigonganShadow.shadowTopHigh,
  },
  titleWrapper: {
    // width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
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
    backgroundColor: '#2C2C2C',
    width: '90%',
    // height: '35%',
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentText: {
    color: 'white',
    fontSize: 22,
  },
});

export default StopCommentBottomSheet;

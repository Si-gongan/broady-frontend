import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import Toast from 'react-native-root-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { reportPost, stopComment } from '../../../api/axios';
import { authTokenState, fcmTokenState } from '../../../states';
import { SigonganColor, SigonganDesign, SigonganFont, SigonganShadow } from '../../sigongan/styles';

interface IStopCommentBottomMenuProps {
  handleClickStopComment: () => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const StopCommentBottomMenu = ({ handleClickStopComment, visible, setVisible }: IStopCommentBottomMenuProps) => {
  const onClose = () => setVisible(false);

  return (
    <BottomSheet visible={visible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <View style={[styles.container, SigonganColor.backgroundPrimary]}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>해설 넘기기</Text>
        </View>
        <View style={SigonganDesign.borderOpaque} />
        <View style={styles.itemWrapper}>
          <View style={{ width: '80%' }}>
            <Text style={{ fontSize: 18, textAlign: 'center', paddingVertical: 40 }}>
              해설을 그만두고 다른 해설자에게 넘길 경우 10P가 차감됩니다.
            </Text>
          </View>
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

export default StopCommentBottomMenu;

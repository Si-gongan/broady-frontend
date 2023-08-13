import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import Toast from 'react-native-root-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { reportPost } from '../../../api/axios';
import { authTokenState, fcmTokenState } from '../../../states';
import { SigonganColor, SigonganDesign, SigonganFont, SigonganShadow } from '../../sigongan/styles';

interface IBottomMenuProps {
  navigation: any;
  postId: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomMenu = ({ navigation, postId, visible, setVisible }: IBottomMenuProps) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const insets = useSafeAreaInsets();

  const onClose = () => setVisible(false);

  const handleReportPost = async (postId: string) => {
    await reportPost(postId, fcmToken, authToken);
    navigation.navigate('Home');
    showToastMessage('차단이 완료되었습니다.');
  };

  const showToastMessage = (message: string) => {
    Toast.show(message, {
      duration: 1000,
      animation: true,
      position: Platform.OS === 'ios' ? insets.top : Toast.positions.TOP,
    });
  };

  return (
    <BottomSheet visible={visible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <View style={[styles.container, SigonganColor.backgroundPrimary]}>
        <View style={styles.titleWrapper}>
          <Text style={(SigonganFont.secondary, styles.titleText)}>글 메뉴</Text>
        </View>
        <View style={SigonganDesign.borderOpaque} />
        <View style={[styles.itemWrapper, { paddingBottom: insets.bottom || 16 }]}>
          <TouchableOpacity style={styles.item}>
            <Text style={SigonganFont.secondary}>신고</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => handleReportPost(postId)}>
            <Text style={SigonganFont.secondary}>차단</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => onClose()}>
            <Text style={SigonganFont.secondary}>취소</Text>
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
    color: 'grey',
  },

  itemWrapper: {
    // width: '100%'
  },
  item: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
});

export default BottomMenu;

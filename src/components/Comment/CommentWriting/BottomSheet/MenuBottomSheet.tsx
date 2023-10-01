import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import Toast from 'react-native-root-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { reportPost } from '../../../../api/axios';
import { authTokenState, fcmTokenState } from '../../../../states';
import { SigonganColor, SigonganDesign, SigonganShadow } from '../../../sigongan/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { commentFont } from '../../styles';
import { Colors } from '../../../renewal';
import ReportBottomSheet from './ReportBottomSheet';

interface IMenuBottomSheetProps {
  navigation: any;
  postId: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuBottomSheet = ({ navigation, postId, visible, setVisible }: IMenuBottomSheetProps) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const [isOpened, setIsOpened] = useState(false);
  const [category, setCategory] = useState(0); // image: 0, request: 1

  const insets = useSafeAreaInsets();

  const onClose = () => setVisible(false);

  const handleClickReportImageBtn = () => {
    setIsOpened(true);
    setCategory(0);
  };

  const handleClickReportRequestBtn = () => {
    setIsOpened(true);
    setCategory(1);
  };

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
          <Text style={commentFont.BUTTON_TEXT}>메뉴</Text>
        </View>
        <View style={SigonganDesign.borderOpaque} />
        <View style={[styles.itemWrapper, { paddingBottom: insets.bottom || 16 }]}>
          <TouchableOpacity style={styles.item} onPress={handleClickReportImageBtn}>
            <View style={styles.touchContainer}>
              <Text style={commentFont.BODY1}>잘못된 사진 제보</Text>
              <MaterialIcons name="arrow-forward-ios" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={handleClickReportRequestBtn}>
            <View style={styles.touchContainer}>
              <Text style={commentFont.BODY1}>부적절한 의뢰 신고</Text>
              <MaterialIcons name="arrow-forward-ios" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => handleReportPost(postId)}>
            <View style={styles.touchContainer}>
              <Text style={commentFont.BODY1}>차단</Text>
              <MaterialIcons name="arrow-forward-ios" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeContainer} onPress={onClose}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[commentFont.BODY1, styles.closeText]}>취소</Text>
            </View>
          </TouchableOpacity>
        </View>
        {isOpened && (
          <ReportBottomSheet postId={postId} category={category} visible={isOpened} setVisible={setIsOpened} />
        )}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    ...SigonganShadow.shadowTopHigh,
  },
  titleWrapper: {
    alignItems: 'center',
    paddingVertical: 15,
  },

  itemWrapper: {},
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  touchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  closeText: {
    color: Colors.Red.Default,
  },
  closeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.Red.Default,
    borderRadius: 12,
    marginHorizontal: 20,
    paddingVertical: 20,
  },
});

export default MenuBottomSheet;

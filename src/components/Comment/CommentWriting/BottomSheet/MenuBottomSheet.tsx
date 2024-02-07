import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import Toast from 'react-native-root-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { blockPost } from '../../../../api/axios';
import { authTokenState, fcmTokenState } from '../../../../states';
import { commentFont } from '../../styles';
import { Colors } from '../../../renewal';
import ReportBottomSheet from '../reportBottomSheet';
import MenuButton from './MenuButton';

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
  const [category, setCategory] = useState('');

  const insets = useSafeAreaInsets();

  const onClose = () => setVisible(false);

  const handleClickReportImageBtn = () => {
    setIsOpened(true);
    setCategory('image');
  };

  const handleClickReportRequestBtn = () => {
    setIsOpened(true);
    setCategory('request');
  };

  const handleReportPost = async () => {
    await blockPost(postId, fcmToken, authToken);
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
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={commentFont.BUTTON_TEXT}>메뉴</Text>
        </View>
        <View style={styles.divisionLine} />
        <View style={[styles.itemWrapper, { paddingBottom: insets.bottom || 16 }]}>
          <MenuButton content="잘못된 사진 제보" handleClick={handleClickReportImageBtn} />
          <MenuButton content="부적절한 의뢰 신고" handleClick={handleClickReportRequestBtn} />
          <MenuButton content="차단" handleClick={handleReportPost} />
          <TouchableOpacity style={styles.closeContainer} onPress={onClose}>
            <View style={styles.closeBtn}>
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
    backgroundColor: '#fff',
    paddingTop: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  titleWrapper: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  divisionLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#E8E8E8',
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
  closeBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

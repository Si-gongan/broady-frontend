import { View, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import Footer from '../../components/Comment/CommentWriting/Footer';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { ICurrentRequest } from '../../types/request';
import { getRequest } from '../../api/axios';
import { authTokenState, fcmTokenState } from '../../states';
import MessageList from '../../components/Comment/CommentWriting/MessageList';
import { useIsFocused } from '@react-navigation/native';
import MenuBottomSheet from '../../components/Comment/CommentWriting/BottomSheet/MenuBottomSheet';
import { BomHeader, PaddingHorizontal } from '../../components/renewal';

const SETTING_ICON_PATH =
  'M11.5625 27.5L11.0625 23.5C10.7917 23.3958 10.5365 23.2708 10.2969 23.125C10.0573 22.9792 9.82292 22.8229 9.59375 22.6562L5.875 24.2188L2.4375 18.2812L5.65625 15.8438C5.63542 15.6979 5.625 15.5573 5.625 15.4219V14.5781C5.625 14.4427 5.63542 14.3021 5.65625 14.1562L2.4375 11.7188L5.875 5.78125L9.59375 7.34375C9.82292 7.17708 10.0625 7.02083 10.3125 6.875C10.5625 6.72917 10.8125 6.60417 11.0625 6.5L11.5625 2.5H18.4375L18.9375 6.5C19.2083 6.60417 19.4635 6.72917 19.7031 6.875C19.9427 7.02083 20.1771 7.17708 20.4062 7.34375L24.125 5.78125L27.5625 11.7188L24.3438 14.1562C24.3646 14.3021 24.375 14.4427 24.375 14.5781V15.4219C24.375 15.5573 24.3542 15.6979 24.3125 15.8438L27.5312 18.2812L24.0938 24.2188L20.4062 22.6562C20.1771 22.8229 19.9375 22.9792 19.6875 23.125C19.4375 23.2708 19.1875 23.3958 18.9375 23.5L18.4375 27.5H11.5625ZM15.0625 19.375C16.2708 19.375 17.3021 18.9479 18.1562 18.0938C19.0104 17.2396 19.4375 16.2083 19.4375 15C19.4375 13.7917 19.0104 12.7604 18.1562 11.9062C17.3021 11.0521 16.2708 10.625 15.0625 10.625C13.8333 10.625 12.7969 11.0521 11.9531 11.9062C11.1094 12.7604 10.6875 13.7917 10.6875 15C10.6875 16.2083 11.1094 17.2396 11.9531 18.0938C12.7969 18.9479 13.8333 19.375 15.0625 19.375ZM15.0625 16.875C14.5417 16.875 14.099 16.6927 13.7344 16.3281C13.3698 15.9635 13.1875 15.5208 13.1875 15C13.1875 14.4792 13.3698 14.0365 13.7344 13.6719C14.099 13.3073 14.5417 13.125 15.0625 13.125C15.5833 13.125 16.026 13.3073 16.3906 13.6719C16.7552 14.0365 16.9375 14.4792 16.9375 15C16.9375 15.5208 16.7552 15.9635 16.3906 16.3281C16.026 16.6927 15.5833 16.875 15.0625 16.875ZM13.75 25H16.2188L16.6562 21.6875C17.3021 21.5208 17.901 21.276 18.4531 20.9531C19.0052 20.6302 19.5104 20.2396 19.9688 19.7812L23.0625 21.0625L24.2812 18.9375L21.5938 16.9062C21.6979 16.6146 21.7708 16.3073 21.8125 15.9844C21.8542 15.6615 21.875 15.3333 21.875 15C21.875 14.6667 21.8542 14.3385 21.8125 14.0156C21.7708 13.6927 21.6979 13.3854 21.5938 13.0938L24.2812 11.0625L23.0625 8.9375L19.9688 10.25C19.5104 9.77083 19.0052 9.36979 18.4531 9.04688C17.901 8.72396 17.3021 8.47917 16.6562 8.3125L16.25 5H13.7812L13.3438 8.3125C12.6979 8.47917 12.099 8.72396 11.5469 9.04688C10.9948 9.36979 10.4896 9.76042 10.0312 10.2188L6.9375 8.9375L5.71875 11.0625L8.40625 13.0625C8.30208 13.375 8.22917 13.6875 8.1875 14C8.14583 14.3125 8.125 14.6458 8.125 15C8.125 15.3333 8.14583 15.6562 8.1875 15.9688C8.22917 16.2812 8.30208 16.5938 8.40625 16.9062L5.71875 18.9375L6.9375 21.0625L10.0312 19.75C10.4896 20.2292 10.9948 20.6302 11.5469 20.9531C12.099 21.276 12.6979 21.5208 13.3438 21.6875L13.75 25Z';

const CommentWritingScreen = ({ navigation, route }: any) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);
  const { id } = route.params;
  const [currentRequest, setCurrentRequest] = useState<ICurrentRequest>({} as ICurrentRequest);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const isFocused = useIsFocused();

  const handleClickMenu = () => {
    setIsMenuVisible(true);
  };

  useEffect(() => {
    if (isFocused) {
      getRequest(id, fcmToken, authToken).then((data) => setCurrentRequest(data));
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <BomHeader
          text="해설 작성"
          rightIcon={{
            path: SETTING_ICON_PATH,
            onPress: handleClickMenu,
            accessibilityLabel: '',
          }}
          isBottomBorder
        />

        <PaddingHorizontal value={0}>
          <ScrollView style={styles.bodyContainer}>
            {Object.keys(currentRequest).length > 0 && <MessageList request={currentRequest} />}
          </ScrollView>
        </PaddingHorizontal>

        <Footer id={id} request={currentRequest} setRequest={setCurrentRequest} navigation={navigation} />
      </KeyboardAvoidingView>

      {isMenuVisible && (
        <MenuBottomSheet navigation={navigation} postId={id} visible={isMenuVisible} setVisible={setIsMenuVisible} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 0.7,
    marginBottom: 10,
  },
});

export default CommentWritingScreen;

import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { useRecoilValue } from 'recoil';
import { endComment, getCorrectText, stopComment } from '../../../api/axios';
import { authTokenState, fcmTokenState } from '../../../states';
import { ICurrentRequest } from '../../../types/request';
import Toast from 'react-native-root-toast';
import StopCommentBottomMenu from './BottomSheet/StopCommentBottomSheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IFCurrentCommentFooterProps {
  id: string;
  setRequest: (value: React.SetStateAction<ICurrentRequest>) => void;
  commentTimer: number;
  setStatus: (value: React.SetStateAction<number>) => void;
  navigation: any;
}

const CurrentCommentFooter = ({ id, setRequest, commentTimer, setStatus, navigation }: IFCurrentCommentFooterProps) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const [text, setText] = useState<string>('');
  const insets = useSafeAreaInsets();
  const [isSent, setIsSent] = useState(true);
  const [isStopComment, setIsStopComment] = useState(false);

  const handleClickAICorrectionBtn = async (inputText: string) => {
    const result = await getCorrectText(inputText);
    setText(result);
  };

  const handleCommentInput = (inputText: string) => {
    setText(inputText);
  };

  const handleClickSendBtn = async (id: string) => {
    setIsSent(false);
    if (text.length < 50) {
      showToastMessage('해설은 50자 이상 작성해야 전송이 가능합니다', 'CENTER');
      setTimeout(() => setIsSent(true), 1000);
      return;
    }
    try {
      const result = await endComment(id, text, fcmToken, authToken);
      setRequest(result);
      setText('');
    } catch (error) {
      Alert.alert('통신에 에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
      setIsSent(true);
    }
  };

  const handleStopCommentModal = () => {
    setIsStopComment(true);
  };

  const handleClickStopComment = async () => {
    await stopComment(id, fcmToken, authToken);
    setStatus(-1);
    navigation.navigate('Home');
    showToastMessage('해설을 넘겼습니다.', 'TOP');
  };

  const showToastMessage = (message: string, position: string) => {
    Toast.show(message, {
      duration: 1000,
      animation: true,
      position:
        position === 'CENTER' ? Toast.positions.CENTER : Platform.OS === 'ios' ? insets.top : Toast.positions.TOP,
    });
  };

  useEffect(() => {
    const willShowSubscription = Keyboard.addListener('keyboardWillShow', () => {
      //   setKeyboardStatus(true);
    });
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      //   setKeyboardStatus(true);
    });
    const willHideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      //   setKeyboardStatus(false);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      //   setKeyboardStatus(false);
    });

    return () => {
      willShowSubscription.remove();
      willHideSubscription.remove();
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Shadow
        distance={10}
        containerStyle={{ paddingBottom: 20 }}
        style={{ width: '100%' }}
        sides={{ top: true, bottom: false, start: false, end: false }}
      >
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.inputTextHeader}>
            <View style={styles.leftHeader}>
              <TouchableOpacity style={styles.AIBtn} onPress={() => handleClickAICorrectionBtn(text)}>
                <Text style={{ color: 'white' }}>AI다듬기</Text>
              </TouchableOpacity>
              <Text>{text.length} / 50 자</Text>
            </View>

            <View style={styles.timer}>
              <Text style={{ color: '#CF0000' }}>{commentTimer}분 남음</Text>
              <TouchableOpacity style={styles.commentQuit} onPress={handleStopCommentModal}>
                <Text style={{ color: 'white' }}>해설 넘기기</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputTextContainer}>
            <View style={{ flex: 0.75 }}>
              <TextInput
                placeholder="해설을 작성해주세요..."
                multiline
                onChangeText={(text) => handleCommentInput(text)}
                value={text}
                textAlignVertical="top"
                style={styles.inputBox}
                autoComplete="off"
              />
            </View>
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => handleClickSendBtn(id)}
              activeOpacity={0.6}
              disabled={!isSent}
            >
              <Image
                style={isSent ? { opacity: 1 } : { opacity: 0.5 }}
                source={require('../../../../assets/send.png')}
                alt=""
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Shadow>
      {isStopComment && (
        <StopCommentBottomMenu
          handleClickStopComment={handleClickStopComment}
          visible={isStopComment}
          setVisible={setIsStopComment}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  AIBtn: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.80)',
    padding: 10,
    borderRadius: 10,
    marginLeft: 20,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginRight: 20,
  },
  commentQuit: {
    backgroundColor: 'rgba(0, 0, 0, 0.80)',
    padding: 10,
    borderRadius: 10,
  },
  inputTextHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  inputTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    marginTop: 5,
    paddingLeft: 10,
    paddingTop: 15,
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#6E6E6E',
  },
  sendBtn: {
    flex: 0.15,
    alignItems: 'center',
  },
});

export default CurrentCommentFooter;

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
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../renewal';
import { commentFont } from '../styles';

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
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.AIBtn} onPress={() => handleClickAICorrectionBtn(text)}>
              <Text style={{ color: 'white' }}>AI다듬기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.commentQuit} onPress={handleStopCommentModal}>
              <Text style={{ color: 'white' }}>해설 넘기기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputTextContainer}>
            <View style={{ flex: 0.9, gap: 5 }}>
              <View style={styles.textContainer}>
                <TextInput
                  placeholder="해설을 작성해주세요..."
                  multiline
                  onChangeText={(text) => handleCommentInput(text)}
                  value={text}
                  textAlignVertical="top"
                  style={styles.inputBox}
                  autoComplete="off"
                />
                <TouchableOpacity
                  style={styles.sendBtn}
                  onPress={() => handleClickSendBtn(id)}
                  activeOpacity={0.6}
                  disabled={!isSent}
                >
                  <Icon
                    name="send"
                    style={isSent ? { opacity: 1 } : { opacity: 0.5 }}
                    color={Colors.Red.Default}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.commentTimerContainer}>
                <Text style={[commentFont.BODY2, styles.commentTimerText]}>{commentTimer}분 남음</Text>
                <Text style={commentFont.BODY2}>{text.length} / 50 자</Text>
              </View>
            </View>
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
    backgroundColor: Colors.Red.Default,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    // marginLeft: 20,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginRight: 20,
  },
  commentQuit: {
    justifyContent: 'center',
    backgroundColor: Colors.Red.Default,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 20,
    marginLeft: 20,
  },
  inputTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    marginTop: 5,
    paddingLeft: 10,
    paddingTop: 0,
    paddingBottom: 0,
    ...commentFont.BODY1,
    flex: 0.95,
  },
  sendBtn: {
    flex: 0.15,
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.Red.Default,
    height: 40,
  },
  commentTimerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
  commentTimerText: {
    color: '#D23928',
  },
});

export default CurrentCommentFooter;

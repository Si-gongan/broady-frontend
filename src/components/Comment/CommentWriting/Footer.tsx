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
import { endComment, getCorrectText, getRequest, startComment, stopComment } from '../../../api/axios';
import { authTokenState, fcmTokenState } from '../../../states';
import { ICurrentRequest } from '../../../types/request';
import Toast from 'react-native-root-toast';
import StopCommentBottomMenu from './BottomSheet/StopCommentBottomSheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IFooterProps {
  id: string;
  request: ICurrentRequest;
  setRequest: (value: React.SetStateAction<ICurrentRequest>) => void;
  commentTimer: number;
  navigation: any;
}

const Footer = ({ id, request, setRequest, commentTimer, navigation }: IFooterProps) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const [text, setText] = useState<string>('');
  const [status, setStatus] = useState<number>(-1); // -1: 해설전, 0: 해설중, 1: 해설완료
  const [isSent, setIsSent] = useState(true);
  const { isAvailable, isComplete } = request;

  const [isStopComment, setIsStopComment] = useState(false);

  const insets = useSafeAreaInsets();

  const handleClickAICorrectionBtn = async (inputText: string) => {
    const result = await getCorrectText(inputText);
    setText(result);
  };

  const handleStartComment = async (id: string) => {
    setStatus(0);
    await startComment(id, fcmToken, authToken)
      .then((data) => {
        if (data.code === 0) {
          getRequest(id, fcmToken, authToken).then((data) => setRequest(data));
        }
      })
      .catch(() => {
        Alert.alert('통신에 에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
        setStatus(-1);
      });
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
    if (isAvailable && isComplete === false) setStatus(-1);
    if (isAvailable === false && isComplete === false) setStatus(0);
    if (isAvailable === false && isComplete) setStatus(1);
  }, [isAvailable, isComplete]);

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

  // 해설 완료
  if (status === 1) {
    return (
      <>
        <Shadow
          distance={10}
          containerStyle={{ flex: 0.15 }}
          style={{ width: '100%', height: '100%' }}
          sides={{ top: true, bottom: false, start: false, end: false }}
        >
          <View style={styles.footerContainer}>
            <View style={styles.commentEndBtn}>
              <Text style={styles.commentText}>해설하기</Text>
            </View>
          </View>
        </Shadow>
      </>
    );
  }

  // 해설 작성 중
  if (status === 0) {
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
  }

  // 의뢰목록(해설 전)
  return (
    <>
      <Shadow
        distance={10}
        containerStyle={{ flex: 0.15 }}
        style={{ width: '100%', height: '100%' }}
        sides={{ top: true, bottom: false, start: false, end: false }}
      >
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.commentBtn} onPress={() => handleStartComment(id)}>
            <Text style={styles.commentText}>해설하기</Text>
          </TouchableOpacity>
        </View>
      </Shadow>
    </>
  );
};

const styles = StyleSheet.create({
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  commentBtn: {
    backgroundColor: '#2C2C2C',
    width: '90%',
    height: '80%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentEndBtn: {
    backgroundColor: 'rgba(44, 44, 44, 0.52)',
    width: '90%',
    height: '80%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentText: {
    color: 'white',
    fontSize: 22,
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

export default Footer;

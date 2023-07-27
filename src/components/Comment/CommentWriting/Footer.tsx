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
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { useRecoilValue } from 'recoil';
import { startComment } from '../../../api/axios';
import { authTokenState, fcmTokenState } from '../../../states';
import { ICurrentRequest } from '../../../types/request';
import { AuthColor } from '../../auth/styles';

interface IFooterProps {
  id: string;
  request: ICurrentRequest;
  commentTimer?: number;
  sendComment?: (text: string) => void;
  resetComment?: () => void;
}

const Footer = ({ id, request, commentTimer, sendComment, resetComment }: IFooterProps) => {
  const [text, setText] = useState<string>('');
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);
  //   const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [status, setStatus] = useState<number>(-1); // -1: 해설전, 0: 해설중, 1: 해설완료
  const [isSent, setIsSent] = useState(false);
  const { isAvailable, isComplete } = request;

  useEffect(() => {
    if (isAvailable && isComplete === false) setStatus(-1);
    if (isAvailable === false && isComplete === false) setStatus(0);
    if (isAvailable && isComplete) setStatus(1);
  }, [isAvailable, isComplete]);

  const handleStartComment = async (id: string) => {
    await startComment(id, fcmToken, authToken).then((data) => {
      if (data.code === 0) setStatus(0);
    });
  };

  const handleCommentInput = (inputText: string) => {
    if (inputText.length > 50) setIsSent(true);
    else setIsSent(false);
    setText(inputText);
    // console.log('공백포함:', inputText.length);
    // console.log('공백제외:', inputText.replaceAll(' ', '').length);
  };

  const handleClickSendBtn = () => {
    setIsSent(false);
    setText('');
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
              <TouchableOpacity style={styles.AIBtn}>
                <Text style={{ color: 'white' }}>AI다듬기</Text>
              </TouchableOpacity>
              <View style={styles.timer}>
                <Text style={{ color: '#CF0000' }}>{commentTimer}분 남음</Text>
                <TouchableOpacity style={styles.commentQuit} onPress={resetComment}>
                  <Text style={{ color: 'white' }}>해설포기</Text>
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
                onPress={handleClickSendBtn}
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

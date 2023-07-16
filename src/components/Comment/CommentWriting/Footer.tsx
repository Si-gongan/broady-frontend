import { useEffect, useRef, useState } from 'react';
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

const Footer = ({ status }: { status: number }) => {
  const [value, setValue] = useState<string>();
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const keyboardRef = useRef(0);

  useEffect(() => {
    const willShowSubscription = Keyboard.addListener('keyboardWillShow', (e) => {
      keyboardRef.current = e.endCoordinates.height;
      setKeyboardStatus(true);
    });
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      keyboardRef.current = e.endCoordinates.height;
      setKeyboardStatus(true);
    });
    const willHideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      keyboardRef.current = 0;
      setKeyboardStatus(false);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      keyboardRef.current = 0;
      setKeyboardStatus(false);
    });

    return () => {
      willShowSubscription.remove();
      willHideSubscription.remove();
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
      {status === 0 ? (
        <Shadow
          distance={10}
          containerStyle={{ flex: 0.2 }}
          style={{ width: '100%', height: '100%' }}
          sides={{ top: true, bottom: false, start: false, end: false }}
        >
          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.commentBtn}>
              <Text style={styles.commentText}>해설하기</Text>
            </TouchableOpacity>
          </View>
        </Shadow>
      ) : (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Shadow
            distance={10}
            containerStyle={{ height: 140 }}
            style={{ width: '100%', height: '100%' }}
            sides={{ top: true, bottom: false, start: false, end: false }}
          >
            <ScrollView keyboardShouldPersistTaps="always">
              <View style={styles.inputTextHeader}>
                <TouchableOpacity style={styles.AIBtn}>
                  <Text style={{ color: 'white' }}>AI다듬기</Text>
                </TouchableOpacity>
                <View style={styles.timer}>
                  <Text style={{ color: '#CF0000' }}>3분 남음</Text>
                  <TouchableOpacity style={styles.commentQuit}>
                    <Text style={{ color: 'white' }}>해설포기</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputTextContainer}>
                <View style={{ flex: 0.75 }}>
                  <TextInput
                    placeholder="해설을 작성해주세요..."
                    multiline
                    onChangeText={(text) => setValue(text)}
                    value={value}
                    textAlignVertical="top"
                    style={styles.inputBox}
                  />
                </View>
                <TouchableOpacity style={styles.sendBtn}>
                  <Image source={require('../../../../assets/send.png')} alt="" />
                </TouchableOpacity>
                <Text>{keyboardStatus}</Text>
              </View>
            </ScrollView>
          </Shadow>
        </KeyboardAvoidingView>
      )}
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

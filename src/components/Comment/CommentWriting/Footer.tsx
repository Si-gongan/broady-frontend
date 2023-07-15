import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const Footer = ({ status }: { status: number }) => {
  const [value, setValue] = useState<string>();

  return (
    <>
      <Shadow
        distance={10}
        containerStyle={status === 0 ? { flex: 0.2 } : { flex: 0.4 }}
        style={{ width: '100%', height: '100%' }}
        sides={{ top: true, bottom: false, start: false, end: false }}
      >
        {status === 0 ? (
          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.commentBtn}>
              <Text style={styles.commentText}>해설하기</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
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
            </View>
          </>
        )}
      </Shadow>
    </>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
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
});

export default Footer;

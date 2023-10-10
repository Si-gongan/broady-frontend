import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRecoilValue } from 'recoil';
import { commentColor, commentFont } from '../../components/Comment/styles';
import Header from '../../components/common/Header';
import { Colors } from '../../components/renewal';
import { authTokenState, fcmTokenState, nicknameState } from '../../states';
import { useUserState } from '../../providers';
import Toast from 'react-native-root-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NicknameScreen = ({ navigation }: { navigation: any }) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);
  const nickname = useRecoilValue(nicknameState);

  const insets = useSafeAreaInsets();

  const { changeNickname } = useUserState();

  const [nicknameInput, setNicknameInput] = useState<string>(nickname || '');

  const handleChangeInput = (text: string) => {
    setNicknameInput(text);
  };

  const showToastMessage = (message: string, position: string) => {
    Toast.show(message, {
      duration: 1000,
      animation: true,
      position:
        position === 'CENTER' ? Toast.positions.CENTER : Platform.OS === 'ios' ? insets.top : Toast.positions.TOP,
    });
  };

  const handleClickNewNickname = async () => {
    try {
      await changeNickname('Comment', nicknameInput, fcmToken, authToken);
      navigation.navigate('마이페이지');
    } catch (error) {
      showToastMessage('기존 닉네임과 동일합니다.', 'TOP');
      console.log('NICKNAME EDIT ERROR: ', error);
    }
  };

  return (
    <View>
      <Header isBack={true}>닉네임 설정</Header>
      <View style={{ margin: 20, alignItems: 'center' }}>
        <Text style={commentFont.BODY1}>사용하실 닉네임을 입력해주세요.</Text>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="기존 닉네임"
            placeholderTextColor="#5E5E5E"
            onChangeText={(text) => handleChangeInput(text)}
            value={nicknameInput}
            style={styles.inputBox}
          />
          <TouchableOpacity style={[styles.nicknameButton]} activeOpacity={0.6} onPress={handleClickNewNickname}>
            <Text style={{ color: 'white', fontSize: 16 }}>설정 완료하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
    justifyContent: 'center',
  },
  inputBox: {
    marginTop: 5,
    paddingLeft: 10,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#767676',
    ...commentFont.BODY1,
  },
  nicknameButton: {
    height: 50,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Red.Default,
    borderRadius: 10,
  },
});

export default NicknameScreen;

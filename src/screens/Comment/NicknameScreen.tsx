import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRecoilValue } from 'recoil';
import { commentColor } from '../../components/Comment/styles';
import Header from '../../components/common/Header';
import { authTokenState, fcmTokenState, nicknameState } from '../../states';

const NicknameScreen = ({ navigation }: { navigation: any }) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);
  const nickname = useRecoilValue(nicknameState);

  const [nicknameInput, setNicknameInput] = useState<string>(nickname || '');

  const handleChangeInput = (text: string) => {
    setNicknameInput(text);
  };

  const handleClickNewNickname = () => {
    // TODO: 닉네임 설정 API 완료 후 route
    navigation.navigate('마이페이지');
  };

  return (
    <View>
      <Header navigation={navigation}>{''}</Header>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 26 }}>닉네임 설정</Text>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 16 }}>사용하실 닉네임을 입력해주세요.</Text>
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
    // height: 100,
    justifyContent: 'center',
  },
  inputBox: {
    ...commentColor.inputBackgroundColor,
    marginTop: 5,
    paddingLeft: 10,
    height: 50,
    fontSize: 16,
    borderRadius: 10,
  },
  nicknameButton: {
    height: 50,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D2D2D',
    borderRadius: 10,
  },
});

export default NicknameScreen;

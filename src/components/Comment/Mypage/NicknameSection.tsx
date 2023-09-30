import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { nicknameState } from '../../../states';
import { SigonganDesign } from '../../sigongan/styles';
import { commentFont } from '../styles';

const NicknameSection = ({ navigation }: any) => {
  const nickname = useRecoilValue(nicknameState);

  return (
    <View>
      <View style={styles.headerTextContainer}>
        <Text style={commentFont.HEADER}>
          <Text style={styles.bold}>{nickname}님</Text>은 오늘까지
        </Text>
        <Text style={commentFont.HEADER}>
          <Text style={styles.bold}>총 32명</Text>의 시각장애인을 도왔어요!
        </Text>
      </View>
      <View style={[SigonganDesign.myPageGrid, styles.boxContainer]}>
        <TouchableOpacity onPress={() => navigation.navigate('Nickname')}>
          <Text style={commentFont.BODY1}>닉네임 설정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTextContainer: {
    marginBottom: 10,
  },
  boxContainer: {
    paddingVertical: 17,
    paddingHorizontal: 14,
    gap: 18,
  },
  nicknameText: {
    color: '#111E4F',
    fontSize: 16,
  },
  bold: {
    lineHeight: 25,
    color: '#F589A5',
  },
});

export default NicknameSection;

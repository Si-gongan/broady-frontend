import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { SigonganDesign } from '../../sigongan/styles';

const NicknameSection = ({ navigation }: any) => {
  return (
    <View style={[SigonganDesign.myPageGrid, styles.boxContainer]}>
      <View>
        <Text style={styles.nicknameText}>
          <Text style={styles.bold}>곰지님</Text>은 오늘까지
        </Text>
        <Text style={styles.nicknameText}>
          <Text style={styles.bold}>총 32명</Text>의 시각장애인을 도왔어요!
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Nickname')}>
        <Text style={SigonganDesign.myPageContent}>닉네임 설정</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontWeight: '600',
    lineHeight: 25,
  },
});

export default NicknameSection;

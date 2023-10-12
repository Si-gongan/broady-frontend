import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Header from '../../components/common/Header';
import { getDateText, getYYMMDDHHMM } from '../../utils/time';

const AnnounceScreen = ({ route }: any) => {
  const { type, reportedAt, reason } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Header isBack={true}>공지사항</Header>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ marginTop: 25 }}>
        <View style={styles.mainTextContainer}>
          <Text style={styles.mainText}>{type}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{getYYMMDDHHMM(reportedAt)}</Text>
        </View>
        <View style={{ width: '90%' }}>
          <Text style={{ fontSize: 16 }}>
            {getDateText(reportedAt)}에 제공한 해설에 대해 아래와 같은 운영정책 위반 사항이 확인되었습니다.
            {'\n\n'}해설 내용 : 세 마리의 고양이가 나란히 밥그릇의 사료를 먹고 있는 모습을 위에서 촬영한 사진입니다.
            {'\n\n'}위반 사유 : {reason}
            {'\n\n'}서비스 운영정책 위반으로 서비스 이용이 다음과 같이 제한됩니다.
            {'\n\n'}이용제한 : 경고 2회
            {'\n\n'}문의사항이 있을 경우, 1:1 문의를 이용해주세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainTextContainer: {
    width: '90%',
    paddingVertical: 20,
  },
  dateContainer: {
    gap: 10,
    width: '90%',
    paddingBottom: 20,
  },
  mainText: {
    fontSize: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#4B4B4B',
  },
});

export default AnnounceScreen;

import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/common/Header';

const AnnounceScreen = ({ navigation }: any) => {
  // TODO: id 값만 파라미터로 넘겨줘서 id값으로 API 호출
  const [announceList, setAnnounceList] = useState([
    {
      id: 0,
      title: '운영정책 위반 알림',
      date: '2023-09-01',
    },
    {
      id: 1,
      title: '글 제목',
      date: '2023-09-02',
    },
    {
      id: 2,
      title: '글 제목2',
      date: '2023-09-03',
    },
  ]);

  return (
    <>
      <Header isBack={true}>공지사항</Header>
      <ScrollView>
        {announceList.map((announce) => (
          <TouchableOpacity
            key={announce.id}
            style={styles.announceContainer}
            onPress={() => navigation.navigate('AnnounceContent', { title: announce.title })}
          >
            <Text style={styles.refundText}>{announce.title}</Text>
            <Text style={styles.refundDate}>{announce.date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  announceContainer: {
    borderBottomWidth: 2,
    borderColor: '#E8E8E8',
    gap: 10,
    marginHorizontal: 15,
    paddingVertical: 20,
  },
  refundText: {
    fontSize: 16,
  },
  refundDate: {
    fontSize: 14,
    color: '#4B4B4B',
  },
});

export default AnnounceScreen;

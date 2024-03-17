import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRecoilValue } from 'recoil';
import { getReportList } from '../../api/axios';
import { commentFont } from '../../components/Comment/styles';
import { authTokenState, fcmTokenState } from '../../states';
import { getYYMMDD } from '../../utils/time';
import { BomHeader } from '../../components/renewal';

interface IAnnounce {
  _id: string;
  reportedBy: string;
  reportedAt: Date;
  type: string;
  reason: string;
  reportText: string;
  fcm: string;
  userId: string;
  postId: string;
  isDone: boolean;
  warningStatus: number | null;
  warningDate: Date | null;
  warningReason: string | null;
}

const AnnounceScreen = ({ navigation }: any) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const [announceList, setAnnounceList] = useState<IAnnounce[]>([]);

  const isFocused = useIsFocused();

  const handleClickReportContent = (id: string) => {
    if (id === 'notice') {
      navigation.navigate('AnnounceContent', { announce: { announceType: 'notice' } });
      return;
    }

    const selectedContent = announceList.filter((announce) => announce._id === id);
    navigation.navigate('AnnounceContent', { announce: { announceType: 'report', ...selectedContent[0] } });
  };

  useEffect(() => {
    if (isFocused) {
      getReportList(fcmToken, authToken).then((announces) => {
        setAnnounceList(announces);
      });
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BomHeader text="공지사항" isBottomBorder />

      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity style={styles.announceContainer} onPress={() => handleClickReportContent('notice')}>
          <Text style={styles.refundText}>공지사항 알림</Text>
          <Text style={styles.refundDate}>2024-03-17</Text>
        </TouchableOpacity>

        {announceList.length > 0 &&
          announceList.map((announce) => (
            <TouchableOpacity
              key={announce._id}
              style={styles.announceContainer}
              onPress={() => handleClickReportContent(announce._id)}
            >
              <Text style={styles.refundText}>{announce.type}</Text>
              <Text style={styles.refundDate}>{getYYMMDD(new Date(announce.reportedAt))}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
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
  announceTextContainer: {
    paddingTop: 20,
    alignItems: 'center',
  },
});

export default AnnounceScreen;

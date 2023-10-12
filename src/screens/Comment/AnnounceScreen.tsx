import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRecoilValue } from 'recoil';
import { getReportList } from '../../api/axios';
import { commentFont } from '../../components/Comment/styles';
import Header from '../../components/common/Header';
import { authTokenState, fcmTokenState } from '../../states';
import { getYYMMDD } from '../../utils/time';

interface IAnnounceListProp {
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

  const [announceList, setAnnounceList] = useState<IAnnounceListProp[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getReportList(fcmToken, authToken).then((announces) => {
        setAnnounceList(announces);
      });
    }
  }, [isFocused]);

  return (
    <>
      <Header isBack={true}>공지사항</Header>
      <ScrollView>
        {announceList.length > 0 ? (
          announceList.map((announce) => (
            <TouchableOpacity
              key={announce._id}
              style={styles.announceContainer}
              onPress={() => navigation.navigate('AnnounceContent', { title: announce.type })}
            >
              <Text style={styles.refundText}>{announce.type}</Text>
              <Text style={styles.refundDate}>{getYYMMDD(new Date(announce.reportedAt))}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.announceTextContainer}>
            <Text style={commentFont.BODY1}>등록된 공지사항이 없습니다.</Text>
          </View>
        )}
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
  announceTextContainer: {
    paddingTop: 20,
    alignItems: 'center',
  },
});

export default AnnounceScreen;

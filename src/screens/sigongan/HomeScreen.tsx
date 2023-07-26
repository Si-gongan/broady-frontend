import { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import {
  CommentRequestButton,
  CommentRequestPopup,
  ICommentRequestPopupHandler,
  RequestImageCard,
  RequestTextCard,
} from '../../components/sigongan/home';
import { useNavigation } from '@react-navigation/native';
import { AWS_BUCKET_BASE_URL } from '@env';

import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';

import { GetRequestList, IReqeustListItem } from '../../api/axios/sigongan';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SigonganStackParamList } from '../../navigations';

export const HomeScreen = () => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const [requestList, setRequestList] = useState<IReqeustListItem[]>([]);

  const navigation = useNavigation<NativeStackNavigationProp<SigonganStackParamList>>();
  const commentRequestPopupRef = useRef<ICommentRequestPopupHandler>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fcmToken) {
      LoadRequestList();
    }
  }, [fcmToken]);

  const LoadRequestList = async () => {
    try {
      setLoading(true);
      const res = await GetRequestList(fcmToken);

      const tempList = res.data.result.posts;
      setRequestList(tempList);
    } catch {
      // what to do?
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CommentRequestButton onPress={() => commentRequestPopupRef.current?.open()} />

      <View style={styles.requestList}>
        <FlatList
          data={requestList.sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1))}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 17 }} />}
          onRefresh={() => LoadRequestList()}
          refreshing={loading}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              accessible
              accessibilityLabel={`${item.requestedUser[0].text} 의뢰 상세보기`}
              onPress={() => navigation.navigate('해설 진행현황', { item })}
            >
              <View style={styles.requestItem}>
                <RequestImageCard imgUrl={AWS_BUCKET_BASE_URL + '/' + item.photo} />
                <RequestTextCard date={item.createdAt} content={item.requestedUser[0].text} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <CommentRequestPopup ref={commentRequestPopupRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  requestList: {
    flex: 1,

    marginTop: 25,
    marginBottom: 15,
  },
  requestItem: {
    flexDirection: 'row',

    gap: 15,
  },
});

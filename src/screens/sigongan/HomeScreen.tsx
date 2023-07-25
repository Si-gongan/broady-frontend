import { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
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

import { GetRequestList, IReqeustListItem } from '../../api/axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SigonganStackParamList } from '../../navigations';

export const HomeScreen = () => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const [requestList, setRequestList] = useState<IReqeustListItem[]>([]);

  const navigation = useNavigation<NativeStackNavigationProp<SigonganStackParamList>>();
  const commentRequestPopupRef = useRef<ICommentRequestPopupHandler>(null);

  useEffect(() => {
    if (fcmToken) {
      LoadRequestList();
    }
  }, [fcmToken]);

  const LoadRequestList = async () => {
    try {
      const res = await GetRequestList(fcmToken);

      const tempList = res.data.result.posts;
      setRequestList(tempList);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <CommentRequestButton onPress={() => commentRequestPopupRef.current?.open()} />

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.requestList}>
          {requestList
            .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1))
            .map((item) => (
              <TouchableOpacity
                key={item.id}
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
            ))}
        </View>
      </ScrollView>

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
    alignItems: 'center',

    gap: 14,
  },
  requestItem: {
    flexDirection: 'row',

    gap: 15,
  },
});

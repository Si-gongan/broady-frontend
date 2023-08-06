import { useState, useRef, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SigonganStackParamList } from '../../navigations';

import { GetRequestList, IReqeustListItem } from '../../api/axios/sigongan';

import { SigonganHeader } from '../../components/sigongan/SigonganHeader';
import {
  CommentRequestButton,
  CommentRequestPopup,
  ICommentRequestPopupHandler,
  RequestImageCard,
  RequestTextCard,
} from '../../components/sigongan/home';
import { NoticeError } from '../../api/axios';

export const HomeScreen = () => {
  // page move
  const navigation = useNavigation<NativeStackNavigationProp<SigonganStackParamList>>();

  // api
  const fcmToken = useRecoilValue(fcmTokenState);
  const [requestList, setRequestList] = useState<IReqeustListItem[]>([]);
  const [loading, setLoading] = useState(false);

  // popup
  const commentRequestPopupRef = useRef<ICommentRequestPopupHandler>(null);

  useFocusEffect(
    useCallback(() => {
      if (fcmToken) {
        LoadRequestList();
      }
    }, [fcmToken])
  );

  // get list
  const LoadRequestList = async () => {
    try {
      setLoading(true);
      const res = await GetRequestList(fcmToken);

      const tempList = res.data.result.posts;
      setRequestList(tempList);
    } catch {
      NoticeError();
    } finally {
      setLoading(false);
    }
  };

  const getAppreciatedText = (item: IReqeustListItem) =>
    item.responseUser
      .filter((chat) => chat.appreciated)
      .map((chat) => ({
        text: chat.appreciatedText ?? '',
        createdAt: chat.appreciatedDate ?? '',
      }));

  // const getLastChat = (item: IReqeustListItem) =>
  //   [...item.requestedUser, ...item.responseUser, ...getAppreciatedText(item)].sort((a, b) =>
  //     new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
  //   )[0].text;

  const getLastChat = (item: IReqeustListItem) =>
    [...item.requestedUser, ...item.responseUser].sort((a, b) =>
      new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
    )[0].text;

  return (
    <View style={styles.container}>
      <SigonganHeader text="홈" hideBackButton />

      {/* 해설 의뢰하기 버튼 */}
      <CommentRequestButton onPress={() => commentRequestPopupRef.current?.open()} />

      {/* 의뢰 목록 */}
      <View style={styles.requestList}>
        <FlatList
          data={requestList.sort((a, b) => (new Date(a.updatedAt) > new Date(b.updatedAt) ? -1 : 1))}
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
                <RequestImageCard imgUrl={process.env.EXPO_PUBLIC_AWS_BUCKET_BASE_URL + '/' + item.photo} />
                <RequestTextCard date={item.updatedAt} content={getLastChat(item)} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* 팝업 */}
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

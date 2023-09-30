import { useState, useRef, useCallback } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { useRecoilValue } from 'recoil';
import { fcmTokenState } from '../../states';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SigonganStackParamList } from '../../navigations';

import { GetRequestList, IReqeustListItem } from '../../api/axios/sigongan';

import { NoticeError } from '../../api/axios';
import {
  Header,
  LongButton,
  PaddingHorizontal,
  RequestItem,
  TabBar,
  IImageMethodPopupHandler,
  ImageMethodPopup,
} from '../../components/renewal';

export const HomeScreen = () => {
  // page move
  const navigation = useNavigation<NativeStackNavigationProp<SigonganStackParamList>>();

  // api
  const fcmToken = useRecoilValue(fcmTokenState);
  const [requestList, setRequestList] = useState<IReqeustListItem[]>([]);
  const [loading, setLoading] = useState(false);

  // popup
  const ImageMethodPopupRef = useRef<IImageMethodPopupHandler>(null);

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
  const getShortChat = (s: string) => (s.length > 50 ? s.slice(0, 50) + '...' : s);

  return (
    <SafeAreaView style={styles.container}>
      <Header text="홈" hideBackButton isBottomBorder />

      <PaddingHorizontal value={20}>
        <View style={styles.topButton}>
          <LongButton
            text="+ 해설자에게 질문하기"
            theme="secondary"
            onPress={() => ImageMethodPopupRef.current?.open()}
          />
        </View>

        <View style={styles.list}>
          <FlatList
            data={requestList.sort((a, b) => (new Date(a.updatedAt) > new Date(b.updatedAt) ? -1 : 1))}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
            onRefresh={() => LoadRequestList()}
            refreshing={loading}
            renderItem={({ item }) => (
              <RequestItem
                onPress={() => navigation.navigate('해설 진행현황', { item })}
                imgUrl={process.env.EXPO_PUBLIC_AWS_BUCKET_BASE_URL + '/' + item.photo}
                date={item.updatedAt}
                chat={getShortChat(getLastChat(item))}
              />
            )}
          />
        </View>
      </PaddingHorizontal>

      <TabBar currentIndex={0} />

      <ImageMethodPopup ref={ImageMethodPopupRef} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topButton: {
    marginTop: 30,
  },
  list: {
    flex: 1,

    marginTop: 30,
  },
});

import { StyleSheet, FlatList, View } from 'react-native';
import { ICurrentRequest } from '../../../types/request';
import RequestItem from './RequestItem';

const RequestList = ({
  navigation,
  requestList,
  setRequestList,
}: {
  navigation: any;
  requestList: ICurrentRequest[];
  setRequestList: (value: React.SetStateAction<ICurrentRequest[]>) => void;
}) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={requestList}
      initialNumToRender={4}
      renderItem={({ item }) => <RequestItem request={item} setRequestList={setRequestList} navigation={navigation} />}
      keyExtractor={(item) => String(item.id)}
      columnWrapperStyle={styles.cardContainer}
      ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
      numColumns={2}
      onEndReachedThreshold={0.8}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'space-between',
    gap: 30,
    marginHorizontal: 20,
  },
});

export default RequestList;

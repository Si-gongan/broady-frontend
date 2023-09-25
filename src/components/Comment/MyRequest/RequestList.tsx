import { StyleSheet, FlatList, View } from 'react-native';
import { ICurrentRequest } from '../../../types/request';
import RequestItem from './RequestItem';

const RequestList = ({
  navigation,
  requestList,
  setProceedRequest,
  status,
}: {
  navigation: any;
  requestList: ICurrentRequest[];
  setProceedRequest: (value: React.SetStateAction<ICurrentRequest[]>) => void;
  status: number;
}) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={requestList}
      renderItem={({ item }) => (
        <RequestItem request={item} setProceedRequest={setProceedRequest} status={status} navigation={navigation} />
      )}
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

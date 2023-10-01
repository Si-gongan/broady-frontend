import { StyleSheet, FlatList, View } from 'react-native';
import { IRequest } from '../../../types/request';
import RequestItem from './RequestItem';

const RequestList = ({ requestList, navigation }: { requestList: IRequest[]; navigation: any }) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={requestList}
      renderItem={({ item }) => <RequestItem request={item} navigation={navigation} />}
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
    margin: 20,
  },
});

export default RequestList;

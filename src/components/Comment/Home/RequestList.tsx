import { StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { IRequest } from '../../../types/request';
import RequestItem from './RequestItem';

const RequestList = ({ requestList, navigation }: { requestList: IRequest[]; navigation?: any }) => {
  return (
    <ScrollView contentContainerStyle={styles.cardContainer}>
      {requestList.map((request: IRequest) => (
        <RequestItem key={request.id} request={request} navigation={navigation} />
      ))}
    </ScrollView>
    // <FlatList
    //   keyExtractor={(item, index) => index.toString()}
    //   data={requestList}
    //   contentContainerStyle={{ width: '90%', marginLeft: 35 }}
    //   renderItem={({ item }) => (
    //     <TouchableOpacity>
    //       <RequestItem key={item.id} request={item} />
    //     </TouchableOpacity>
    //   )}
    //   columnWrapperStyle={{ gap: 20 }}
    //   ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
    //   numColumns={2}
    // ></FlatList>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 35,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 30,
    marginBottom: 30,
  },
});

export default RequestList;

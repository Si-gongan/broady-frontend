import { StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { ICurrentRequest } from '../../../types/request';
import RequestItem from './RequestItem';

const RequestList = ({
  navigation,
  requestList,
  status,
}: {
  navigation: any;
  requestList: ICurrentRequest[];
  status: number;
}) => {
  return (
    <ScrollView contentContainerStyle={styles.cardContainer}>
      {requestList.map((request: ICurrentRequest) => (
        <RequestItem key={request.id} request={request} status={status} navigation={navigation} />
      ))}
    </ScrollView>
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

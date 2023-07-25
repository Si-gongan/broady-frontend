import { StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { ICurrentRequest, IRequest } from '../../../types/request';
import RequestItem from './RequestItem';

interface IRequestItem {
  id: string;
  createdAt: Date;
  text: string;
}

const RequestList = ({ requestList, navigation }: { requestList: ICurrentRequest[]; navigation?: any }) => {
  return (
    <ScrollView contentContainerStyle={styles.cardContainer}>
      {requestList.map((request: ICurrentRequest) => (
        <RequestItem key={request.id} request={request.requestedUser} navigation={navigation} />
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

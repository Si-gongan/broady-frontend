import { StyleSheet, ScrollView } from 'react-native';
import { IRequest } from '../../../types/request';
import RequestItem from './RequestItem';

const RequestList = ({ requestList, navigation }: { requestList: IRequest[]; navigation: any }) => {
  return (
    <ScrollView contentContainerStyle={styles.cardContainer}>
      {requestList.map((request: IRequest) => (
        <RequestItem key={request.id} request={request} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 30,
  },
});

export default RequestList;

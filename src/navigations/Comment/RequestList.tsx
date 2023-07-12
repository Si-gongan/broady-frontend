import { View, StyleSheet } from 'react-native';
import { IRequest } from '../../types/request';
import RequestItem from './RequestItem';

const RequestList = ({ requestList }: { requestList: IRequest[] }) => {
  return (
    <View style={styles.cardContainer}>
      {requestList.map((request: IRequest) => (
        <RequestItem key={request.id} request={request} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 30,
  },
});

export default RequestList;

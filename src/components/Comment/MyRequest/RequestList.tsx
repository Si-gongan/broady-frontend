import { StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { ICurrentRequest } from '../../../types/request';
import RequestItem from './RequestItem';

const RequestList = ({
  navigation,
  requestList,
  setCurrentRequest,
  status,
}: {
  navigation: any;
  requestList: ICurrentRequest[];
  setCurrentRequest: any;
  status: number;
}) => {
  return (
    <ScrollView contentContainerStyle={styles.cardContainer}>
      {requestList.map((request: ICurrentRequest) => (
        <RequestItem
          key={request.id}
          request={request}
          setCurrentRequest={setCurrentRequest}
          status={status}
          navigation={navigation}
        />
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

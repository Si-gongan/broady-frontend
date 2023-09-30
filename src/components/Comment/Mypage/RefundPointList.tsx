import { View, StyleSheet, ScrollView } from 'react-native';
import { IPoint } from '../../../types/user';
import RefundPointItem from './RefundPointItem';

const RefundPointList = ({ pointList }: { pointList: IPoint[] }) => {
  return (
    <View style={styles.refundPointContainer}>
      <ScrollView>
        {pointList.map((refund: IPoint, idx: number) => (
          <RefundPointItem key={idx} refund={refund}></RefundPointItem>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  refundPointContainer: {
    flex: 1,
    marginBottom: 120,
  },
});

export default RefundPointList;

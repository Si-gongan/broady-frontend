import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { IPoint } from '../../../types/user';
import { getRefundDate } from '../../../utils/time';

const RefundPointItem = ({ refund }: { refund: IPoint }) => {
  const date = getRefundDate(refund.date);
  return (
    <View style={styles.refundPointItem}>
      <View style={styles.refundPointContainer}>
        <Text style={styles.refundText}>{refund.description}</Text>
        <Text style={styles.refundText}>{refund.point}</Text>
      </View>
      <Text style={styles.refundDate}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  refundPointItem: {
    borderTopWidth: 2,
    borderColor: '#E8E8E8',
    gap: 10,
    marginHorizontal: 15,
    paddingVertical: 20,
  },
  refundPointContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  refundText: {
    fontSize: 16,
  },
  refundDate: {
    fontSize: 14,
  },
});

export default RefundPointItem;

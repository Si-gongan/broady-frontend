import { View, Text, StyleSheet } from 'react-native';
import { IPoint } from '../../../types/user';
import { getRefundDate } from '../../../utils/time';
import { Colors } from '../../renewal';
import { commentFont } from '../styles';

const RefundPointItem = ({ refund }: { refund: IPoint }) => {
  const date = getRefundDate(refund.date);
  return (
    <View style={styles.refundPointItem}>
      <View style={styles.refundPointContainer}>
        <Text style={commentFont.BODY1}>{refund.description}</Text>
        <Text style={styles.refundText}>{refund.point}</Text>
      </View>
      <Text style={commentFont.BODY2}>{date}</Text>
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
    color: Colors.Red.Default,
  },
  refundDate: {
    fontSize: 14,
  },
});

export default RefundPointItem;

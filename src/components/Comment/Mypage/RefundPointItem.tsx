import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

interface IRefund {
  id: number;
  content: string;
  point: number;
  isGetPoint: boolean;
  refundedAt: string;
}

const RefundPointItem = ({ refund }: { refund: IRefund }) => {
  return (
    <View style={styles.refundPointItem}>
      <View style={styles.refundPointContainer}>
        <Text style={styles.refundText}>{refund.content}</Text>
        <Text style={styles.refundText}>
          {refund.isGetPoint ? '+' : '-'} {refund.point}
        </Text>
      </View>
      <Text style={styles.refundText}>{refund.refundedAt}</Text>
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
});

export default RefundPointItem;

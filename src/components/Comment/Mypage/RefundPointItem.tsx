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
    <View style={{ borderTopWidth: 2, borderColor: '#E8E8E8', gap: 10, marginHorizontal: 15, paddingVertical: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16 }}>{refund.content}</Text>
        <Text style={{ fontSize: 16 }}>
          {refund.isGetPoint ? '+' : '-'} {refund.point}
        </Text>
      </View>
      <Text style={{ fontSize: 16 }}>{refund.refundedAt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  refundPointItem: {},
});

export default RefundPointItem;

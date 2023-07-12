import { View, Text, StyleSheet } from 'react-native';
import { SigonganColor } from './styles';

type RequestTextCardProps = {
  date: string;
  content: string;
};

export const RequestTextCard = ({ date, content }: RequestTextCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text>날짜</Text>

        <Text>어떤 사진인지 궁금해요.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 247,
    height: 90,

    backgroundColor: SigonganColor.requestTextCard,

    borderRadius: 13,
  },
  textWrapper: {
    paddingHorizontal: 11,
    paddingVertical: 12,

    gap: 10,
  },
  text: {
    fontSize: 12,
    fontStyle: 'normal',
  },
});

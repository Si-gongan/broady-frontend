import { View, Text, StyleSheet, Platform } from 'react-native';
import { SigonganColor, SigonganFont } from '../styles';
import { getConvertDate } from '../../../utils/time';

type RequestTextCardProps = {
  date: string;
  content: string;
};

export const RequestTextCard = ({ date, content }: RequestTextCardProps) => {
  return (
    <View style={[styles.container, SigonganColor.backgroundTeritary]}>
      <View style={styles.textWrapper}>
        <Text style={SigonganFont.quaternary}>{getConvertDate(new Date(date))}</Text>

        <Text style={SigonganFont.quaternary}>{content}</Text>
      </View>
    </View>
  );
};

const textCardWidth = () => (Platform.OS === 'ios' ? 247 : 224);

const styles = StyleSheet.create({
  container: {
    width: textCardWidth(),
    height: 90,

    borderRadius: 13,
  },
  textWrapper: {
    paddingHorizontal: 11,
    paddingVertical: 12,

    gap: 10,
  },
});

import { View, Text, StyleSheet } from 'react-native';
import { SigonganColor, SigonganFont } from '../styles';
import { getFormattedTime } from '../../../utils/time';

type TimeViewerProps = {
  date: string;
};

export const TimeViewer = ({ date }: TimeViewerProps) => {
  return (
    <View style={styles.container}>
      <Text style={[SigonganFont.quaternary, SigonganColor.contentQuinary]}>{getFormattedTime(date)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
  },
});

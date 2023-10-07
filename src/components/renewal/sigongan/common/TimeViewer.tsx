import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Utils } from '../../styles';
import { getFormattedTime } from '../../utils';

type TimeViewerProps = {
  date: string;
};

export const TimeViewer = ({ date }: TimeViewerProps) => {
  return (
    <View style={styles.container}>
      <Text style={[Fonts.Regular10, Utils.fontColor(Colors.Font.secondary)]}>{getFormattedTime(date)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
  },
});

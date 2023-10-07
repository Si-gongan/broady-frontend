import { View, Text, StyleSheet } from 'react-native';
import { getDateInfo, getDayOfWeek } from '../../utils';
import { Colors, Fonts, Utils } from '../../styles';

type DateViewerProps = {
  date: string;
};

export const DateViewer = ({ date }: DateViewerProps) => {
  const targetDate = new Date(date);

  const { year, month, day } = getDateInfo(targetDate);
  const dayOfWeek = getDayOfWeek(targetDate);

  return (
    <View style={styles.dateWrapper}>
      <Text
        style={[Fonts.Regular12, Utils.fontColor(Colors.Font.primary)]}
      >{`${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dateWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',

    marginTop: 15,
    marginBottom: 25,
  },
});

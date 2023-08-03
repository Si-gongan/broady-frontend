import { View, Text, StyleSheet } from 'react-native';
import { SigonganColor, SigonganFont } from '../styles';
import { getDateInfo, getDayOfWeek } from '../../../utils/time';

type DateViewerProps = {
  date: string;
};

export const DateViewer = ({ date }: DateViewerProps) => {
  const targetDate = new Date(date);

  const { year, month, day } = getDateInfo(targetDate);
  const dayOfWeek = getDayOfWeek(targetDate);

  return (
    <View style={[styles.timeWrapper]}>
      <Text
        style={[SigonganFont.teritary, SigonganColor.contentSenary, styles.text]}
      >{`${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timeWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',

    marginTop: 15,
    marginBottom: 25,
  },
  text: {
    // borderRadius: 15,
    // ...SigonganDesign.borderOpaqueInObject,
    // borderWidth: 1,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
  },
});

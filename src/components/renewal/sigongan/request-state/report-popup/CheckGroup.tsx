import { View, Text, StyleSheet } from 'react-native';
import { BomCheckBox } from '../../../common';
import { Fonts, Utils, Colors } from '../../../styles';
import { ReportText } from './constants';

export type ReportOption = 'first' | 'second' | 'third' | 'none';

type ICheckGroupProps = {
  option: ReportOption;
  setOption: (s: ReportOption) => void;
};

export const CheckGroup = ({ option, setOption }: ICheckGroupProps) => {
  const changeOption = (data: ReportOption) => {
    if (data === option) {
      setOption('none');
    } else {
      setOption(data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkItem}>
        <BomCheckBox
          value={option === 'first'}
          onValueChange={() => changeOption('first')}
          accessibilityLabel={`${ReportText.first} 체크박스`}
        />
        <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>{ReportText.first}</Text>
      </View>
      <View style={styles.checkItem}>
        <BomCheckBox
          value={option === 'second'}
          onValueChange={() => changeOption('second')}
          accessibilityLabel={`${ReportText.second} 체크박스`}
        />
        <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>{ReportText.second}</Text>
      </View>
      <View style={styles.checkItem}>
        <BomCheckBox
          value={option === 'third'}
          onValueChange={() => changeOption('third')}
          accessibilityLabel={`${ReportText.third} 체크박스, 이 체크박스를 누르면 신고 텍스트 입력 가능`}
        />
        <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>{ReportText.third}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  checkItem: {
    flexDirection: 'row',

    gap: 15,
  },
});

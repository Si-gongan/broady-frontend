import { View, Text, StyleSheet } from 'react-native';
import { BomCheckBox } from '../../../common';
import { Fonts, Utils, Colors } from '../../../styles';

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
        <BomCheckBox value={option === 'first'} onValueChange={() => changeOption('first')} />
        <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>
          해설에 부적절한 내용이 포함돼있습니다.
        </Text>
      </View>
      <View style={styles.checkItem}>
        <BomCheckBox value={option === 'second'} onValueChange={() => changeOption('second')} />
        <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>불성실한 해설입니다.</Text>
      </View>
      <View style={styles.checkItem}>
        <BomCheckBox value={option === 'third'} onValueChange={() => changeOption('third')} />
        <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>기타</Text>
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

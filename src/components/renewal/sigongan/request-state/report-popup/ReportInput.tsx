import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors, Utils, Fonts } from '../../../styles';

type IReportInputProps = {
  value: string;
  onChangeText: (s: string) => void;

  disabled?: boolean;
};

export const ReportInput = ({ value, onChangeText, disabled = false }: IReportInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.indicator, Fonts.Regular12, Utils.fontColor(Colors.Font.secondary)]}>
        {value.length}/100
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.input,
          Utils.borderColor(Colors.Red.Lighten200),
          Fonts.Regular14,
          Utils.fontColor(Colors.Font.secondary),
        ]}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 7,
  },
  indicator: {
    alignSelf: 'flex-end',
  },
  input: {
    height: 100,

    padding: 10,
    paddingTop: 10,

    borderRadius: 12,
  },
});

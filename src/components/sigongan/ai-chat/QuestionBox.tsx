import { View, Text, StyleSheet, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SigonganColor, SigonganFont } from '../styles';

type QuestionBoxProps = {
  value: string;
  onChangeValue: (value: string) => void;
};

export const QuestionBox = ({ value, onChangeValue }: QuestionBoxProps) => {
  return (
    <View style={[styles.container, SigonganColor.backgroundPrimary]}>
      <MaterialCommunityIcons name="image" style={styles.icon1} />

      <TextInput
        value={value}
        onChangeText={onChangeValue}
        placeholder="질문을 입력하세요..."
        style={[styles.input, SigonganColor.backgroundPrimary, SigonganFont.secondary]}
      />

      <FontAwesome name="send" style={styles.icon2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    paddingVertical: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  input: {
    width: 281,

    marginLeft: 4,
    marginRight: 8,

    borderRadius: 10,

    borderColor: SigonganColor.contentSenary.color,
    borderWidth: 0.5,

    paddingVertical: 8,
    paddingHorizontal: 11,
  },
  icon1: {
    fontSize: 35,
  },
  icon2: {
    fontSize: 28,
  },
});

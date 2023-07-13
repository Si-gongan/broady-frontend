import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SigonganColor, SigonganFont } from '../styles';

export const QuestTextArea = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, SigonganFont.teritary]}>질문을 입력해주세요</Text>

      <TextInput
        style={[
          styles.input,
          SigonganColor.backgroundQuaternary,
          SigonganFont.secondary,
          SigonganColor.contentTeritary,
        ]}
        multiline={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 36,

    width: '100%',
    paddingHorizontal: 9,

    gap: 8,
  },
  title: {
    paddingLeft: 16,
  },
  input: {
    height: 80,

    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,

    borderRadius: 8,
  },
});

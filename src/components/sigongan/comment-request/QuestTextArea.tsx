import { View, Text, StyleSheet, TextInput, Platform } from 'react-native';
import { SigonganColor, SigonganDesign, SigonganFont } from '../styles';

type QuestTextAreaProps = {
  value: string;
  onChangeValue: (value: string) => void;
};

export const QuestTextArea = ({ value, onChangeValue }: QuestTextAreaProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, SigonganFont.teritary]}>질문을 입력해주세요</Text>

      <TextInput
        style={[
          styles.input,
          value.length === 0 ? SigonganColor.backgroundQuaternary : SigonganColor.backgroundPrimary,
          SigonganFont.secondary,
          value.length === 0 ? SigonganColor.contentTeritary : SigonganColor.contentPrimary,
          value.length !== 0 && SigonganDesign.borderOpaqueInObject,
        ]}
        multiline={true}
        onChangeText={onChangeValue}
        value={value}
        placeholder="여기에 질문을 입력해주세요"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 20,

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
    paddingTop: Platform.OS === 'ios' ? 16 : 0,
    paddingBottom: 16,

    borderRadius: 8,
  },
});

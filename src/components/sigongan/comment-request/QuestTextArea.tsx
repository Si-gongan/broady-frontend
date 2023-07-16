import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SigonganColor, SigonganDesign, SigonganFont } from '../styles';
import { useState } from 'react';

export const QuestTextArea = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={[styles.title, SigonganFont.teritary]}>질문을 입력해주세요</Text>

      <TextInput
        style={[
          styles.input,
          text.length === 0 ? SigonganColor.backgroundQuaternary : SigonganColor.backgroundPrimary,
          SigonganFont.secondary,
          text.length === 0 ? SigonganColor.contentTeritary : SigonganColor.contentPrimary,
          text.length !== 0 && SigonganDesign.borderOpaqueInObject,
        ]}
        multiline={true}
        onChangeText={setText}
        value={text}
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
    paddingTop: 16,
    paddingBottom: 16,

    borderRadius: 8,
  },
});

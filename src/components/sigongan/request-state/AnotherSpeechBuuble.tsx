import { View, Text, StyleSheet } from 'react-native';
import { SigonganColor, SigonganDesign, SigonganFont } from '../styles';

type AnotherSpeechBubbleProps = {
  text: string;
};

export const AnotherSpeechBubble = ({ text }: AnotherSpeechBubbleProps) => {
  return (
    <View style={[styles.container, SigonganDesign.speechBubble2]}>
      <Text style={[SigonganFont.quaternary, SigonganColor.contentQuaternary]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

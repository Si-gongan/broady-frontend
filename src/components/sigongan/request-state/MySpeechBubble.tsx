import { View, Text, StyleSheet } from 'react-native';
import { SigonganColor, SigonganDesign, SigonganFont } from '../styles';

type MySpeechBubbleProps = {
  text: string;
};

export const MySpeechBubble = ({ text }: MySpeechBubbleProps) => {
  return (
    <View style={[styles.container, SigonganDesign.speechBubble1]}>
      <Text style={[SigonganFont.quaternary, SigonganColor.contentSecondary]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Utils } from '../../styles';

type MySpeechBubbleProps = {
  text: string;
};

export const MySpeechBubble = ({ text }: MySpeechBubbleProps) => {
  return (
    <View style={[styles.container, Utils.backgroundColor(Colors.Blue.Lighten400)]}>
      <Text style={[Fonts.Regular12, Utils.fontColor(Colors.Font.primary)]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 200,
    alignSelf: 'flex-end',

    borderRadius: 12,

    padding: 10,
  },
});

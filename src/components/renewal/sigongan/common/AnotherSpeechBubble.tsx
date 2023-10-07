import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Utils } from '../../styles';

type AnotherSpeechBubbleProps = {
  text: string;
};

export const AnotherSpeechBubble = ({ text }: AnotherSpeechBubbleProps) => {
  return (
    <View
      style={[
        styles.container,
        Utils.backgroundColor(Colors.None.Lighten300),
        Utils.borderColor(Colors.Red.Lighten300),
      ]}
    >
      <Text style={[Fonts.Regular12, Utils.fontColor(Colors.Font.primary)]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 190,
    alignSelf: 'flex-start',

    borderRadius: 12,

    padding: 10,
  },
});

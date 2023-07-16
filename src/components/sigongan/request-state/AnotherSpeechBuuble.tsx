import { View, Text, StyleSheet } from 'react-native';
import { SigonganColor, SigonganDesign, SigonganFont } from '../styles';

export const AnotherSpeechBubble = () => {
  return (
    <View style={[styles.container, SigonganDesign.speechBubble2]}>
      <Text style={[SigonganFont.quaternary, SigonganColor.contentPrimary]}>
        말풍선as ddddddddddddd ddadsdsadsaa dsaasdd
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

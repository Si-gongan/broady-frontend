import { View, Text, StyleSheet } from 'react-native';
import { SigonganColor, SigonganDesign, SigonganFont } from '../styles';

export const MySpeechBubble = () => {
  return (
    <View style={[styles.container, SigonganDesign.speechBubble1]}>
      <Text style={[SigonganFont.quaternary, SigonganColor.contentSecondary]}>
        말풍선as ddddddddddddd ddadsdsadsaa dsaasdd
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

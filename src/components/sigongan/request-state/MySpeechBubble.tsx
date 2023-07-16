import { View, Text, StyleSheet } from 'react-native';
import { SigonganColor, SigonganDesign, SigonganFont } from '../styles';

export const MySpeechBubble = () => {
  return (
    <View style={[styles.container, SigonganDesign.speechBubble1]}>
      <Text style={[SigonganFont.quaternary, SigonganColor.contentSecondary]}>
        고양이가 어떤 모습인지 자세히 설명해주세요.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

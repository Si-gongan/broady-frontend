import { View, Text, StyleSheet } from 'react-native';
import { SigonganColor, SigonganDesign, SigonganFont } from '../styles';

export const AnotherSpeechBubble = () => {
  return (
    <View style={[styles.container, SigonganDesign.speechBubble2]}>
      <Text style={[SigonganFont.quaternary, SigonganColor.contentQuaternary]}>
        세 마리의 고양이가 나란히 밥그릇의 사료를 먹고 있는 모습을 위에서 촬영한 사진입니다.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

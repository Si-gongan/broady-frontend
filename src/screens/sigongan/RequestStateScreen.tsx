import { View, Text } from 'react-native';
import { AnotherSpeechBubble, MySpeechBubble } from '../../components/sigongan/request-state';

export const RequestStateScreen = () => {
  return (
    <View>
      <MySpeechBubble />
      <AnotherSpeechBubble />
    </View>
  );
};

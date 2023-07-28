import { View, StyleSheet, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SigonganColor, SigonganFont, SigonganResponsive, SigonganShadow } from '../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

type QuestionBoxProps = {
  value: string;
  onChangeValue: (value: string) => void;

  onImagePopupPress: () => void;
  onSendTextPress: () => void;

  disabled: boolean;
};

export const QuestionBox = ({
  value,
  onChangeValue,
  onImagePopupPress,
  onSendTextPress,
  disabled,
}: QuestionBoxProps) => {
  return (
    <View style={[styles.container, SigonganColor.backgroundPrimary]}>
      <TouchableOpacity activeOpacity={0.8} onPress={onImagePopupPress} disabled={disabled}>
        <MaterialCommunityIcons name="image" style={styles.icon1} />
      </TouchableOpacity>

      <TextInput
        value={value}
        onChangeText={onChangeValue}
        placeholder="질문을 입력하세요..."
        style={[styles.input, SigonganColor.backgroundPrimary, SigonganFont.secondary]}
      />

      <TouchableOpacity activeOpacity={0.8} onPress={onSendTextPress} disabled={disabled}>
        <FontAwesome name="send" style={styles.icon2} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    paddingVertical: 16,

    ...SigonganShadow.shadowTopHigh,
  },
  input: {
    width: SigonganResponsive.aiChatInputWidth(),

    marginLeft: 4,
    marginRight: 8,

    borderRadius: 10,

    borderColor: SigonganColor.contentSenary.color,
    borderWidth: 0.5,

    paddingVertical: 8,
    paddingHorizontal: 11,
  },
  icon1: {
    fontSize: 35,
    marginRight: 5,
  },
  icon2: {
    fontSize: 28,
  },
});

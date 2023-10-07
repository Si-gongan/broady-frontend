import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Colors, Fonts, Utils } from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

type IAIInputBarProps = {
  value: string;
  onChangeText: (text: string) => void;

  onImagePress?: () => void;
  onTextSubmit?: () => void;
};

const IMAGE_ICON_PATH =
  'M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19ZM6 17H18L14.25 12L11.25 16L9 13L6 17ZM8.5 10C8.91667 10 9.27083 9.85417 9.5625 9.5625C9.85417 9.27083 10 8.91667 10 8.5C10 8.08333 9.85417 7.72917 9.5625 7.4375C9.27083 7.14583 8.91667 7 8.5 7C8.08333 7 7.72917 7.14583 7.4375 7.4375C7.14583 7.72917 7 8.08333 7 8.5C7 8.91667 7.14583 9.27083 7.4375 9.5625C7.72917 9.85417 8.08333 10 8.5 10Z';

const SUBMIT_ICON_PATH = 'M3 20V4L22 12L3 20ZM5 17L16.85 12L5 7V10.5L11 12L5 13.5V17Z';

export const AIInputBar = ({ value, onChangeText, onImagePress, onTextSubmit }: IAIInputBarProps) => {
  return (
    <LinearGradient
      colors={[Colors.None.Lighten400, Colors.Red.Lighten200]}
      style={styles.shadow}
      end={{ x: 0.5, y: 0.2 }}
    >
      <View style={[styles.container, Utils.backgroundColor(Colors.None.Lighten400)]}>
        <View style={[styles.inputContainer, Utils.borderColor(Colors.Red.Lighten200)]}>
          <TextInput
            style={[styles.input, Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}
            value={value}
            onChangeText={onChangeText}
            placeholder="질문을 입력해주세요..."
          />

          <TouchableOpacity activeOpacity={0.8} onPress={onImagePress}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d={IMAGE_ICON_PATH} fill={Colors.Red.Lighten200} />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.submitButton} onPress={onTextSubmit}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d={SUBMIT_ICON_PATH} fill={Colors.Red.Lighten200} />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  shadow: {
    paddingTop: 5,

    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  container: {
    padding: 20,

    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  inputContainer: {
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 12,

    gap: 5,
  },
  input: {
    flex: 1,

    padding: 15,

    borderRadius: 12,
  },
  submitButton: {
    marginRight: 5,
  },
});

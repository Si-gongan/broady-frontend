import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Colors, Fonts, Utils } from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

type IInputBarProps = {
  value: string;
  onChangeText: (text: string) => void;

  onPress?: () => void;
};

const SUBMIT_ICON_PATH =
  'M3.75 25V5L27.5 15L3.75 25ZM6.25 21.25L21.0625 15L6.25 8.75V13.125L13.75 15L6.25 16.875V21.25Z';

export const InputBar = ({ value, onChangeText, onPress }: IInputBarProps) => {
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

          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
            <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
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
  },
  input: {
    flex: 1,

    padding: 15,

    borderRadius: 12,
  },
  button: {
    marginRight: 5,
  },
});

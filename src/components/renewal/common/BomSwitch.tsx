import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Colors, Utils } from '../styles';
import { Pressable } from 'react-native';

type IBomSwitchProps = {
  value: boolean;
  onChangeValue: (b: boolean) => void;
};

const OFFSET_VALUE = [3, 24];

export const BomSwitch = ({ value, onChangeValue }: IBomSwitchProps) => {
  const offset = useSharedValue(3);

  const onPress = () => {
    onChangeValue(!value);

    if (!value) {
      offset.value = withTiming(OFFSET_VALUE[1]);
    } else {
      offset.value = withTiming(OFFSET_VALUE[0]);
    }
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  return (
    <Pressable
      style={[styles.container, Utils.backgroundColor(value ? Colors.Blue.Lighten300 : Colors.Font.secondary)]}
      onPress={onPress}
    >
      <Animated.View
        style={[styles.point, Utils.backgroundColor(Colors.None.Lighten300), animatedStyles]}
      ></Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 21,

    borderRadius: 10,
  },
  point: {
    width: 13,
    height: 13,

    borderRadius: 6.5,

    marginTop: 4,
  },
});

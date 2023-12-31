import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Colors, Utils } from '../styles';
import { Pressable } from 'react-native';
import { useEffect } from 'react';

type IBomSwitchProps = {
  value: boolean;
  onChangeValue: (b: boolean) => void;
};

const OFFSET_VALUE = [3, 24] as const;
type IOffsetType = (typeof OFFSET_VALUE)[number];

export const BomSwitch = ({ value, onChangeValue }: IBomSwitchProps) => {
  const offset = useSharedValue<IOffsetType>(OFFSET_VALUE[0]);

  const onPress = () => {
    onChangeValue(!value);
  };

  useEffect(() => {
    if (value) {
      offset.value = withTiming(OFFSET_VALUE[1]);
    } else {
      offset.value = withTiming(OFFSET_VALUE[0]);
    }
  }, [value]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  return (
    <Pressable
      style={[styles.container, Utils.backgroundColor(value ? Colors.Blue.Lighten300 : Colors.Font.secondary)]}
      onPress={(e) => {
        onPress();
        e.stopPropagation();
      }}
      accessible
      accessibilityLabel="알림 변경 스위치 토글"
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
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

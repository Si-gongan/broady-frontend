import { View, Text } from 'react-native';

type IButtonProps = {
  onPress?: () => void;
};

export const Button = ({ onPress }: IButtonProps) => {
  return (
    <View>
      <Text onPress={onPress}>Button</Text>
    </View>
  );
};

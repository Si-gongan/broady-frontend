import { TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../styles';

type INextButtonProps = {
  onPress?: () => void;
};

export const NextButton = ({ onPress }: INextButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          d="M8.6249 7.4L10.0249 6L16.0249 12L10.0249 18L8.6249 16.6L13.2249 12L8.6249 7.4Z"
          fill={Colors.Font.secondary}
        />
      </Svg>
    </TouchableOpacity>
  );
};

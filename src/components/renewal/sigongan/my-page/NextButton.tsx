import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../styles';

export const NextButton = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" accessible={false} disabled>
      <Path
        d="M8.6249 7.4L10.0249 6L16.0249 12L10.0249 18L8.6249 16.6L13.2249 12L8.6249 7.4Z"
        fill={Colors.Font.secondary}
      />
    </Svg>
  );
};

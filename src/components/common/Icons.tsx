import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  FontAwesome,
  AntDesign,
} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export type IconType = 'material' | 'ionicons' | 'feather' | 'entypo' | 'materialIcons' | 'fontAwesome' | 'AntDesign';

export type IconProps = {
  type: IconType;
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
  hitSlop?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
};

const Icons: React.FC<IconProps> = ({ type = 'material', name, size = 20, color = 'black', onPress, hitSlop }) => {
  let IconComponent: any;
  if (type === 'material') IconComponent = MaterialCommunityIcons;
  else if (type === 'ionicons') IconComponent = Ionicons;
  else if (type === 'feather') IconComponent = Feather;
  else if (type === 'entypo') IconComponent = Entypo;
  else if (type === 'materialIcons') IconComponent = MaterialIcons;
  else if (type === 'fontAwesome') IconComponent = FontAwesome;
  else if (type === 'AntDesign') IconComponent = AntDesign;
  else return null;

  return (
    <TouchableOpacity onPress={onPress ? onPress : undefined} disabled={!onPress} hitSlop={hitSlop}>
      <IconComponent name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default Icons;

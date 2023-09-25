import Checkbox from 'expo-checkbox';
import { Colors } from '../styles';

type IBomCheckBoxProps = {
  value: boolean;
  onValueChange: (b: boolean) => void;
  accessibilityLabel: string;
};

const CHECKBOX_SIZE = 17;
const HITSLOP = 20;

export const BomCheckBox = ({ value, onValueChange, accessibilityLabel }: IBomCheckBoxProps) => {
  return (
    <Checkbox
      value={value}
      onValueChange={onValueChange}
      color={value ? Colors.None.Darken200 : Colors.None.Default}
      style={{ width: CHECKBOX_SIZE, height: CHECKBOX_SIZE }}
      hitSlop={{ top: HITSLOP, left: HITSLOP, right: HITSLOP, bottom: HITSLOP }}
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityLabelledBy="checkBox"
      accessibilityState={{ checked: value }}
    />
  );
};

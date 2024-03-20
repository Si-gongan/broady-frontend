import { View, Text, Image } from 'react-native';
import React from 'react';

export default function CheckBox({
  checked,
  type = 'checkBox',
}: {
  checked: boolean;
  type?: 'checkBox' | 'selectedCheckBox';
}) {
  return checked ? (
    <Image
      source={require('@/../assets/images/CheckBox_Selected.png')}
      resizeMode="cover"
      accessibilityLabel="체크박스"
    />
  ) : type === 'selectedCheckBox' ? (
    <Image
      source={require('@/../assets/images/Checkbox_Unselected.png')}
      resizeMode="cover"
      accessibilityLabel="체크박스"
    />
  ) : (
    <Image source={require('@/../assets/images/CheckBox.png')} resizeMode="cover" accessibilityLabel="체크박스" />
  );
}

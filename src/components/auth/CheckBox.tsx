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
    <Image source={require('@/../assets/images/CheckBox_Selected.png')} resizeMode="cover" />
  ) : type === 'selectedCheckBox' ? (
    <Image source={require('@/../assets/images/Checkbox_Unselected.png')} resizeMode="cover" />
  ) : (
    <Image source={require('@/../assets/images/CheckBox.png')} resizeMode="cover" />
  );
}

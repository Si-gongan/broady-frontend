import { View, Text, Image } from 'react-native';
import React from 'react';

export default function CheckBox({ checked }: { checked: boolean }) {
  return checked ? (
    <Image source={require('@/../assets/images/CheckBox_Selected.png')} resizeMode="cover" />
  ) : (
    <Image source={require('@/../assets/images/CheckBox.png')} resizeMode="cover" />
  );
}

import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { GET_MARGIN, GET_PADDING } from '@/constants/theme';
import FlexBox from './FlexBox';
import CheckBox from '../auth/CheckBox';
import Typography from './Typography';
import { useTheme } from 'styled-components/native';
import Icons from './Icons';
import Margin from './Margin';

const CheckBoxForm = ({ onPress, text, checked }: { onPress?: () => void; text: string; checked: boolean }) => {
  const theme = useTheme();
  return (
    <FlexBox
      alignItems="center"
      styles={{
        paddingVertical: GET_PADDING('P5'),
      }}
    >
      <Pressable onPress={onPress}>
        <CheckBox checked={checked} />
      </Pressable>
      <Margin direction="horizontal" margin={GET_MARGIN('h3')} />
      <View
        style={{
          flex: 1,
        }}
      >
        <Typography size="body_md" color={theme.COLOR.FONT.CONTENT}>
          {text}
        </Typography>
      </View>
      <Icons type="material" name="chevron-right" size={24} color="black" onPress={onPress} />
    </FlexBox>
  );
};

export default CheckBoxForm;

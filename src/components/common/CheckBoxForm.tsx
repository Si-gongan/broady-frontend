import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { GET_MARGIN, GET_PADDING } from '@/constants/theme';
import FlexBox from './FlexBox';
import CheckBox from '../auth/CheckBox';
import Typography from './Typography';
import { useTheme } from 'styled-components/native';
import Icons from './Icons';
import Margin from './Margin';

const CheckBoxForm = ({
  onPressContent,
  onPressCheckBox,
  text,
  checked,
  accessibilityLabelForCheckbox,
  accessiblityLabelForContent,
}: {
  onPressContent?: () => void;
  onPressCheckBox?: () => void;
  text: string;
  checked: boolean;
  accessibilityLabelForCheckbox: string;
  accessiblityLabelForContent?: string;
}) => {
  const theme = useTheme();
  return (
    <FlexBox
      alignItems="center"
      styles={{
        paddingVertical: GET_PADDING('P5'),
      }}
    >
      <Pressable
        onPress={onPressCheckBox}
        accessible
        accessibilityRole="button"
        accessibilityState={{
          checked: checked,
        }}
        accessibilityLabel={accessibilityLabelForCheckbox}
      >
        <CheckBox checked={checked} />
      </Pressable>
      <Margin direction="horizontal" margin={GET_MARGIN('h3')} />
      <View
        style={{
          flex: 1,
        }}
      >
        <Pressable
          onPress={onPressContent}
          accessible
          accessibilityRole="button"
          accessibilityLabel={accessiblityLabelForContent}
        >
          <Typography size="body_md" color={theme.COLOR.FONT.CONTENT}>
            {text}
          </Typography>
        </Pressable>
      </View>
      <Icons
        accessible={false}
        accessibilityLabel={accessiblityLabelForContent + '아이콘'}
        type="material"
        name="chevron-right"
        size={24}
        color="black"
        onPress={onPressContent}
      />
    </FlexBox>
  );
};

export default CheckBoxForm;

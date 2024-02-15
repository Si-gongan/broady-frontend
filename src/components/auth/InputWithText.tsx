import { View, Text } from 'react-native';
import React from 'react';
import BroadyTextInput, { TextInputType } from '../common/BroadyTextInput';
import FlexBox from '../common/FlexBox';
import Typography from '../common/Typography';
import { THEME } from '@/constants/theme';
import Margin from '../common/Margin';

export default function InputWithText({
  label,
  labelColor = THEME.COLOR.FONT.CONTENT,
  margin = THEME.SPACING.MARGIN.h5,
  errorMessage,
  inputText,
  variant = 'gray',
  onChangeText,
}: {
  label: string;
  labelColor?: string;
  margin?: number;
  errorMessage?: string;
  inputText: string;
  variant?: TextInputType;
  onChangeText: (text: string) => void;
}) {
  return (
    <View>
      <FlexBox direction="row" alignItems="center" gap={THEME.SPACING.MARGIN.h6}>
        <Typography size="body_md" color={labelColor}>
          {label}
        </Typography>
        {errorMessage && (
          <Typography size="body_sm" color={THEME.COLOR.FONT.WARN}>
            {errorMessage}
          </Typography>
        )}
      </FlexBox>
      <Margin margin={margin} />
      <BroadyTextInput variant={variant} onChangeText={onChangeText} text={inputText}></BroadyTextInput>
    </View>
  );
}

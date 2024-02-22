import { View, Text } from 'react-native';
import React from 'react';
import BroadyTextInput, { TextInputType, TextInputVariantType } from '../common/BroadyTextInput';
import FlexBox from '../common/FlexBox';
import Typography from '../common/Typography';
import { THEME } from '@/constants/theme';
import Margin from '../common/Margin';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function AuthInput({
  label,
  labelColor = THEME.COLOR.FONT.CONTENT,
  margin = THEME.SPACING.MARGIN.h5,
  errorMessage,
  inputText,
  initialType,
  placeholder,

  variant = 'gray',
  onChangeText,
}: {
  label: string;
  labelColor?: string;
  margin?: number;
  errorMessage?: string;
  placeholder?: string;
  inputText: string;
  variant?: TextInputVariantType;
  initialType: TextInputType;
  onChangeText: (text: string) => void;
}) {
  return (
    <View>
      <FlexBox
        direction="row"
        alignItems="center"
        gap={THEME.SPACING.MARGIN.h6}
        styles={{
          paddingLeft: 3,
        }}
      >
        <Typography size="body_md" color={labelColor}>
          {label}
        </Typography>
        {errorMessage && (
          <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)}>
            <Typography size="body_sm" color={THEME.COLOR.FONT.WARN}>
              {errorMessage}
            </Typography>
          </Animated.View>
        )}
      </FlexBox>
      <Margin margin={margin} />
      <BroadyTextInput
        initialType={initialType}
        variant={variant}
        onChangeText={onChangeText}
        text={inputText}
        placeholder={placeholder}
      ></BroadyTextInput>
    </View>
  );
}

import { View, Text, Image } from 'react-native';
import React from 'react';
import BroadyTextInput, { TextInputType, TextInputVariantType } from '../common/BroadyTextInput';
import FlexBox from '../common/FlexBox';
import Typography from '../common/Typography';
import { THEME } from '@/constants/theme';
import Margin from '../common/Margin';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { HelperText } from 'react-native-paper';

export default function AuthInput({
  label,
  labelColor = THEME.COLOR.FONT.CONTENT,
  margin = THEME.SPACING.MARGIN.h5,
  errorMessage,
  inputText,
  initialType,
  placeholder,
  name,
  variant = 'gray',
  onChangeText,
}: {
  name?: string;
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
  const [isFocused, setIsFocused] = React.useState(false);

  const currentVariant: TextInputVariantType = inputText ? 'Border' : isFocused ? 'Border' : variant;
  const borderColor = errorMessage
    ? THEME.COLOR.FONT.WARN
    : currentVariant === 'Border'
    ? THEME.COLOR.FONT.TITLE
    : THEME.COLOR.BACKGROUND;

  const textName = name || label;

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
      </FlexBox>
      <Margin margin={margin} />
      <BroadyTextInput
        name={textName}
        onFocus={() => {
          setIsFocused(true);
        }}
        initialType={initialType}
        variant={currentVariant}
        onChangeText={onChangeText}
        text={inputText}
        placeholder={placeholder}
        borderColor={borderColor}
      ></BroadyTextInput>

      {errorMessage && (
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            bottom: -25,
          }}
          accessibilityLiveRegion={'polite'}
          accessibilityRole={'alert'}
        >
          <Image source={require('@/../assets/images/warning.png')} style={{ width: 20, height: 20 }} />
          <Typography size="body_sm" color={THEME.COLOR.FONT.WARN}>
            {errorMessage}
          </Typography>
        </Animated.View>
      )}
    </View>
  );
}

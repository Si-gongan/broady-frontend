import { View, Text, Image } from 'react-native';
import React from 'react';
import Typography, { TextStyling } from '../common/Typography';
import styled, { useTheme } from 'styled-components/native';
import { IsoString } from '@/@types/date';
import { formatTimeToDDMMDD } from '@/library';
import Margin from '../common/Margin';

const Box = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ theme }) => theme.SPACING.MARGIN.h4 + 5};
  padding: 20px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLOR.BD_3};
`;

const ImageBox = styled.View`
  width: 65px;
  height: 65px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLOR.GRAY_50};
`;

const Contents = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.SPACING.MARGIN.h4};
`;

const MainContents = styled.View`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SubContents = styled.View`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;

const NewMessageBox = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.COLOR.ORANGE};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ChatListItem({
  onPress,
  imageSrc,
  subText,
  mainText,
  time,
  unreadPostCount,
}: {
  onPress: () => void;
  imageSrc: string;
  subText: string;
  mainText: string;
  time: Date;
  unreadPostCount: number;
}) {
  const theme = useTheme();

  const formattedTime = formatTimeToDDMMDD(time);

  return (
    <Box onPress={onPress}>
      <ImageBox>
        <Image source={{ uri: imageSrc }} style={{ width: 65, height: 65, borderRadius: 8 }} />
      </ImageBox>
      <Contents>
        <MainContents>
          <Typography numberOfLines={1} size="body_lg" weight="semibold" color={theme.COLOR.FONT.CONTENT}>
            {mainText}
          </Typography>
          <Margin margin={3} />
          <Typography numberOfLines={2} size="body_lg" weight="regular" color={theme.COLOR.FONT.SUB_CONTENT}>
            {subText}
          </Typography>
        </MainContents>
        <SubContents>
          <Typography size="body_sm" weight="light" color={theme.COLOR.FONT.SUB_CONTENT}>
            {formattedTime}
          </Typography>
          {unreadPostCount > 0 && (
            <NewMessageBox>
              <Typography size="body_sm" weight="bold" color={theme.COLOR.WHITE}>
                {unreadPostCount}
              </Typography>
            </NewMessageBox>
          )}
        </SubContents>
      </Contents>
    </Box>
  );
}

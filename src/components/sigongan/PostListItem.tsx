import { IsoString } from '@/@types/date';
import { formatTimeToDDMMDD } from '@/library';
import React, { memo } from 'react';
import { Image, Pressable, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import Margin from '../common/Margin';
import Typography from '../common/Typography';
import Icons from '../common/Icons';

const Box = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ theme }) => theme.SPACING.MARGIN.h4 + 5 + 'px'};
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
  gap: ${({ theme }) => theme.SPACING.MARGIN.h4 + 'px'};
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

const CheckBoxIcon = require('@/../assets/images/Checkbox_Circle.png');
const CheckBoxIcon_Checked = require('@/../assets/images/CheckBox_Circle_Checked.png');

function ChatListItem({
  isSelectMode,
  isChecked,
  onPressSelectItem,
  onPress,
  imageSrc,
  subText,
  mainText,
  time,
  unreadPostCount,
}: {
  isSelectMode: boolean;
  isChecked: boolean;
  onPressSelectItem: () => void;
  onPress: () => void;
  imageSrc: string;
  subText: string;
  mainText: string;
  time: IsoString;
  unreadPostCount: number;
}) {
  const theme = useTheme();

  const formattedTime = formatTimeToDDMMDD(time);

  const imagePath = process.env.EXPO_PUBLIC_S3_BUCKET_URL + '/' + imageSrc;

  const checkBoxImageSource = isChecked ? CheckBoxIcon_Checked : CheckBoxIcon;

  return (
    <Box onPress={onPress}>
      {isSelectMode && (
        <Pressable
          style={{
            height: 65,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onPressSelectItem}
          accessible
        >
          <View style={{ width: 20, height: 20 }}>
            <Image source={checkBoxImageSource} style={{ width: 20, height: 20 }} />
            <View
              style={{
                position: 'absolute',
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icons type="fontAwesome" name="check" size={12} color={theme.COLOR.WHITE} />
            </View>
          </View>
        </Pressable>
      )}
      <ImageBox>
        <Image source={{ uri: imagePath }} style={{ width: 65, height: 65, borderRadius: 8 }} />
      </ImageBox>
      <Contents>
        <MainContents>
          <Typography
            numberOfLines={1}
            size="body_lg"
            weight="semibold"
            color={theme.COLOR.FONT.CONTENT}
            accessiblityLabel={`제목 : ${mainText}`}
          >
            {mainText}
          </Typography>
          <Margin margin={3} />
          <Typography
            numberOfLines={2}
            size="body_lg"
            weight="regular"
            color={theme.COLOR.FONT.SUB_CONTENT}
            accessiblityLabel={`내용 : ${subText}`}
          >
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

export default memo(ChatListItem);

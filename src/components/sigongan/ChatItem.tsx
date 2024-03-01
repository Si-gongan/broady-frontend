import { View, Text } from 'react-native';
import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import Typography from '../common/Typography';
import Margin from '../common/Margin';
import { IChat } from '@/@types/chat';

const MyChatBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;

const ChatContent = styled.View<{ backgroundColor: string }>`
  max-width: 80%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: ${({ theme }) => theme.SPACING.PADDING.P3}px;
  border-top-right-radius: ${({ theme }) => theme.STYLES.RADIUS.md}px;
  border-bottom-left-radius: ${({ theme }) => theme.STYLES.RADIUS.md}px;
  border-top-left-radius: ${({ theme }) => theme.STYLES.RADIUS.md}px;
`;

const ChatContentForComment = styled(ChatContent)`
  border-top-right-radius: ${({ theme }) => theme.STYLES.RADIUS.md}px;
  border-bottom-left-radius: 0;
  border-top-left-radius: ${({ theme }) => theme.STYLES.RADIUS.md}px;
  border-bottom-right-radius: ${({ theme }) => theme.STYLES.RADIUS.md}px;
`;

const CommentChatBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
`;

const AdminChatBox = styled.View``;

export const MyChat = ({ text, backgroundColor }: { text: string; backgroundColor: string }) => {
  const theme = useTheme();

  return (
    <MyChatBox>
      <Typography size="body_sm" color={theme.COLOR.FONT.SUB_CONTENT}>
        오전 21:00
      </Typography>
      <Margin direction="horizontal" margin={5} />
      <ChatContent backgroundColor={backgroundColor}>
        <Typography>{text}</Typography>
      </ChatContent>
    </MyChatBox>
  );
};

export const CommentChat = ({
  text,
  title,
  backgroundColor,
}: {
  text: string;
  title?: string;
  backgroundColor: string;
}) => {
  const theme = useTheme();

  return (
    <CommentChatBox>
      <ChatContentForComment backgroundColor={backgroundColor}>
        <Typography>{text}</Typography>
      </ChatContentForComment>
      <Margin direction="horizontal" margin={5} />
      {title && (
        <Typography size="body_sm" color={theme.COLOR.FONT.SUB_CONTENT}>
          {title}
        </Typography>
      )}
      <Typography size="body_sm" color={theme.COLOR.FONT.SUB_CONTENT}>
        오전 21:00
      </Typography>
    </CommentChatBox>
  );
};

export const AdminChat = ({
  text,
  title,
  backgroundColor,
}: {
  text: string;
  backgroundColor: string;
  title?: string;
}) => {
  const theme = useTheme();

  return (
    <AdminChatBox>
      <Typography size="body_sm" color={theme.COLOR.FONT.SUB_CONTENT}>
        오전 21:00
      </Typography>
      <Margin direction="horizontal" margin={5} />
      <ChatContentForComment backgroundColor={backgroundColor}>
        <Typography>{text}</Typography>
      </ChatContentForComment>
    </AdminChatBox>
  );
};

export default function ChatItem({ chat }: { chat: IChat }) {
  const { type, text } = chat;

  const theme = useTheme();
  const backgroundColor =
    type === 'sigongan' ? theme.COLOR.MINT : type === 'comment' ? theme.COLOR.GRAY_CHAT : theme.COLOR.GRAY_CHAT;

  return type === 'sigongan' ? (
    <MyChat text={text} backgroundColor={backgroundColor} />
  ) : type === 'comment' ? (
    <CommentChat text={text} backgroundColor={backgroundColor} />
  ) : (
    <AdminChat text={text} backgroundColor={backgroundColor} />
  );
}

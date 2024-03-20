import { View, Text } from 'react-native';
import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import Typography from '../common/Typography';
import Margin from '../common/Margin';
import { IChat } from '@/@types/chat';
import { formatTimeToDDMMDD } from '@/library';
import { useSetRecoilState } from 'recoil';
import { reportModalState } from '@/states/reportModal';

const MyChatBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;

const ChatContent = styled.View<{ backgroundColor: string }>`
  max-width: 75%;
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

const CommentChatBox = styled.Pressable`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
`;

const AdminChatBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
`;

export const MyChat = ({ text, backgroundColor, time }: { text: string; backgroundColor: string; time: string }) => {
  const theme = useTheme();

  return (
    <MyChatBox accessible>
      <Typography size="body_sm" color={theme.COLOR.FONT.SUB_CONTENT}>
        {time}
      </Typography>
      <Margin direction="horizontal" margin={5} />
      <ChatContent backgroundColor={backgroundColor}>
        <Typography accessiblityLabel={`내가 보낸 메시지: ${text}`}>{text}</Typography>
      </ChatContent>
    </MyChatBox>
  );
};

export const CommentChat = ({
  id,
  text,
  title,
  backgroundColor,
  time,
  type,
  onPressChat,
}: {
  id: string;
  text: string;
  title?: string;
  backgroundColor: string;
  time: string;
  type: 'comment' | 'ai';
  onPressChat: (id: string) => void;
}) => {
  const theme = useTheme();

  const accessibilityLabel =
    type === 'comment'
      ? `해설자로부터의 답변: ${text}. 
    클릭해서 해설을 신고할 수 있어요
  `
      : `AI로부터의 답변: ${text}`;

  return (
    <CommentChatBox
      accessible
      onPress={() => {
        if (type === 'comment') {
          onPressChat(id);
        }
      }}
    >
      <ChatContentForComment backgroundColor={backgroundColor}>
        <Typography accessiblityLabel={accessibilityLabel}>{text}</Typography>
      </ChatContentForComment>
      <Margin direction="horizontal" margin={5} />
      {title && (
        <Typography size="body_sm" color={theme.COLOR.FONT.SUB_CONTENT}>
          {title}
        </Typography>
      )}
      <Typography size="body_sm" color={theme.COLOR.FONT.SUB_CONTENT}>
        {time}
      </Typography>
    </CommentChatBox>
  );
};

export const AdminChat = ({
  text,
  title,
  time,
  backgroundColor,
}: {
  text: string;
  backgroundColor: string;
  title?: string;
  time: string;
}) => {
  const theme = useTheme();

  return (
    <AdminChatBox accessible>
      <ChatContentForComment backgroundColor={backgroundColor}>
        <Typography accessiblityLabel={`운영진측의 메시지: ${text}`}>{text}</Typography>
      </ChatContentForComment>
      <Margin direction="horizontal" margin={5} />
      <Typography size="body_sm" color={theme.COLOR.FONT.SUB_CONTENT}>
        {time}
      </Typography>
    </AdminChatBox>
  );
};

export default function ChatItem({
  chat,
  onPressCommentChat,
}: {
  chat: IChat;
  onPressCommentChat: (id: string) => void;
}) {
  const { type, text } = chat;

  const theme = useTheme();
  const backgroundColor =
    type === 'sigongan' ? theme.COLOR.MINT : type === 'comment' ? theme.COLOR.GRAY_CHAT : theme.COLOR.GRAY_CHAT;

  const time = formatTimeToDDMMDD(chat.createdAt);

  return type === 'sigongan' ? (
    <MyChat time={time} text={text} backgroundColor={backgroundColor} />
  ) : type === 'comment' || type === 'ai' ? (
    <CommentChat
      onPressChat={onPressCommentChat}
      type={type}
      id={chat.id}
      time={time}
      text={text}
      backgroundColor={backgroundColor}
    />
  ) : (
    <AdminChat time={time} text={text} backgroundColor={backgroundColor} />
  );
}

import { View, Text } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import ChatItem from './ChatItem';
import { IChat } from '@/@types/chat';

const Box = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACING.MARGIN.h3 + 'px'};
`;

export default function ChatList({
  chatList,
  onPressCommentChat,
}: {
  chatList: IChat[];
  onPressCommentChat: (id: string) => void;
}) {
  return (
    <Box>
      {chatList.map((chat, index) => (
        <ChatItem onPressCommentChat={onPressCommentChat} key={index} chat={chat} />
      ))}
    </Box>
  );
}

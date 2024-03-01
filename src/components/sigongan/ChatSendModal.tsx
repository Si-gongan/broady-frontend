import { View, Text } from 'react-native';
import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import BroadyButton from '../common/BroadyButton';
import Typography from '../common/Typography';
import { useSigonganNavigation } from '@/hooks';
import Modal from 'react-native-modal';
import Margin from '../common/Margin';

const ModalBox = styled.View`
  margin: 0 auto;
  width: 90%;
  padding: ${({ theme }) => theme.SPACING.PADDING.P4}px;
  background-color: white;
  border-radius: ${({ theme }) => theme.STYLES.RADIUS.md}px;
`;

const ModalTextBox = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.SPACING.MARGIN.h4}px;
  margin-top: ${({ theme }) => theme.SPACING.MARGIN.h2}px;
  margin-bottom: ${({ theme }) => theme.SPACING.MARGIN.h2}px;
`;

export default function ChatSendModal({
  isSendModalVisible,
  closeSendModal,
  onPressSendToComment,
  onPressSendToAI,
}: {
  isSendModalVisible: boolean;
  onPressSendToComment: () => void;
  onPressSendToAI: () => void;
  closeSendModal: () => void;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  input: string;
}) {
  const theme = useTheme();

  const navigation = useSigonganNavigation();

  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      isVisible={isSendModalVisible}
      onBackdropPress={closeSendModal}
    >
      <ModalBox>
        <ModalTextBox>
          <Typography size="body_xl" weight="medium" color={theme.COLOR.FONT.CONTENT}>
            질문하기
          </Typography>
          <Typography size="body_lg" weight="light" color={theme.COLOR.FONT.CONTENT}>
            누구에게 질문하시겠어요?
          </Typography>
        </ModalTextBox>
        <BroadyButton variant="primary" text="해설자에게 질문하기" onPress={onPressSendToComment}></BroadyButton>
        <Margin margin={theme.SPACING.MARGIN.h4 + 5} />
        <BroadyButton variant="secondary" text="AI 로디에게 질문하기" onPress={onPressSendToAI}></BroadyButton>
      </ModalBox>
    </Modal>
  );
}

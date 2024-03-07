import { View, Text } from 'react-native';
import React, { Children } from 'react';
import styled, { useTheme } from 'styled-components/native';
import Typography from './Typography';
import BroadyButton from './BroadyButton';
import Margin from './Margin';
import Modal from 'react-native-modal';

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

export default function CenteredModal({
  isVisible,
  closeModal,
  children,
}: {
  isVisible: boolean;
  children: React.ReactNode;
  closeModal: () => void;
}) {
  return (
    <Modal animationIn={'fadeIn'} animationOut={'fadeOut'} isVisible={isVisible} onBackdropPress={closeModal}>
      <ModalBox>{children}</ModalBox>
    </Modal>
  );
}

CenteredModal.TextBox = ModalTextBox;

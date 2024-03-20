import { View, Text, Pressable } from 'react-native';
import React, { Children } from 'react';
import styled, { useTheme } from 'styled-components/native';
import Typography from './Typography';
import BroadyButton from './BroadyButton';
import Margin from './Margin';
import Modal from 'react-native-modal';

const ModalBox = styled.View<{ noPadding?: boolean }>`
  margin: 0 auto;
  width: 90%;
  padding: ${({ theme, noPadding }) => (noPadding ? 0 : theme.SPACING.PADDING.P4)}px;
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
  noPadding,
}: {
  isVisible: boolean;
  children: React.ReactNode;
  closeModal: () => void;
  noPadding?: boolean;
}) {
  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      isVisible={isVisible}
      onBackdropPress={closeModal}
      customBackdrop={
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'black',
          }}
          onPress={closeModal}
          accessible={false}
          accessibilityLabel="
        한번 눌러서 모달을 끌 수 있어요."
        ></Pressable>
      }
    >
      <ModalBox noPadding={noPadding}>{children}</ModalBox>
    </Modal>
  );
}

CenteredModal.TextBox = ModalTextBox;

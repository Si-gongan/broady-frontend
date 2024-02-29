import { View } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import Typography from './Typography';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ModalContent = styled.View<{ bottom: number }>`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding-bottom: ${({ bottom }) => bottom}px;
  /* height: 300; */
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  /* justify-content: center; */
  /* align-items: center; */
`;

const Header = styled.View`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;

  /* height: 50px; */
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

export default function BottomModal({
  isModalVisible,
  setIsModalVisible,
  children,
  headerText,
}: {
  isModalVisible: boolean;
  setIsModalVisible: (arg: boolean) => void;
  children: React.ReactNode;
  headerText?: string;
}) {
  const { bottom } = useSafeAreaInsets();

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}
      style={{
        // justifyContent: 'flex-end',
        margin: 0,
      }}
    >
      <ModalContent bottom={bottom}>
        {headerText && (
          <Header>
            <Typography size="body_xl" weight="semibold">
              {headerText}
            </Typography>
          </Header>
        )}
        {children}
      </ModalContent>
    </Modal>
  );
}

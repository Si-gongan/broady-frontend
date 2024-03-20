import { Pressable, View } from 'react-native';
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
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
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
  onBackdropPress,
}: {
  isModalVisible: boolean;
  setIsModalVisible: (arg: boolean) => void;
  children: React.ReactNode;
  headerText?: string;
  onBackdropPress?: () => void;
}) {
  const { bottom } = useSafeAreaInsets();

  const onBackdropPressHandler = () => {
    setIsModalVisible(false);
    onBackdropPress && onBackdropPress();
  };

  return (
    <Modal
      isVisible={isModalVisible}
      // onBackdropPress={onBackdropPressHandler}
      style={{
        margin: 0,
      }}
      customBackdrop={
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'black',
          }}
          onPress={onBackdropPressHandler}
          accessible={false}
          accessibilityLabel="
            한번 눌러서 모달을 끌 수 있어요.
          "
        ></Pressable>
      }
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

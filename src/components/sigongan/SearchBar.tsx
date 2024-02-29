import { View, Text } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Icons from '../common/Icons';

const Box = styled.View<{
  hasText: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.SPACING.MARGIN.h4 + 5};
  background-color: ${({ theme, hasText }) => (hasText ? theme.COLOR.WHITE : theme.COLOR.GRAY_50)};
  border-width: 1px;
  border-color: ${({ theme, hasText }) => (hasText ? theme.COLOR.BD_4 : 'transparent')};
  padding: 10px 15px 10px 20px;
  border-radius: 25px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: ${({ theme }) => theme.FONT.SIZE.body_md}px;
`;

const DeleteBtn = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  /* padding: 10px; */
  background-color: ${({ theme }) => theme.COLOR.FONT.CONTENT};
  border-radius: 10px;
`;

export default function SearchBar({
  onPressSearch,
  text,
  onChangeText,
  onPressDelete,
  placeholder,
}: {
  onPressSearch: () => void;
  onPressDelete: () => void;
  text: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}) {
  return (
    <Box hasText={text.length > 0}>
      <SearchInput placeholder={placeholder} onChangeText={onChangeText} value={text}></SearchInput>
      {/* {text.length > 0 && (
        <DeleteBtn onPress={onPressDelete}>
          <Icons type="ionicons" name="close" size={20} color="white" />
        </DeleteBtn>
      )} */}
      <Icons type="ionicons" name="search" size={20} color="black" onPress={onPressSearch} />
    </Box>
  );
}

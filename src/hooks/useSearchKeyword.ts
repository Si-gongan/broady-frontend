import { useState } from 'react';

export const useSearchKeyword = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const onChangeSearchKeyword = (text: string) => {
    setSearchKeyword(text);
  };

  const onPressSearch = () => {};

  const onPressDelete = () => {
    setSearchKeyword('');
  };

  return { searchKeyword, onChangeSearchKeyword, onPressSearch, onPressDelete };
};

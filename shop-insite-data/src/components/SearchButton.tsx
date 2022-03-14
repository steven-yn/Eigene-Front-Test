import React from 'react';
import { BorderButton } from './common/Button';

const SearchButton = ({ onSubmit }: any) => {
  const onClick = (e: any) => {
    onSubmit(e);
  };

  return (
    <BorderButton fontcolor={'#099268'} onClick={onClick}>
      조회
    </BorderButton>
  );
};

export default SearchButton;

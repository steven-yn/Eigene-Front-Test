import React, { useEffect } from 'react';
import InputBar from '../components/InputBar';
import { initialize, changeInput } from '../modules/filter';
import { useSelector, useDispatch } from 'react-redux';

interface StoreFilter {
  filter: {
    startDate: string;
    endDate: string;
    timeUnit: string;
    category: string;
    keyword: string;
    device: string;
    gender: string;
    ages: Array<string>;
  };
}

const InputBarContainer = () => {
  const dispatch = useDispatch();

  const filter = useSelector(({ filter }: StoreFilter) => ({
    startDate: filter.startDate,
    endDate: filter.endDate,
    category: filter.category,
    keyword: filter.keyword,

    ages: filter.ages,
  }));

  const onChangeInput = (payload: any) => dispatch(changeInput(payload));

  useEffect(() => {
    if (filter.ages.length > 0) {
      return;
    } else {
      dispatch(initialize());
    }
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <InputBar
      onChangeInput={onChangeInput}
      startDate={filter.startDate}
      endDate={filter.endDate}
      category={filter.category}
      keyword={filter.keyword}
    />
  );
};

export default InputBarContainer;

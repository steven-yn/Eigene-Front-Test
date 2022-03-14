import React from 'react';
import SelectBar from '../components/SelectBar';
import { useSelector, useDispatch } from 'react-redux';
import { changeSelect, addAgeSelect } from '../modules/filter';

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

interface ChangePayload {
  name: string;
  value: string;
}

const SelectBarContainer = () => {
  const dispatch = useDispatch();
  const { timeUnit, gender, device, ages } = useSelector(({ filter }: StoreFilter) => ({
    timeUnit: filter.timeUnit,
    gender: filter.gender,
    device: filter.device,
    ages: filter.ages,
  }));

  const onChangeSelect = (payload: ChangePayload) => {
    if (payload.name === 'ages') {
      try {
        if (ages.find((elem) => elem === payload.value) || payload.value === '') {
          return;
        }
        return dispatch(addAgeSelect(payload));
      } catch (error) {
        return dispatch(addAgeSelect(payload));
      }
    }
    return dispatch(changeSelect(payload));
  };

  return (
    <>
      <SelectBar
        onChangeSelect={onChangeSelect}
        timeUnit={timeUnit}
        gender={gender}
        device={device}
        ages={ages}
      />
    </>
  );
};

export default SelectBarContainer;

import React from 'react';
import styled from 'styled-components';
import Responsive from './common/Responsive';
import SearchButtonContainer from '../containers/SearchButtonContainer';

interface SBProps {
  onChangeSelect: any;
  timeUnit: string;
  gender: string;
  device: string;
  ages: any;
}

const SelectBarBlock = styled(Responsive)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 0 3rem 0;
  width: auto;

  select {
    padding: 0 1rem 0 1rem;
    margin: 0 0.5rem 0 0.5rem;
  }
`;

const SelectBar = ({ onChangeSelect, timeUnit, gender, device, ages }: SBProps) => {
  const onChange = (e: any) => {
    onChangeSelect({ name: e.target.name, value: e.target.value });
  };

  if (!ages.length) {
    ages = '';
  }

  return (
    <SelectBarBlock>
      <select id="timeUnit" name="timeUnit" onChange={onChange} value={timeUnit}>
        <option value="month">month</option>
        <option value="date">date</option>
        <option value="week">week</option>
      </select>
      <select id="ages" name="ages" onChange={onChange} value={ages}>
        <option value="">ages (중복가능)</option>
        <option value="10">10대</option>
        <option value="20">20대</option>
        <option value="30">30대</option>
        <option value="40">40대</option>
        <option value="50">50대</option>
        <option value="60">60대</option>
      </select>
      <select id="gender" name="gender" onChange={onChange} value={gender}>
        <option value="">gender</option>
        <option value="m">남성</option>
        <option value="f">여성</option>
      </select>
      <select id="device" name="device" onChange={onChange} value={device}>
        <option value="">device</option>
        <option value="pc">PC</option>
        <option value="mo">Mobile</option>
      </select>
      <SearchButtonContainer />
    </SelectBarBlock>
  );
};

export default SelectBar;

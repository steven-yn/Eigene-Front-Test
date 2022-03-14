import React from 'react';
import styled from 'styled-components';
import Responsive from './common/Responsive';
import { Input, DatePicker, Space } from 'antd';
import moment from 'moment';

const InputBarBlock = styled(Responsive)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 0 3rem 0;
  width: auto;

  span {
    padding: 0.5rem;
  }
  input {
    width: auto;
    margin-left: 0.5rem;
  }
`;

interface IBProps {
  onChangeInput: any;
  startDate: string;
  endDate: string;
  category: string;
  keyword: string;
}

const InputBar = ({ onChangeInput, startDate, endDate, category, keyword }: IBProps) => {
  const onChange = (e: any) => {
    onChangeInput({ name: e.target.name, value: e.target.value });
  };

  const onStartDatePick = (date: any, dateStr: string) => {
    onChangeInput({ name: 'startDate', value: dateStr });
  };

  const onEndDatePick = (date: any, dateStr: string) => {
    onChangeInput({ name: 'endDate', value: dateStr });
  };

  return (
    <InputBarBlock>
      <span>
        시작일자 :
        <Space direction="vertical">
          <DatePicker
            style={{ height: '32px', padding: '0', marginLeft: '0.5rem' }}
            onChange={onStartDatePick}
            value={startDate !== '' ? moment(startDate) : null}
          ></DatePicker>
        </Space>
      </span>
      <span>
        종료일자 :
        <Space direction="vertical">
          <DatePicker
            style={{ height: '32px', padding: '0', marginLeft: '0.5rem' }}
            onChange={onEndDatePick}
            value={endDate !== '' ? moment(endDate) : null}
          ></DatePicker>
        </Space>
      </span>
      <span>
        카테고리 :
        <Input
          id="category"
          type="search"
          name="category"
          placeholder="분야 코드를 입력하세요"
          onChange={onChange}
          value={category}
        ></Input>
      </span>
      <span>
        키워드 :
        <Input
          id="keyword"
          type="search"
          name="keyword"
          placeholder="검색 키워드를 입력하세요"
          onChange={onChange}
          value={keyword}
        ></Input>
      </span>
    </InputBarBlock>
  );
};

export default InputBar;

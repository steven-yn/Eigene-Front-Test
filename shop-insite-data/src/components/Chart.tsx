import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import styled from 'styled-components';
import Responsive from './common/Responsive';
import Palette from '../lib/Palette';

const LineChartBlock = styled(Responsive)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Res {
  resData: {
    startDate: string;
    endDate: string;
    timeUnit: string;
    results: Array<any>;
  };
}

interface ResultsObj {
  period: string;
  ratio: number;
  group: string;
}

const Chart = ({ resData }: Res) => {
  const { results } = resData;

  const lineData: Array<any> = [];

  const filtering = (data: any) => {
    const filtered: Array<any> = [];

    for (let roopIndex = 0; roopIndex < data.length; roopIndex++) {
      // 배열 전체를 순회하며 period 값이 같은 배열의 index를 구함.
      const overlapIndex = data.findIndex((elem: ResultsObj) => {
        return data[roopIndex].period === elem.period;
      });

      // ages가 다중선택이 아니면 (겹치는 period 값이 없으면) 원본 배열을 반환
      if (typeof overlapIndex !== 'number') {
        return data;
      }

      if (overlapIndex === roopIndex) {
        // overlapIndex 가 같은지점 에서 새로운 객체를 생성 하도록 함.
        // eslint-disable-next-line no-new-object
        let elem: any = new Object();

        // index 가 겹치는 시점에 period 를 한번만 입력해주고
        // 각 group에 대한 프로퍼티를 생성해서 ratio 값을 입력
        elem.period = data[overlapIndex].period;
        elem[`${data[roopIndex].group}대`] = data[roopIndex].ratio;

        // store 에 있는 배열을 참조하지 않도록 새로운 배열에 push
        filtered.push(elem);

        if (filtered.length === 1) {
          // lineData 에 각 group 의 dataKey 가 될 값을 중복되지 않게 한번만 push
          lineData.push(`${data[roopIndex].group}대`);
        }
      } else {
        // 위에서 생성하고 push 된 객체에 나머지 데이터를 입힘.
        // 카운터가 증가하면
        filtered[filtered.length - 1][`${data[roopIndex].group}대`] = data[roopIndex].ratio;

        if (filtered.length - 1 === 0) {
          // lineData 에 각 group 의 dataKey 가 될 값을 중복되지 않게 한번만 push
          lineData.push(`${data[roopIndex].group}대`);
        }
      }
    }
    return filtered;
  };

  const filteredData = filtering(results[0].data);

  const colorCode = (index: number) => {
    // custome color 코드 라이브러리 사용
    // map 인덱스를 순회하는 값에 다양한 color 값 고정
    return Palette.color[index];
  };

  console.log(filteredData, 'Chart Input Data');

  return (
    <LineChartBlock>
      <LineChart
        width={900}
        height={600}
        data={filteredData}
        margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" iconType="rect" />
        {lineData.map((elem: any, index: number) => {
          return <Line key={elem} type="monotone" dataKey={`${elem}`} stroke={colorCode(index)} />;
        })}
      </LineChart>
    </LineChartBlock>
  );
};

export default Chart;

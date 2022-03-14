import React from 'react';
import Chart from '../components/Chart';
import { useSelector } from 'react-redux';

interface StoreSearch {
  search: {
    resData: {
      startDate: string;
      endDate: string;
      timeUnit: string;
      results: Array<any>;
    };
  };
}

const ChartContainer = () => {
  const { resData } = useSelector(({ search }: StoreSearch) => ({
    resData: search.resData,
  }));

  return resData ? <Chart resData={resData} /> : <></>;
};

export default ChartContainer;

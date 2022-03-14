import SearchButton from '../components/SearchButton';
import { useSelector, useDispatch } from 'react-redux';
import { initialize } from '../modules/filter';
import { requestAPI } from '../modules/search';

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

const SearchButtonContainer = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector(({ filter }: StoreFilter) => ({
    filter: filter,
  }));
  /*
  const testReqPayload = {
    startDate: '2017-08-01',
    endDate: '2017-09-30',
    timeUnit: 'month',
    category: '50000000',
    keyword: '정장',
    device: 'pc',
    gender: 'm',
    ages: ['20', '40', '60'],
  };
*/
  const onSubmit = () => {
    dispatch(requestAPI(filter));
    dispatch(initialize());
  };

  return <SearchButton onSubmit={onSubmit} />;
};

export default SearchButtonContainer;

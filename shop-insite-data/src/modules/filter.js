const INITIALIZE = 'filter/INITIALIZE';
const CHANGE_INPUT = 'filter/CHANGE_INPUT';
const CHANGE_SELECT = 'filter/CHANGE_SELECT';
const AGE_SELECT = 'filter/AGE_SELECT';

export const initialize = () => ({ type: INITIALIZE });
export const changeInput = ({ name, value }) => ({
  type: CHANGE_INPUT,
  payload: { name, value },
});
export const changeSelect = ({ name, value }) => ({
  type: CHANGE_SELECT,
  payload: { name, value },
});
export const addAgeSelect = ({ value }) => ({
  type: AGE_SELECT,
  payload: { value },
});

const initialState = {
  startDate: '',
  endDate: '',
  category: '',
  keyword: '',
  timeUnit: 'month',
  device: '',
  gender: '',
  ages: [],
};

export default function filter(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...initialState,
      };
    case CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case CHANGE_SELECT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case AGE_SELECT:
      return {
        ...state,
        ages: state.ages.concat(action.payload.value),
      };
    default:
      return state;
  }
}

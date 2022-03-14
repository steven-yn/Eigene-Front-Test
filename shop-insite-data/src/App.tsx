import React from 'react';
import './App.css';
import ChartContainer from './containers/ChartContainer';
import InputBarContainer from './containers/InputBarContainer';
import SelectBarContainer from './containers/SelectBarContainer';

const App = () => {
  return (
    <div className="App">
      <InputBarContainer />
      <SelectBarContainer />
      <ChartContainer />
    </div>
  );
};

export default App;

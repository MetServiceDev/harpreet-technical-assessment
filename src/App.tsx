import React from 'react';
import './App.css';
import GroupedBar from './components/GroupedBar';
import MultiAxisLine from './components/MultiAxisLine';

const App = () => {
  return (
      <div className="App">
          <h1>JSON data</h1>
          <div className="grouped-bar">
              <GroupedBar />
          </div>
          <div className="multi-axis-line">
              <MultiAxisLine />
          </div>
      </div>
  );
}

export default App;

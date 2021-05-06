import React from 'react';
import './App.css';
// import GroupedBar from './components/GroupedBar';
// import MultiAxisLine from './components/MultiAxisLine';
import CSVMultiAxisLine from './components/CSVMultiAxisLine';

const App = () => {
  return (
      <div className="App">
          {/*<h1>JSON data</h1>*/}
          {/*<div>*/}
          {/*    <h2>Grouped Bar Graph</h2>*/}
          {/*    <div className="grouped-bar">*/}
          {/*        <GroupedBar />*/}
          {/*    </div>*/}
          {/*    <h2>Multi Axis Bar Graph</h2>*/}
          {/*    <div className="multi-axis-line">*/}
          {/*        <MultiAxisLine />*/}
          {/*    </div>*/}
          {/*</div>*/}
          <div>
              <CSVMultiAxisLine />
          </div>
      </div>
  );
}

export default App;

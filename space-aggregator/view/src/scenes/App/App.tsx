import React from 'react';
import SpaceList from '../SpaceList'
import data__schools from '../../../../data/parsedSchools.json' 

/** Main app, including handling of state */
function App() {
  return (
    <div className="App">
      <SpaceList />
    </div>
  );
}

export default App

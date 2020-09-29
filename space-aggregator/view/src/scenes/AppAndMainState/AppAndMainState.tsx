import React, { useState, useEffect} from 'react';
import SpaceList from '../SpaceList'
import { School, NSR_Enhet, NSR_School } from 'space-aggregator-types'
import originalData from 'space-aggregator-data'

const data : {
  parsedSchools: School[],
  NSR_enheter: NSR_Enhet[],
  NSR_schools: NSR_School[]
} = originalData as any


/** Main app, including handling of state */
function AppAndMainState() {
  const [spaces, setSpaces] = useState<School[]>(data.parsedSchools)
  useEffect(() => {
    // On load, we want to load the spaces from json
    
    return () => {
      setSpaces([])
    }
  }, [])
  return (
    <div className="App">
      {/* <FilterSpaceList 
        setSpaces={setSpaces}
      /> */}
      <SpaceList 
        spaces={spaces}
        setSpaces={setSpaces}
      />
    </div>
  );
}

export default AppAndMainState

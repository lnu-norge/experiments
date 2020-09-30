import React, { useState } from 'react';
import SpaceList from '../SpaceList'
import { School, NSR_Enhet, NSR_School } from 'space-aggregator-types'
// @ts-ignore Just WIP data anyway
import originalData from 'space-aggregator-data'
import 'antd/dist/antd.css'
import './AppAndMainState.css'

import {Input} from 'antd'
const { Search } = Input;


const data : {
  parsedSchools: School[],
  NSR_enheter: NSR_Enhet[],
  NSR_schools: NSR_School[]
} = originalData as any


/** Main app, including handling of state */
function AppAndMainState() {
  const [spaces, setSpaces] = useState<School[]>(data.parsedSchools.map((space, index) => ({
    ...space,
    index: index + 1
  })))

  const filterSpacesBy = (filter: string, input: {
    string?: string,
    number?: number,
    boolean?: boolean
  }) => {

    if (input.string) {
      const value = input.string
      const newSpaces = data.parsedSchools.filter(school => 
        // @ts-ignore
        school[filter] && `${school[filter]}`.toLowerCase().includes(value.toLowerCase())
      ).map((space, index) => ({
        ...space,
        index: index + 1
      }))
      setSpaces(newSpaces)
    } else if (input.number) {
      const value = input.number
      const newSpaces = data.parsedSchools.filter(school => 
        // @ts-ignore
        school[filter] && school[filter] > value
      ).map((space, index) => ({
        ...space,
        index: index + 1
      }))
      setSpaces(newSpaces)
    }
  }

  return (
    <main id="App">
      <h1>Skoler i Norge</h1>
      <p>
      Kommune: <Search 
            onChange={e => filterSpacesBy('kommune', {string: e.currentTarget.value })}
            onSearch={value => filterSpacesBy('kommune', {string: value})}
      />
      </p>
      <SpaceList 
        spaces={spaces}
        setSpaces={setSpaces}
      />
    </main>
  );
}

export default AppAndMainState

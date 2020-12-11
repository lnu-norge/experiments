import { Space, Sourced } from 'space-aggregator-types';
import fs from 'fs'
import client from './client' 

const extractSearchDocumentDataFromSpaceData = (data: Space) => {
  const returnedData = {} as any
  Object.keys(data).forEach((_key: any) => {
    const key = _key as keyof Space
    const _data = data as any
    if (_data[key] && _data[key].hasOwnProperty('info')) {
      // We have a Sourced thing - let's return the info, not the Source
      if (_data[key].info) {
        returnedData[key] = _data[key].info
      }
    } else if (
      _data[key]
    ) {
      returnedData[key] = _data[key]
    }
  })
  return returnedData
}

const fillWithNSRData = async () => {
  // Fill the collection with NSR data
  const NSR = JSON.parse(fs.readFileSync('../data/parsedSchools.json').toString('utf-8')) as Space[]
  for (let index = 0; index < NSR.length; index++) {
    const space = NSR[index];
    const rating = Math.floor(Math.random()*100) // No rating yet, but here's a random one
    const spaceSearchDocument = {
      ...extractSearchDocumentDataFromSpaceData(space),
      rating,
      ...space.address
    }
    try {
      console.log("Adding NSR school ", 1 + index, "/", NSR.length)
      await client.collections('spaces').documents().create(spaceSearchDocument)
    } catch(error) {
      console.error(error)
      index = NSR.length
    } 
  }
}

const fillWithBookupData = async () => {
  // Fill the collection with Bookup data
  const Bookup = JSON.parse(fs.readFileSync('../data/Bookup_parsed.json').toString('utf-8')) as Space[]
  for (let index = 0; index < Bookup.length; index++) {
    const space = Bookup[index];
    const rating = Math.floor(Math.random()*100) // No rating yet, but here's a random one
    const spaceSearchDocument = {
      ...extractSearchDocumentDataFromSpaceData(space),
      rating,
      ...space.address
    }
    try {
      console.log("Adding Bookup data ", 1 + index, "/", Bookup.length)
      await client.collections('spaces').documents().create(spaceSearchDocument)
    } catch(error) {
      console.error(error)
      index = Bookup.length
    } 
  }
}
fillWithNSRData().then(() => {
  fillWithBookupData()
})



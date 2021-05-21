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

const fillWithData = async () => {
  // Fill the collection with NSR data
  const NSR = JSON.parse(fs.readFileSync('../data/parsedSchools.json').toString('utf-8')) as Space[]
  const Bookup = JSON.parse(fs.readFileSync('../data/Bookup_parsed.json').toString('utf-8')) as Space[]

  const Combined  = [...NSR, ...Bookup]
  for (let index = 0; index < Combined.length; index++) {
    const space = Combined[index];
    const rating = 0 // No rating yet

    const includesLinkToBookingPage = !!(space.connectedBookingServices && space.connectedBookingServices.length > 0)

    const spaceSearchDocument = {
      ...extractSearchDocumentDataFromSpaceData(space),
      rating,
      ...space.address,
      includesLinkToBookingPage,
      fullData: space 
    }
    try {
      console.log("Adding to index ", 1 + index, "/", Combined.length)
      await client.collections('spaces').documents().create(spaceSearchDocument)
    } catch(error) {
      console.error(error)
      index = Combined.length
    } 
  }
}

fillWithData()


import { filePaths } from './Bookup/config';
import { Sourced, SourceOfInformation, Space } from 'space-aggregator-types';
import fetch from 'node-fetch' 
import fetchRetry from 'fetch-retry'
import fs from 'fs'

interface Config { 
	endpoints: { 
		uri: string, all: string, specific: (id: string|number) => string }, filePaths: { all: string, specifics: string, parsed: string } }

export const fetchWithExponentialBackoff = fetchRetry(fetch as any, {
	retries: 6,
	retryDelay: function(attempt: number) {
		return Math.pow(2, attempt) * 1000; // 1000, 2000, 4000
	}
})


export const infoGenerator = (type: SourceOfInformation["type"]) => <T>(data: T, description?: string): Sourced<T> => ({
	info: data,
	source: {
		type,
		sourceDescription: description,
		lastUpdated: Date.now() // TODO: Should set this to the date we fetched the info, not the date we parsed it
	}
})

export const syncAll = async (
	config: Config, 
	filterFunction = (input: any): any[] => input ): Promise<number | boolean> => {
		/** Function to fetch from json and store to file as defined in config
		 * Pass a valid config file, and pass an optional filterFunction to reduce the input before storing it
		 */
		const {endpoints, filePaths} = config
		try {
			const data = await fetchWithExponentialBackoff(endpoints.uri + endpoints.all) 
			const searchResults = await data.json() as any[]
			const filteredResults = filterFunction(searchResults) 
			// Save it to file: 
			fs.writeFileSync(filePaths.all, JSON.stringify(filteredResults), 'utf8')
			return searchResults.length	
		} catch (error) {
			console.error(error)
			return false
		}
}


export const syncOneByOne = async (
	config: Config, 
	getIdFromSpecific = (input: any) => input.id, 
	checkIfIdsMatch = (fromAll: any, fetchedSpecific: any) => fromAll.id === fetchedSpecific.id,
	refresh = false) => {
		/** Fetches specific data for all stored in the all filepath, and stores those to file as defined in config
		 * Pass a valid config file
		 * getIdFromSpecific: Function to get the ID to use when running the specific end point
		 * checkIfIdsMatch: Used to compare Id from an already stored specific matched one of the soon to be fetched ones from /all
		 * refresh: If true, we fetch all new data, even if we already have it stored. Otherwise we skip data where the id is already stored in file, as per checkIfIdsMatch
		 */
		
		const {endpoints, filePaths} = config

		const all = JSON.parse(fs.readFileSync(filePaths.all).toString('utf-8')) as any[]
		console.log(`Syncing ${all.length} one by one to local data...`)
	
		const fetchedSpecifics: any[]  = []

		if (!refresh) {
			// Only download data we don't already have!
			// Check if we already have any of the schools:
			try {
				const existingData = JSON.parse(fs.readFileSync(filePaths.specifics).toString('utf-8')) as any[]
				fetchedSpecifics.push(...existingData)
				console.log(`Loaded existing data: ${fetchedSpecifics.length} / ${all.length}`)
			} catch (error) {}
		}

		// Fetch specific data for each enhet:
		for (let index = 0; index < all.length; index++) {

			console.log(`Fetching # ${fetchedSpecifics.length} / ${all.length}`)

			const specific = all[index];
			const id = getIdFromSpecific(specific)

			if (!refresh) {
				// Check if we already have the data before fetching it
				if (fetchedSpecifics.findIndex(e => checkIfIdsMatch(e, specific)) !== -1) {
					// Skip this one, and go to next:
					console.log(`Already fetched # ${fetchedSpecifics.length} / ${all.length}`)
					continue;
				}
			}
			try {
				const specificData = await (await fetchWithExponentialBackoff(endpoints.uri + endpoints.specific(id))).json() as any
				fetchedSpecifics.push(specificData)
				// Then write the whole thing to file (overwriting each time, so we save the current state
				//  - could be more effective with disk IO, but we'll be fine :)
				fs.writeFileSync(filePaths.specifics, JSON.stringify(fetchedSpecifics))
				console.log(`Fetched ${fetchedSpecifics.length} / ${all.length}`)
			} catch (error) {
				console.error(error)
				console.error("Failed to fetch, try again later")
				console.error(`Fetched ${fetchedSpecifics.length} / ${all.length} before error`)
				break;
			}
		}

}

export const parseSpecificsIntoSpaces = async <T>(
	config: Config, 
	parserFunction: (input: T[]) => Promise<Space[]>
): Promise<Space[]> => {
	const {endpoints, filePaths} = config
	try {
		const specifics = JSON.parse(fs.readFileSync(filePaths.specifics).toString('utf-8')) as T[]
		
		const spaces = await parserFunction(specifics)
		
		// Store them:
		fs.writeFileSync(filePaths.parsed, JSON.stringify(spaces))
		console.log(`Stored ${spaces.length} parsed elements to`, filePaths.parsed)

		// Then return them:
		return spaces
	} catch (error) {
		console.error("Error when parsing")
		console.error(error)
		return []
	}
}
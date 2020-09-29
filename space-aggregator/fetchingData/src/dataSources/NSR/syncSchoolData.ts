import fs from 'fs'
import { NSR, filePaths } from './config';
import { NSR_School, NSR_Enhet } from 'space-aggregator-types';
import { fetchWithExponentialBackoff } from '../util'

/** Loads enheter from filepPaths.enheter and then downloads all school data from NSR enhet by enhet, and saves to filepPaths.schools */
export const syncSchoolData = async (refresh = false) => {

			const enheter = JSON.parse(fs.readFileSync(filePaths.enheter).toString('utf-8')) as NSR_Enhet[]
			console.log(`Syncing ${enheter.length} schools to local data...`)
		
			const schools: NSR_School[]  = []

			if (!refresh) {
				// Only download data we don't already have!
				// Check if we already have any of the schools:
				try {
					const existingSchoolData = JSON.parse(fs.readFileSync(filePaths.schools).toString('utf-8')) as NSR_School[]
					schools.push(...existingSchoolData)
					console.log(`Loaded existing data: ${schools.length} / ${enheter.length}`)
				} catch (error) {}
			}

			// Fetch school data for each enhet:
			for (let index = 0; index < enheter.length; index++) {

				console.log(`Fetching # ${schools.length} / ${enheter.length}`)

				const school = enheter[index];
				const id = school.OrgNr || school.NSRId

				if (!refresh) {
					// Check if we already have the data before fetching it
					if (schools.findIndex(e => (e.NSRId === school.NSRId) || (e.OrgNr === school.OrgNr)) !== -1) {
						// Skip this one, and go to next:
						console.log(`Already fetched # ${schools.length} / ${enheter.length}`)
						continue;
					}
				}
				try {
					const schoolData = await (await fetchWithExponentialBackoff(NSR.uri + NSR.specific(id))).json() as NSR_School
					schools.push(schoolData)
					// Then write the whole thing to file (overwriting each time, so we save the current state
					//  - could be more effective with disk IO, but we'll be fine :)
					fs.writeFileSync(filePaths.schools, JSON.stringify(schools))
					console.log(`Fetched ${schools.length} / ${enheter.length}`)
				} catch (error) {
					console.error(error)
					console.error("Failed to fetch, try again later")
					console.error(`Fetched ${schools.length} / ${enheter.length} before error`)
					break;
				}
			}
			// Write to file while doing this, and be able to resume at the end:

}


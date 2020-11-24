import * as config from './config';
import { syncOneByOne } from '../util'

/** Loads enheter from filepPaths.enheter and then downloads all school data from NSR enhet by enhet, and saves to filepPaths.schools */
const syncSpecificData = async (refresh = false) => {

		const checkIfIdsMatch = (existing: any, newBookupEnhet: any) => {
			return (existing.Id === newBookupEnhet.Id)
		}

		const getIdFromSpecific = (newBookupEnhet: any) => {
			return newBookupEnhet.Id
		}

			return syncOneByOne(
				config,
				getIdFromSpecific,
				checkIfIdsMatch,
				refresh
			)

}

syncSpecificData()
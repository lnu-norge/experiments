import * as config from './config';
import { NSR_School, NSR_Enhet } from 'space-aggregator-types';
import { syncOneByOne } from '../util'

/** Loads enheter from filepPaths.enheter and then downloads all school data from NSR enhet by enhet, and saves to filepPaths.schools */
export const syncSchoolData = async (refresh = false) => {

		const checkIfIdsMatch = (existing: NSR_School, newSchool: NSR_Enhet) => {
			return (existing.NSRId === newSchool.NSRId) || (existing.OrgNr === newSchool.OrgNr)
		}

		const getIdFromSpecific = (school: NSR_Enhet) => {
			return school.OrgNr || school.NSRId
		}

			return syncOneByOne(
				config,
				getIdFromSpecific,
				checkIfIdsMatch,
				refresh
			)

}


import { NSR_School } from './nsr-types';
import { filePaths } from "./config"
import fs from 'fs'
import { School, School__schoolType } from './school-types';

/** Imports school data from the .json file at filepath.schools, parses it 
 * to our format, and exports again to filepath.parsedSchools
 */
export const parseSchoolData = () => {
	const nsrSchools = JSON.parse(fs.readFileSync(filePaths.schools).toString('utf-8')) as NSR_School[]
	console.log(`Parsing ${nsrSchools.length} schools to LNU data format...`)

	const parsedSchools: School[] = nsrSchools.map(nsr => {
		const schoolTypes = [] as School__schoolType[]
		if (nsr.ErVideregaaendeSkole) {
			schoolTypes.push('vgs')
		}
		if (nsr.ErGrunnSkole) {
			schoolTypes.push('grunnskole')
		}

		let name = '(Mangler navn)'
		if (nsr.Kallenavn && nsr.Navn) {
			name = nsr.Kallenavn + ` (${nsr.Navn})`
		} else if (nsr.Navn) {
			name = nsr.Navn
		} else if (nsr.FulltNavn) {
			name = nsr.FulltNavn
		} 

		const pupils = nsr.Elevtall
		const employees = nsr.AnsatteTil || nsr.AnsatteFra

		return {
			name,
			organizationNumber: nsr.OrgNr,
			contact: [
				{
					email: nsr.Epost,
					phone: nsr.Telefon,
					url: nsr.Url
				}
			],
			lat: nsr.Koordinater?.Breddegrad,
			long: nsr.Koordinater?.Lengdegrad,
			address: {
				street: nsr.Besoksadresse?.Adress,
				postnumber: nsr.Besoksadresse?.Postnr,
				poststed: nsr.Besoksadresse?.Poststed,
				country: nsr.Besoksadresse?.Land
			},
			types: schoolTypes,
			public: !!nsr.ErOffentligSkole,
			pupils,
			employees
		}})

	// Store parsed schools:
	fs.writeFileSync(filePaths.parsedSchools, JSON.stringify(parsedSchools), 'utf-8')
	console.log(`Done parsing ${parsedSchools.length} / ${nsrSchools.length} schools and stored to ${filePaths.parsedSchools}`)

}
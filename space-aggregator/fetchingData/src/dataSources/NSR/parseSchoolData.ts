import { NSR_School } from 'space-aggregator-types';
import { filePaths } from "./config"
import fs from 'fs'
import { School, School__schoolType, ContactInformation } from 'space-aggregator-types'

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
		// Try to differentiate between barneskole and ungdomsskole,
		// as nsr data just gives us "grunnskole":
		if (nsr.SkoleTrinnFra && nsr.SkoleTrinnFra >= 1 && nsr.SkoleTrinnTil && nsr.SkoleTrinnTil <= 7) {
			schoolTypes.push('barneskole')
		} 
		if (nsr.SkoleTrinnFra && nsr.SkoleTrinnFra >= 8 && nsr.SkoleTrinnTil && nsr.SkoleTrinnTil <= 10) {
			schoolTypes.push('ungdomsskole')
		} 
		if (nsr.ErGrunnSkole && !schoolTypes.includes('barneskole') && !schoolTypes.includes('ungdomsskole')) {
			// Didn't manage to differentiate, just put it as grunnskole:
			schoolTypes.push('grunnskole')
		}
		// Voksenopplæringgsenter:
		if (nsr.SkoleTyper?.findIndex(type => type.Id === "10")) {
			schoolTypes.push('voksenopplaeringssenter')
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

		const contact: ContactInformation[] = [
			{
				name: 'Sentralbord',
				email: nsr.Epost,
				phone: nsr.Telefon,
				url: nsr.Url
			}
		]

		if (nsr.Leder || nsr.PersonEpost || nsr.PersonTelefon) {
			contact.push(	{
				name: nsr.Leder || '(mangler navn)',
				personalName: nsr.LederFornavn,
				familyName: nsr.LederEtternavn,
				email: nsr.PersonEpost,
				phone: nsr.PersonTelefon
			} )
		}

		return {
			name,
			organizationNumber: nsr.OrgNr,
			contact,
			lat: nsr.Koordinater?.Breddegrad,
			long: nsr.Koordinater?.Lengdegrad,
			kommune: nsr.KommuneNavn,
			fylke: nsr.Fylke?.Navn,
			skoleTrinn: {
				fra: nsr.SkoleTrinnFra,
				til: nsr.SkoleTrinnTil,
				string: nsr.SkoleTrinnFra && nsr.SkoleTrinnTil ? `${nsr.SkoleTrinnFra} - ${nsr.SkoleTrinnTil}` : undefined
			},
			address: {
				street: nsr.Besoksadresse?.Adress,
				postnumber: nsr.Besoksadresse?.Postnr,
				poststed: nsr.Besoksadresse?.Poststed,
				country: nsr.Besoksadresse?.Land
			},
			types: schoolTypes,
			public: !!nsr.ErOffentligSkole,
			pupils,
			employees,
		}})

	// Store parsed schools:
	fs.writeFileSync(filePaths.parsedSchools, JSON.stringify(parsedSchools), 'utf-8')
	console.log(`Done parsing ${parsedSchools.length} / ${nsrSchools.length} schools and stored to ${filePaths.parsedSchools}`)

}
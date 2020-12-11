import { NSR_School, Sourced, Space } from 'space-aggregator-types';
import * as nsrConfig from './config';
import {  School__schoolType, ContactInformation } from 'space-aggregator-types'
import { infoGenerator, parseSpecificsIntoSpaces } from '../util';
import idFromAddress from '../idFromAddress';
import { getPoststedFromPostnummer } from '../geoDataApi';

/** Imports school data from the .json file at filepath.schools, parses it 
 * to our format, and exports again to filepath.parsedSchools
 */
const parseSchoolDataIntoSpaces = async (nsrSchools: NSR_School[]) => {
	console.log(`Parsing ${nsrSchools.length} schools to LNU Space format...`)

	const spaces = [] as Space[]


	const info = infoGenerator('nsr')


	for (let index = 0; index < nsrSchools.length; index++) {
		const nsr = nsrSchools[index]
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

		const contacts: Sourced<ContactInformation>[] = [
			info({
				role: 'Sentralbord',
				name: name,
				email: nsr.Epost,
				phone: nsr.Telefon,
				url: nsr.Url
			})
		]

		if (nsr.Leder || nsr.PersonEpost || nsr.PersonTelefon) {
			contacts.push(	info({
				role: 'Rektor',
				name: nsr.Leder || '(mangler navn)',
				personalName: nsr.LederFornavn,
				familyName: nsr.LederEtternavn,
				email: nsr.PersonEpost,
				phone: nsr.PersonTelefon
			}) )
		}

		// Get kommune and fylke data: 

		// Temporary constant for conditionally adding 
		// information to Space if present in BookupRentOjbect
		// Added to the full Space later
		const SpaceContents = <Partial<Space>> {}
		const addMetaInfo = (data: any) => {
			if (!SpaceContents.meta) {
				SpaceContents.meta = []
			}
			SpaceContents.meta.push(info(data))
		}

		addMetaInfo({organizationalNumber: nsr.OrgNr})
		addMetaInfo({skoleTrinn: {
			fra: nsr.SkoleTrinnFra,
			til: nsr.SkoleTrinnTil,
			string: nsr.SkoleTrinnFra && nsr.SkoleTrinnTil ? `${nsr.SkoleTrinnFra} - ${nsr.SkoleTrinnTil}` : undefined
		}})
		addMetaInfo({
			types: schoolTypes,
			public: !!nsr.ErOffentligSkole,
			pupils,
			employees
		})

		SpaceContents.address = {
			street: nsr.Besoksadresse?.Adress,
			postnumber: nsr.Besoksadresse?.Postnr,
			poststed: nsr.Besoksadresse?.Poststed,
			country: nsr.Besoksadresse?.Land
		}

		if (!SpaceContents.address.poststed && SpaceContents.address.postnumber) {
			// NSR data sometimes misses poststed, we can look up it up:
			SpaceContents.address.poststed = await getPoststedFromPostnummer(SpaceContents.address.postnumber)
		}

		console.log('nsr', nsr.Besoksadresse)
		console.log('norwegianaddresss', SpaceContents.address)
		const addressAsId = SpaceContents.address && idFromAddress(SpaceContents.address) ? idFromAddress(SpaceContents.address)! : false
		if (!addressAsId) {
			continue 
			// No need to store something we can't make an ID out of the address for
			// That something is probably not a place anyway.
		}

		if (nsr.Elevtall) {
			// Add pupils:
			let people = nsr.Elevtall
			// Add staff:
			if (nsr.AnsatteTil) {
				people += nsr.AnsatteTil
			} else if (nsr.AnsatteFra) {
				people += nsr.AnsatteFra
			}
			SpaceContents.fitsPeople = info(people)
		}
		SpaceContents.wholeBuilding = info(true) // True for all NSR schools? Probably... But not necessarily.
	
		spaces.push({
			addressAsId,
			title: info(name),
			contacts,
			lat: nsr.Koordinater?.Breddegrad,
			lon: nsr.Koordinater?.Lengdegrad,
			kommune: nsr.KommuneNavn,
			kommuneNummer: nsr.Kommune?.Kommunenr,
			fylke: nsr.Fylke?.Navn,
			fylkesNummer: nsr.Fylke?.Fylkesnr,
			...SpaceContents
		})
	}

	// Return parsed schools:
	return spaces
}

export default () => parseSpecificsIntoSpaces<NSR_School>(nsrConfig, parseSchoolDataIntoSpaces)
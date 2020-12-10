import { getKommuneAndFylkeFromLatLong } from './../kommuner';
import { Space, Sourced, ContactInformation, BookupSpecifics, NorwegianAddress } from 'space-aggregator-types';
import { parseSpecificsIntoSpaces } from "../util";
import * as bookupConfig from './config';
import idFromAddress from '../idFromAddress';

const BookupLinkToBooking = (id: string | number) => {
	return  `https://www.bookup.no/Utleie/#/view:item/id:${id}/mod:book`
}

const ParserFunctionBookupIntoSpace = async (
	BookupSpecifics: BookupSpecifics[]
) => {
	const spaces = [] as Space[]
	
	const info = <T>(data: T): Sourced<T> => ({
		info: data,
		source: {
			type: 'bookup',
			lastUpdated: Date.now() // TODO: Should set this to the date we fetched the info, not the date we parsed it
		}
	})

	for (let index = 0; index < BookupSpecifics.length; index++) {
		const RentObject = BookupSpecifics[index].RentObject

			// Temporary constant for conditionally adding 
			// information to Space if present in BookupRentOjbect
			// Added to the full Space later
			const SpaceContents = <Partial<Space>> {}
			console.log('Start parsing ', RentObject.Title)

			if (RentObject.Contacts) {
				SpaceContents.contacts = <Sourced<ContactInformation>[]> RentObject.Contacts.map(BookupContact => {
					const ContactInformation = <ContactInformation>{}
					if (BookupContact.Email) {
						ContactInformation.email = BookupContact.Email
					}
					if (BookupContact.Phone) {
						ContactInformation.phone = BookupContact.Phone
					}
					return info<ContactInformation>({
						name: BookupContact.Name,
						role: BookupContact.Role,
						...ContactInformation
					})
				})
			}
			
			SpaceContents.description = info(RentObject.Description)
			SpaceContents.connectedBookingServices =  [{
				type: 'bookup',
				bookingUri: BookupLinkToBooking(RentObject.Id)
			}]

			if (RentObject.Address) {
				SpaceContents.address = <NorwegianAddress>{
					street: RentObject.Address.StreetAddress,
					postnumber: RentObject.Address.PostalCode,
					poststed: RentObject.Address.PostalArea
				}
				SpaceContents.lat = Number(RentObject.Address.Latitude)
				SpaceContents.lon = Number(RentObject.Address.Longitude)

				// Get kommune and fylke
				try {
					if (SpaceContents.lat && SpaceContents.lon) {
						console.log('Fetching kommunedata for ', RentObject.Title)
						const kommuneData = await getKommuneAndFylkeFromLatLong(SpaceContents.lat, SpaceContents.lon)
						if (kommuneData?.kommunenavn) {
							SpaceContents.kommune = kommuneData.kommunenavn
						}
						if (kommuneData?.kommunenummer) {
							SpaceContents.kommuneNummer = kommuneData.kommunenummer
						}
						if (kommuneData?.fylkesnavn) {
							SpaceContents.fylke = kommuneData?.fylkesnavn
						}
						if (kommuneData?.fylkesnummer) {
							SpaceContents.fylkesNummer = kommuneData?.fylkesnummer
						}
					}
				
				}	catch (error) {
					console.error("Could not fetch kommune data from lat lon")
				}			
			}

		const id = SpaceContents.address && idFromAddress(SpaceContents.address) ? idFromAddress(SpaceContents.address)! : false
		console.log('Storing under id ', id)

		if (!id) {
			continue // No need to store something we can't make an ID out of
			// That something is probably not a place anyway.
		}

		//	SpaceContents.meta = [info(RentObject)]
			spaces.push({
				id,
				title: info(RentObject.Title),
				...SpaceContents 
			})
		
	}


	return spaces
}

parseSpecificsIntoSpaces<BookupSpecifics>(bookupConfig, ParserFunctionBookupIntoSpace)
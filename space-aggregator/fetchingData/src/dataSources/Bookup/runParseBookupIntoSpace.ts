import { getKommuneAndFylkeFromLatLong } from './../geoDataApi';
import { Space, Sourced, ContactInformation, BookupSpecifics, NorwegianAddress } from 'space-aggregator-types';
import { parseSpecificsIntoSpaces, infoGenerator } from "../util";
import * as bookupConfig from './config';
import idFromAddress from '../idFromAddress';

const BookupLinkToBooking = (id: string | number) => {
	return  `https://www.bookup.no/Utleie/#/view:item/id:${id}/mod:book`
}

const ParserFunctionBookupIntoSpace = async (
	BookupSpecifics: BookupSpecifics[]
) => {
	const spaces = [] as Space[]

	const info = infoGenerator('bookup')

	for (let index = 0; index < BookupSpecifics.length; index++) {
		const RentObject = BookupSpecifics[index].RentObject

		if (
			!RentObject.IsActive || 
			!RentObject.Address 
		) {


			continue; // Not active, or not releveant
		}

			// Temporary constant for conditionally adding 
			// information to Space if present in BookupRentOjbect
			// Added to the full Space later
			const SpaceContents = <Partial<Space>> {}
			console.log('Start parsing ', RentObject.Title)

			const addMetaInfo = (data: any) => {
				SpaceContents.meta?.push(info(data))
			}

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
						if (kommuneData 
							&& kommuneData.kommunenavn
							&& kommuneData.kommunenummer
							&& kommuneData.fylkesnavn
							&& kommuneData.fylkesnummer) {
							SpaceContents.kommune = kommuneData.kommunenavn
							SpaceContents.kommuneNummer = kommuneData.kommunenummer
							SpaceContents.fylke = kommuneData?.fylkesnavn
							SpaceContents.fylkesNummer = kommuneData?.fylkesnummer
						}
					} else {
						console.error('missing lat and lon for object', SpaceContents.title)
					}
				
				}	catch (error) {
					console.error("Could not fetch kommune data from lat lon")
				}			
			}

		const addressAsId = SpaceContents.address && idFromAddress(SpaceContents.address) ? idFromAddress(SpaceContents.address)! : false
		console.log('Storing under id ', addressAsId)

		if (!addressAsId) {
			continue // No need to store something we can't make an ID out of the address for
			// That something is probably not a place anyway.
		}

		if (RentObject.SizeSqM2) {
			SpaceContents.sizeInSqm = info(RentObject.SizeSqM2)
		}
		if (RentObject.SizePeople) {
			SpaceContents.fitsPeople = info(RentObject.SizePeople)
		}
		// TODO: Find out if we can do wholeBuildning somehow from Bookup data

		// TODO: Decide if and how to include this data
		addMetaInfo(
			RentObject.Facilities
		)
		addMetaInfo(
			RentObject.Categories
		)
		addMetaInfo(
			RentObject.AgeLimit
		)
		addMetaInfo(
			RentObject.CompactOpeningHours
		)
		addMetaInfo(
			RentObject.PartInfo
		)
		addMetaInfo(
			RentObject.Medias
		)
		addMetaInfo(
			RentObject.Attachments
		)
		addMetaInfo(
			RentObject.IncludedServices
		)
		
			spaces.push({
				addressAsId,
				title: info(RentObject.Title),
				...SpaceContents 
			})
		
	}


	return spaces
}

parseSpecificsIntoSpaces<BookupSpecifics>(bookupConfig, ParserFunctionBookupIntoSpace)
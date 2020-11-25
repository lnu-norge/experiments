
/** Not a full representation, but the most relevant stuff for us */
export interface BookupGetLIstByParamsSearchResult {
	Count: number,
	IsValid: boolean, 
	RentObjects: BookupSearchResultRentObject[],
	Categories: any[]
}

export interface BookupOpeningHour {
	Weekday: 1|2|3|4|5|6|7,
	WeekdayString: 'Mandag' | 'Tirsdag' | 'Onsdag' | 'Torsdag' | 'Fredag' | 'Lørdag' | 'Søndag',
	/** Format: 24H HH:MM */
	HourFrom: string,
	/** Format: 24H HH:MM */
	HourTo: string,
	Price: number
	PriceHour: number
	PriceDay: number
	ClosedText: string,
	SplitHour: any,
	PriceHourFrom: number,
	HourToDayThreshold: number,
	UseAsHoliday: boolean,
	HourRanges: any[]
}

export interface BookingPartInfo {
	PartNr: number,
	PartLabel: string,
	PartNrPricePercentage: number
}

export interface BookingPartInfoWrapper {
	PartInfos: BookingPartInfo[]
}

export interface BookupMedia {
	/** If 0, it seems to be a map from google maps */
	Id: number,
	/** File type, e.g. jpg */
	FileFormat: string,
	Description?: string,
	Copyright?: string,
	/** If a map from google maps (Id: 0, it seems like), this is URL encoded and needs decoding to be used */
	FileUrl: string,
	IsMain?: boolean,
}

export interface BookupAttachment {
	Id: number,
	SortIndex: number,
	/** File type, e.g. pdf */
	FileFormat: string,
	Title: string,
	/** If a map from google maps (Id: 0, it seems like), this is URL encoded and needs decoding to be used */
	FileUrl: string,
	/** Does it state conditions for renting? */
	Condition: boolean,
	/** Does it list prices for renting? */
	PriceDoc: boolean
}


export interface BookupCompactOpeningHours {
	/** E.g. Man-Fre */
	First: string,
	/** E.g. 9:00 - 15:00 */
	Second: string
}

export interface BookupSearchResultRentObject {
	Id: number,
	/** Used for last updated, can also be used for syncing
	 * Format: "2020-11-14T15:39:26.957"
	 */
	Changed: string 

	Title: string,
	/** Short description, seems to be a subtitle of sorts */
	Description: string,
	
	IsActive: boolean,
	
	/** CalendarInfo seems to be extra information about calendar bookings, ie. "Utleieobjektet stenges ved arrangement i fotballhallen" */
	CalendarInfo: string,

	/** Will we need appproval, or can we book directly? */
	RequireApproval: boolean,
	RequireBankId: boolean,
	AgeLimit: number, 

	/** Seems to be connected to the Bookup client who created it, not sure if useful */
	ClientId: number 
	
	OpeningHours: {
		OpeningHours: BookupOpeningHour[]
		DateRanges: any[],
		ContractPG: boolean,
		Title?: string,
	}
	CompactOpeningHours: BookupCompactOpeningHours[]

	/** If the room is split into different parts, there is info about each one - as well as pricing for each one */
	PartInfo: BookingPartInfoWrapper 
	OnlyPartRent: boolean

	/** Not sure what this is */
	RentType: number

	SizeSqM2: number 
	SizePeople: number 

	HomePage: string 

	Address: {
		StreetAddress: string,
		/** Seems to be all caps */
		PostalArea: string,
		PostalCode: string,
		Country?: string,
		Longitude: string,
		Latitude: string,
		/** Seems to always be 15, might also be a number at times but not per 2020-11 */
		MapZoom: 15
	},
	/** Images */
	Medias: BookupMedia[],
	/** Attachments, e.g. PDFs */
	Attachments: BookupAttachment[]

	/** E.g. bord og stoler */
	IncludedServices: BookupCategory[],

}

export interface BookupContactInformation {
	Id: number
	Name: string
	Role: string
	Phone?: string
	Email?: string
}

export interface BookupFacilities {
	Title: string
	Description?: string
	Price?: number
	VAT?: number
}

export interface BookupCategory {
	Id?: number
	Title: string
	ParentId?: number
	SubCategories?: BookupCategory[]
}

/** Full, specific, information, when fetched individually 
 * 
 * // TODO: Include pricing information, as that's here too, but not mapped yet
*/
export interface BookupRentObject extends BookupSearchResultRentObject {
	/** Name of owner */
	ClientTitle: string
	ClientLogoUrl: string
	/** Who to contact */
	Contacts: BookupContactInformation[]
	/** List of things you can choose between, not used as list of facilities as far as I can tell */
	Facilities: BookupFacilities[]
	/** List of ways to categorize this, can be several deep */
	Categories: BookupCategory[]
}



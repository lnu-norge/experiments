export interface Organization {
	organizationNumber: string
}

export interface NorwegianAddress {
	street?: string,
	postnumber?: string,
	poststed?: string,
	country?: string
}

export interface Place {
	lat?: number
	lon?: number
	address?: NorwegianAddress
	kommune?: string
	kommuneNummer?: string
	fylke?: string
	fylkesNummer?: string
}
export interface ContactInformation {
	email?: string,
	name?: string,
	personalName?: string,
	familyName?: string,
	role?: string,
	phone?: string,
	url?: string
}


/** WIP Common interface */

export interface BookingService {
	type: "bookup" | "other"
	bookingUri: string
}

export interface SourceOfInformation {
	type: "nsr" | "bookup" | "volunteer" | "other"
	/** Unix timestamp */
	lastUpdated: number
	sourceUri?: string
	sourceDescription?: string
}

export interface Image {
	src: string
	alt: string
	caption?: string
}

export interface Change<T> {
	timestamp: number,
	changes: Partial<T>
}

/** Information with a source and changelog */
export interface Sourced<T> {
	info: T
	changelog?: Change<T>[]
	source: SourceOfInformation
}

export interface Space extends Place {
	id: string
	title: Sourced<string>
	description?: Sourced<string>
	images?: Sourced<Image>[]
	connectedBookingServices?: BookingService[]
	contacts?: Sourced<ContactInformation>[]
	meta?: Sourced<any>[]
	subSpaces?: Space[]
}
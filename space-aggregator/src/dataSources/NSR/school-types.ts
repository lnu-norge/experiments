
export interface Organization {
	organizationNumber?: string
}

export interface NorwegianAddress {
	street?: string,
	postnumber?: string,
	poststed?: string,
	country?: string
}

export interface Place {
	lat?: number
	long?: number
	address?: NorwegianAddress
}

export interface ContactInformation {
	email?: string,
	name?: string,
	phone?: string,
	url?: string
}

export type School__schoolType = 'vgs' | 'grunnskole' | 'barneskole' | 'ungdomsskole' 

export interface School extends Place, Organization {
	name: string
	organizationNumber?: string
	contact?: ContactInformation[]
	types?: School__schoolType[]
	public?: boolean
	pupils?: number
	employees?: number
} 


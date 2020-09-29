
interface Organization {
	organizationNumber?: string
}

interface NorwegianAddress {
	fullAddress: string 
}

interface Place {
	lat: string
	long: string
	address: NorwegianAddress
}

interface ContactInformation {
	email: string
}

interface School extends Place, Organization {
	name: string
	organizationNumber: string
	contact: ContactInformation
	type: ''
} 


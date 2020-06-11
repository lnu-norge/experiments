// Uses Nasjonalt skoleregister to make a list of contact information and more 
// for all schools in Norway

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
} 

const getSchoolData = (): School[] => {
	/** Gets the latest list of school data from NSR, parses it, and returns as array */

	return []
}
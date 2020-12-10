import { ContactInformation, Organization, Place } from "./space"


export type School__schoolType = 'vgs' | 'grunnskole' | 'barneskole' | 'ungdomsskole' | 'voksenopplaeringssenter'

export interface School extends Place, Organization {
	name: string 
	organizationNumber: string
	contact: ContactInformation[]
	types: School__schoolType[]
	public: boolean
	pupils?: number
	employees?: number
	skoleTrinn?: {
		fra: number
		til: number
		string: string
	}
}

/** National Scool Registry data URIs and end points. 
 * See https://data-nsr.udir.no//swagger/ui/index for docs
 */
export const NSR = {
	uri: 'https://data-nsr.udir.no',
	all: '/enheter',
	specific: (id: string | number) => `/enhet/${id}`
}

/** File paths for output files */
export const filePaths = {
	schools: './data/NSR_schools.json',
	enheter: './data/NSR_enheter.json',
	parsedSchools: './data/parsedSchools.json'

}
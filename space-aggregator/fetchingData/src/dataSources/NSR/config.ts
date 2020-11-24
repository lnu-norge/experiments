/** National Scool Registry data URIs and end points. 
 * See https://data-nsr.udir.no//swagger/ui/index for docs
 */
export const endpoints = {
	uri: 'https://data-nsr.udir.no',
	all: '/enheter',
	specific: (id: string | number) => `/enhet/${id}`
}

/** File paths for output files */
export const filePaths = {
	all: '../data/NSR_enheter.json',
	specifics: '../data/NSR_schools.json',
	parsed: '../data/parsedSchools.json'

}
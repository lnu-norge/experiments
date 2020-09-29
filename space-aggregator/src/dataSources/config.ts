/** National Scool Registry data URIs and end points. 
 * See https://data-nsr.udir.no//swagger/ui/index for docs
 */
export const NSR = {
	uri: 'https://data-nsr.udir.no',
	all: '/enheter',
	specific: (id: string | number) => `/enhet/${id}`
}

export const filePaths = {
	schools: './data/schools.json',
	enheter: './data/enheter.json'
}
/** Bookup config and API end points
 * No docs exist at this moment.
 */

export const endpoints = {
	uri: 'https://www.bookup.no/api/',
	all: '/public/list/?SearchWord=',
	specific: (id: string | number) => `/public/init/${id}/reference/null/`
}

/** File paths for output files */
export const filePaths = {
	all: '../data/Bookup_all.json',
	specifics: '../data/Bookup_all_with_specifics.json',
	parsed: '../data/Bookup_parsed.json'
}
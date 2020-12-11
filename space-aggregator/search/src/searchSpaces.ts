import client from './client'

let searchParameters = {
	q: '*',
	query_by  : 'title',
	facet_by: 'addressAsId',
	filter_by: 'addressAsId:nedre-tyholmsvei-6_4836_arendal'
	
}

console.log('NEW SEARCH __________')
client.collections("spaces")
	.documents()
	.search(searchParameters)
	.then((searchResults: any) => {
		console.log(searchResults)
			console.log(searchResults.facet_counts[0].counts)
			
			if (!searchResults.grouped_hits) {
				searchResults.hits.map((hit: any) => {
						console.log(hit.document.title)
				})
			} else {
				searchResults.grouped_hits.map((group: any) => {
					console.log('group', group.group_key)
					group.hits.map((hit: any) => {
						console.log(hit.document.title)
				})})

			}


	})

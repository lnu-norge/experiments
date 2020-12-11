import client from './client'

// Clear up spaces
client.collections('spaces') && client.collections('spaces').delete()

// Define searchable aspects of Spaces:

const spaceIndex = {
  name: 'spaces',
  fields: [
    {name: 'rating', type: 'int32' },
    {name: 'title', type: 'string' },
    {name: 'description', type: 'string', optional: true},
    {name: 'kommune', type: 'string', optional: true  },
    {name: 'fylke', type: 'string', optional: true  },
    {name: 'kommuneNummer', type: 'string', optional: true  },
    {name: 'fylkesNummer', type: 'string', optional: true  },
    {name: 'lat', type: 'float', optional: true },
    {name: 'lon', type: 'float', optional: true },
    {name: 'street', type: 'string' },
    {name: 'postnumber', type: 'string' },
    {name: 'poststed', type: 'string' },
    {name: 'addressAsId', type: 'string', facet: true },
  ],
  'default_sorting_field': 'rating'
}
 
// Create the collection
client.collections().create(spaceIndex)
  .then(function (data: any) {
    console.log(data)
  })


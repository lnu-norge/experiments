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
    {name: 'kommune', type: 'string', facet: true, optional: true  },
    {name: 'fylke', type: 'string', facet: true, optional: true  },
    {name: 'kommuneNummer', type: 'string', facet: true, optional: true  },
    {name: 'fylkesNummer', type: 'string',facet: true, optional: true  },
    {name: 'lat', type: 'float', optional: true },
    {name: 'lon', type: 'float', optional: true },
    {name: 'street', type: 'string' },
    {name: 'postnumber', type: 'string', facet: true },
    {name: 'poststed', type: 'string', facet: true  },
    {name: 'addressAsId', type: 'string', facet: true },
    {name: 'includesLinkToBookingPage', type: 'bool', facet: true },
    {name: 'fitsPeople', type: 'int32', facet: true, optional: true  },
    {name: 'sizeInSqm', type: 'int32', facet: true, optional: true  }, 
    {name: 'wholeBuildning', type: 'bool', facet: true, optional: true  }, 
  ],
  'default_sorting_field': 'rating'
}
 
// Create the collection
client.collections().create(spaceIndex)
  .then(function (data: any) {
    console.log(data)
  })


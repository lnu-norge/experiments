const Typesense = require('typesense') as any
require('dotenv').config()

const client = new Typesense.Client({
  'nodes': [{
    'host': 'localhost',
    'port': '8067', // LNU birthday is 7/6/1980
    'protocol': 'http'
  }],
  'apiKey': process.env.typesense_api_key,
  'connectionTimeoutSeconds': 2
})

export default client
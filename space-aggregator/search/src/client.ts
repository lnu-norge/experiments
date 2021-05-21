const Typesense = require('typesense') as any
require('dotenv').config()

const {
  typesense_api_key,
  typesense_host,
  typesense_protocol,
  typesense_port
} = process.env

const client = new Typesense.Client({
  'nodes': [{
    'host': typesense_host,
    'port': typesense_port, 
    'protocol': typesense_protocol
  }],
  'apiKey': typesense_api_key,
  'connectionTimeoutSeconds': 2
})


export default client
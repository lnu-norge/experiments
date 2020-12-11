const Typesense = require('typesense') as any

const client = new Typesense.Client({
  'nodes': [{
    'host': 'localhost',
    'port': '8067',
    'protocol': 'http'
  }],
  'apiKey': 'LNU_tester_bra_saker_for_alle__Slapp_av_denne_skal_ikke_brukes_i_prod',
  'connectionTimeoutSeconds': 2
})

export default client
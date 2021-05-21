// @ts-ignore No Typescript for TypeSense yet
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";


const { 
  REACT_APP_TYPESENSE_APIKEY, 
  REACT_APP_TYPESENSE_HOST,
  REACT_APP_TYPESENSE_PORT,
  REACT_APP_TYPESENSE_PROTOCOL
} = process.env

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: REACT_APP_TYPESENSE_APIKEY, // TODO: Switch to search only key, and generate keys on startup
    nodes: [
      {
        host: REACT_APP_TYPESENSE_HOST,
        port: REACT_APP_TYPESENSE_PORT,
        protocol: REACT_APP_TYPESENSE_PROTOCOL
      }
    ]
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
		queryBy: "title, description",
		prefix: true,
		num_typos: 1
  }
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

export default searchClient
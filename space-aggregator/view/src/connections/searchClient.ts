// @ts-ignore No Typescript for TypeSense yet
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "LNU_tester_bra_saker_for_alle__Slapp_av_denne_skal_ikke_brukes_i_prod", // TODO: Switch to search only key, and generate keys on startup
    nodes: [
      {
        host: "localhost",
        port: "8067",
        protocol: "http"
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